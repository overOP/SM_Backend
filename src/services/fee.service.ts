import Fee from "../database/models/fee.models";
import User from "../database/models/user.models";
import { FeeStatus } from "../enum/auth.enum";

export const addFeeServices = async (studentId: string) => {
  const fees = await Fee.create({
    studentId,
    FeeStatus,
  });
  return fees;
};

export const getAllFeeServices = async () => {
  const fees = await Fee.findAll({
    include: {
      model: User,
      attributes: ["name", "amount"],
    },
  });
  return fees;
};

export const getFeeByIdServices = async (id: string) => {
  const fees = await Fee.findByPk(id, {
    include: {
      model: User,
      attributes: ["name", "amount"],
    },
  });
  return fees;
};

export const updateFeeByIdServices = async (id: string, data: any) => {
  const fees = await Fee.findByPk(id);
  if (!fees) {
    throw new Error("FEE_NOT_FOUND");
  }

  fees.set(data);
  fees.save();
  return fees;
};

export const deleteFeeServices = async (id: string) => {
  const fees = await Fee.findByPk(id);
  if (!fees) {
    throw new Error("FEE_NOT_FOUND");
  }

  fees.destroy();
  return fees;
};
