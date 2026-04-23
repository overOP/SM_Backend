import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import Attendance from "../database/models/attendance.models";
import Fee from "../database/models/fee.models";
import Result from "../database/models/result.models";
import Subject from "../database/models/subject.models";
import User from "../database/models/user.models";
import { Role } from "../enum/auth.enum";
import path from "path";
import fs from "fs/promises";
import { generateOtp, hashOtp, isOtpExpired } from "../utils/otpUtils";
import { sendEmail } from "../utils/sendEmail";

const RESET_TOKEN_EXPIRES_MIN = Number(process.env.OTP_RESET_TOKEN_EXPIRES_MIN);
const OTP_EXPIRES_MIN = Number(process.env.OTP_EXPIRES_MIN);
const OTP_RESEND_COOLDOWN_SEC = Number(process.env.OTP_RESEND_COOLDOWN_SEC);
const OTP_MAX_RESENDS = Number(process.env.OTP_MAX_RESENDS);
const OTP_MAX_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS);

export const deleteFile = async (fileName?: string | null) => {
  if (!fileName) return;
  const filePath = path.join(process.cwd(), "uploads", fileName);
  await fs.unlink(filePath).catch(() => {});
};
export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  phone: number,
  profileImage: string,
  Role: "student" | "teacher" | "parent",
) => {
  const emailExist = await User.findOne({
    where: { email: email },
  });

  if (emailExist) {
    throw new Error("EMAIL_EXIST!");
  }
  const hashPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS),
  );
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    phone,
    profileImage,
    Role,
  });

  return {
    user: {
      name,
      email,
      password,
      phone,
      profileImage,
      Role,
    },
  };
};

export const registerStudentService = async (
  profileImage: string,
  name: string,
  email: string,
  password: string,
  phoneNumber: number,
  guardianName: string,
  classGrade: string,
  rollNumber: string,
  section: string,
  totalAmount: number,
  paidAmount: number,
  role: "student",

) => {
  const emailExist = await User.findOne({
    where: { email: email },
  });

  if (emailExist) {
    throw new Error("EMAIL_EXIST!");
  }

  const hashPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS),
  );

  const student = await User.create({
    
    profileImage,
    name,
    email,
    password: hashPassword,
    phoneNumber,
    guardianName,
    classGrade,
    rollNumber,
    section,
    totalAmount,
    paidAmount,
    role,

  });

  const paidAtRegistration = paidAmount || 0;
  const dueAmount = totalAmount - paidAtRegistration;

  await Fee.create({
    studentId: student.id,
    totalAmount,
    paidAmount: paidAtRegistration,
    dueAmount,
  });

  return {
    user: {
      profileImage,
      name,
      email,
      password,
      phoneNumber,
      guardianName,
      classGrade,
      rollNumber,
      section,
      totalAmount,
      paidAmount,
      role,
    },
  };
};

export const forgotPasswordService = async (email: string) => {
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const now = Date.now();
  if (user.otpLastSentAt) {
    const last = new Date(user.otpLastSentAt).getTime();
    if (now - last < OTP_RESEND_COOLDOWN_SEC * 1000) {
      throw new Error("OTP_COOLDOWN");
    }
  }

  if ((user.otpResendCount || 0) >= OTP_MAX_RESENDS) {
    throw new Error("OTP_LIMIT");
  }

  const otp = generateOtp(Number(process.env.OTP_LENGTH));
  user.passwordOtp = hashOtp(otp);
  user.passwordOtpExpiresAt = new Date(
    Date.now() + OTP_EXPIRES_MIN * 60 * 1000,
  );
  user.otpLastSentAt = new Date();
  user.otpResendCount = (user.otpResendCount || 0) + 1;
  user.otpAttempts = 0;
  user.isOtPVerified = false;

  await user.save();
  await sendEmail({
    email: user.email,
    subject: "Password Reset OTP",
    message: `Your Otp is ${otp}`,
  });
};

export const verifyOtpService = async (email: string, otp: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  if (!user.passwordOtp || !user.passwordOtpExpiresAt) {
    throw new Error("NO_OTP_REQUESTED");
  }

  if ((user.otpAttempts || 0) >= OTP_MAX_ATTEMPTS) {
    user.passwordOtp = null;
    user.passwordOtpExpiresAt = null;
    user.otpAttempts = 0;
    await user.save();

    throw new Error("OTP_ATTEMPTS_EXCEEDED");
  }

  if (isOtpExpired(user.passwordOtpExpiresAt)) {
    user.passwordOtp = null;
    user.passwordOtpExpiresAt = null;
    user.otpAttempts = 0;
    await user.save();

    throw new Error("OTP_EXPIRED");
  }

  const hashedProvided = hashOtp(String(otp));
  if (hashedProvided !== user.passwordOtp) {
    user.otpAttempts = (user.otpAttempts || 0) + 1;
    await user.save();

    const attemptsLeft = OTP_MAX_ATTEMPTS - (user.otpAttempts || 1);

    throw new Error(`OTP_INVALID:${attemptsLeft}`);
  }

  user.isOtPVerified = true;
  user.passwordOtp = null;
  user.passwordOtpExpiresAt = null;
  user.otpAttempts = 0;
  await user.save();

  const resetToken = jwt.sign(
    { id: user.id, type: "otp_reset" },
    process.env.JWT_SECRET as string,
    { expiresIn: `${RESET_TOKEN_EXPIRES_MIN}m` },
  );

  return resetToken;
};
export const resetPasswordService = async (
  resetToken: string,
  newPassword: string,
) => {
  let payload: any;
  payload = jwt.verify(resetToken, String(process.env.JWT_SECRET));
  if (!payload) {
    throw new Error("TOKEN_NOT_FOUND");
  }
  if (!payload || payload.type !== "otp_reset" || !payload.id) {
    throw new Error("INVALID_TOKEN");
  }
  const user = await User.findByPk(payload.id);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const hashPassword = await bcrypt.hash(
    newPassword,
    Number(process.env.BCRYPT_SALT_ROUNDS),
  );
  user.password = hashPassword;

  await user.save();

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password has been changed",
      message:
        "This is a confirmation that your account password was successfully changed. If this was not you, please contact support immediately.",
    });
  } catch (err: any) {
    console.log("Password reset email failed", err.message);
  }
};

