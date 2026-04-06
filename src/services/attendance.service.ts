import Attendance from "../database/models/attendance.models";
import User from "../database/models/user.models";
import { AttendanceStatus } from "../enum/auth.enum";

export const addAttendanceServices = async (
  studentId: string,
  AttendanceStatus: any,
) => {
  const attendances = await Attendance.create({
    studentId,
    AttendanceStatus,
  });
  return attendances;
};

export const getAllAttendanceServices = async () => {
  const attendances = await Attendance.findAll({
    include: {
      model: User,
      attributes: ["name", "rollNumber", "section", "class"],
    },
  });
  return attendances;
};

export const getAttendanceByIdServices = async (id: string) => {
  const attendances = await Attendance.findByPk(id, {
    include: {
      model: User,
      attributes: ["name", "rollNumber", "section", "class"],
    },
  });
  return attendances;
};

export const updateAttendanceByIdServices = async (id: string, data: any) => {
  const attendances = await Attendance.findByPk(id);
  if (!attendances) {
    throw new Error("ATTENDANCE_NOT_FOUND");
  }

  attendances.set(data);
  attendances.save();
  return attendances;
};

export const deleteAttendanceServices = async (id: string) => {
  const attendances = await Attendance.findByPk(id);
  if (!attendances) {
    throw new Error("ATTENDANCE_NOT_FOUND");
  }

  attendances.destroy();
  return attendances;
};
