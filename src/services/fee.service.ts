import Fee from "../database/models/fee.models";
import User from "../database/models/user.models";

export const getAllFeeServices = async () => {
  const fees = await Fee.findAll({
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  return fees;
};

export const getFeeByIdServices = async (id: string) => {
  const fees = await Fee.findByPk(id, {
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  return fees;
};

export const updateFeeByIdServices = async (id: string, amount: number) => {
  const fees = await Fee.findByPk(id);
  if (!fees) {
    throw new Error("FEE_NOT_FOUND");
  }

  const total = Number(fees.totalAmount) || 0;
  const paid = Number(fees.paidAmount) || 0;
  const amt = Number(amount) || 0;

  fees.paidAmount = paid + amt;
  fees.dueAmount = total - fees.paidAmount;
  fees.AmountStatus = fees.dueAmount === 0 ? "Paid" : "Due";

  await fees.save();
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
