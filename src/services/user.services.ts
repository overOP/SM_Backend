import User from "../database/models/user.models";
import bcrypt from "bcrypt";

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

// export const loginService = async (email: string, password: string) => {
//   const userExist = await User.findOne({ where: { email } });
//   if (condition) {
//   }
// };
