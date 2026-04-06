import User from "../database/models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Role } from "../enum/auth.enum";

export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  phone: number,
  profileImage: string,
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
  });
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

export const getAllUserService = async () => {
  const user = await User.findAll({
    where: {
      role: {
        [Op.ne]: Role.Superadmin,
      },
    },
  });
  return user;
};

export const getUserByIdService = async (id: string) => {
  const user = await User.findByPk(id);
  return user;
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
  console.log(user);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  console.log(checkPassword);
  if (!checkPassword) {
    throw new Error("OLD_PASSWORD_DIDNOT_MATCH");
  }
  const hashPassword = await bcrypt.hash(
    newPassword,
    Number(process.env.BCRYPT_SALT_ROUNDS),
  );
  console.log(hashPassword);

  user.password = hashPassword;
  await user.save();

  return user;
};

export const deleteUserService = async (id: string) => {
  const user = await User.findByPk(id);

  await user?.destroy();
  return user;
};
