import Result from "../database/models/result.models";
import User from "../database/models/user.models";
import { ResultStatus } from "../enum/auth.enum";

export const addResultServices = async (
  subject: string,
  marks: string,
  grade: string,
  status: "pass" | "NG",
  userId: string,
) => {
  const results = await Result.create({
    subject,
    marks,
    grade,
    ResultStatus,
    userId,
  });

  return results;
};

export const getAllResultServices = async () => {
  const results = await Result.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "name", "rollNumber", "class"],
      },
    ],
  });
  return results;
};
export const getResultByIdServices = async (id: string) => {
  const results = await Result.findByPk(id);
  return results;
};

export const updateResultByIdServices = async (id: string, data: any) => {
  const results = await Result.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "name", "rollNumber", "class"],
      },
    ],
  });
  if (!results) {
    throw new Error("RESULT_NOT_FOUND");
  }

  results.set(data);
  results.save();
  return results;
};

export const deleteResultServices = async (id: string) => {
  const results = await Result.findByPk(id);
  if (!results) {
    throw new Error("RESULT_NOT_FOUND");
  }

  results.destroy();
  return results;
};
