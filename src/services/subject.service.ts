import Subject from "../database/models/subject.models";

export const addSubjectServices = async (
  subjectName: string,
  subjectCode: string,
  fullMarks: string,
  passMarks: string,
) => {
  const subjects = await Subject.create({
    subjectName,
    subjectCode,
    fullMarks,
    passMarks,
  });

  return subjects;
};

export const getAllSubjectServices = async () => {
  const subjects = await Subject.findAll();
  return subjects;
};
export const getSubjectByIdServices = async (id: string) => {
  const subjects = await Subject.findByPk(id);
  return subjects;
};

export const updateSubjectByIdServices = async (id: string, data: any) => {
  const subjects = await Subject.findByPk(id);
  if (!subjects) {
    throw new Error("SUBJECT_NOT_FOUND");
  }

  subjects.set(data);
  subjects.save();
  return subjects;
};

export const deleteSubjectServices = async (id: string) => {
  const subjects = await Subject.findByPk(id);
  if (!subjects) {
    throw new Error("SUBJECT_NOT_FOUND");
  }

  subjects.destroy();
  return subjects;
};
