import User from "../database/models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op, STRING } from "sequelize";
import { Role } from "../enum/auth.enum";
import Fee from "../database/models/fee.models";
import { generateOtp, hashOtp } from "../utils/otpUtils";
import { sendEmail } from "../utils/sendEmail";

const RESET_TOKEN_EXPIRES_MIN = Number(process.env.OTP_RESET_TOKEN_EXPIRES_MIN);

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
  return user;
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
  return student;
};

export const forgotPasswordService = async (email: string) => {
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const now = Date.now();

  const otp = generateOtp(Number(process.env.OTP_LENGTH));

  user.passwordOtp = hashOtp(otp);
  await user.save();

  await sendEmail({
    email: user.email,
    subject: "Password Reset OTP",
    message: `Your Otp is ${otp}`,
  });
};

export const verifyOtpService = async (email: string, otp: string) => {
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const hashhProvidedOtp = hashOtp(String(otp));
  user.isOtPVerified = true;
  user.passwordOtp = null;

  await user.save();

  const resetToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "10m",
    },
  );
  return resetToken;
};

export const resetPasswordService = async (
  resetToken: string,
  newPassword: string,
) => {
  let payload: any;
  console.log(newPassword);
  payload = jwt.verify(resetToken, String(process.env.JWT_SECRET));
  if (!payload) {
    throw new Error("TOKEN_NOT_FOUND");
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
  return user;
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
