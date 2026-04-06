import Fee from "../database/models/fee.models";

export const addFeeServices = async (
  feeTitle: string,
  category: string,
  description: string,
  feeDate: string,
  feeTime: string,
  location: string,
  targetAudience: string,
) => {
  const fees = await Fee.create({
    // totalAmount,
  });
  return fees;
};

export const getAllFeeServices = async () => {
  const fees = await Fee.findAll();
  return fees;
};

export const getFeeByIdServices = async (id: string) => {
  const fees = await Fee.findByPk(id);
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