export const loginService = async (email: string, password: string) => {
  const userExist = await User.findOne({ where: { email: email } });
  if (!userExist) {
    throw new Error("USER_NOT_FOUND");
  }

  const verifyPassword = await bcrypt.compare(password, userExist.password);
  if (!verifyPassword) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = await jwt.sign(
    { id: userExist.id, role: userExist.role },
    String(process.env.JWT_SECRET),
    { expiresIn: "30d" },
  );

  return {
    token,
    user: {
      id: userExist.id,
      email: userExist.email,
      name: userExist.name,
      role: userExist.role,
      profileImage: userExist.profileImage,
    },
  };
};

export const updateUserByIdService = async (id: string, data: any) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  if (data.profileImage && user.profileImage) {
    await deleteFile(user.profileImage);
  }
  user.set(data);
  user.save();

  return user;
};

export const updatePasswordService = async (
  id: string,
  password: string,
  newPassword: string,
) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new Error("OLD_PASSWORD_DIDNOT_MATCH");
  }
  const hashPassword = await bcrypt.hash(
    newPassword,
    Number(process.env.BCRYPT_SALT_ROUNDS),
  );

  user.password = hashPassword;
  await user.save();

  return user;
};

export const deleteUserService = async (id: string) => {
  const user = await User.findByPk(id);

  await user?.destroy();
  return user;
};

export const getAllUserService = async () => {
  const user = await User.findAll({
    where: {
      role: {
        [Op.ne]: Role.Superadmin,
      },
    },
    attributes: {
      exclude: [
        "password",
        "otp",
        "otpExpiry",
        "otpAttempts",
        "otpRequestTime",
        "createdAt",
        "updatedAt",
      ],
    },
  });
  return user;
};

export const getUserByIdService = async (id: string) => {
  const user = await User.findByPk(id);
  return user;
};

export const getAllStudentService = async () => {
  const user = await User.findAll({
    attributes: [
      "id",
      "profileImage",
      "name",
      "email",
      "phoneNumber",
      "guardianName",
      "classGrade",
      "rollNumber",
      "section",
      "role",
    ],

    where: {
      role: {
        [Op.eq]: Role.Student,
      },
    },
  });
  return user;
};

export const getAllTeacherService = async () => {
  const user = await User.findAll({
    attributes: [
      "id",
      "profileImage",
      "name",
      "email",
      "classAssigned",
      "subject",
      "phoneNumber",
    ],
    where: {
      role: {
        [Op.eq]: Role.Teacher,
      },
    },
  });
  return user;
};

export const getAllParentService = async () => {
  const user = await User.findAll({
    attributes: ["id", "name", "email", "profileImage", "phoneNumber", "role"],
    where: {
      role: {
        [Op.eq]: Role.Parent,
      },
    },
  });
  return user;
};

export const totalCountSevice = async () => {
  const totalUser = await User.count();
  const totalStudent = await User.count({
    where: {
      role: Role.Student,
    },
  });

  const totalTeacher = await User.count({
    where: {
      role: Role.Teacher,
    },
  });

  const totalParent = await User.count({
    where: {
      role: Role.Parent,
    },
  });
  return { totalUser, totalStudent, totalTeacher, totalParent };
};

export const getAttendanceServices = async (studentId: string) => {
  const attendances = await User.findOne({
    where: { id: studentId },
    attributes: [
      "profileImage",
      "name",
      "email",
      "guardianName",
      "classGrade",
      "rollNumber",
      "section",
      "role",
    ],
    include: [
      {
        model: Attendance,
        attributes: ["id", "status", "date"],
        include: [
          {
            model: Subject,
            attributes: ["id", "subjectName"],
          },
        ],
      },
    ],
  });
  return attendances;
};

export const getResultServices = async (studentId: string) => {
  const results = await User.findOne({
    where: { id: studentId },
    attributes: [
      "profileImage",
      "name",
      "email",
      "guardianName",
      "classGrade",
      "rollNumber",
      "section",
      "role",
    ],
    include: [
      {
        model: Result,
        attributes: ["id", "marks", "grade", ""],
        include: [
          {
            model: Subject,
            attributes: [
              "id",
              "subjectName",
              "subjectCode",
              "fullMarks",
              "passMarks",
            ],
          },
        ],
      },
    ],
  });
  return results;
};
