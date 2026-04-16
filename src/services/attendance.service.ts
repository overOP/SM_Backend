import puppeteer from "puppeteer";
import Attendance from "../database/models/attendance.models";
import User from "../database/models/user.models";

export const addAttendanceServices = async (
  studentId: string,
  subjectId: string,
  AttendanceStatus: any,
) => {
  const attendances = await Attendance.create({
    studentId,
    subjectId,
    AttendanceStatus,
  });
  return attendances;
};

export const getAllAttendanceServices = async () => {
  const attendances = await Attendance.findAll({
    include: {
      model: User,
      attributes: ["name", "email", "rollNumber", "section", "classGrade"],
    },
  });
  return attendances;
};

export const getAttendanceByIdServices = async (id: string) => {
  const attendances = await Attendance.findByPk(id, {
    include: {
      model: User,
      attributes: ["name", "email", "rollNumber", "section", "classGrade"],
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
export const downloadAttendanceServices = async (id: string) => {
  const attendances = await Attendance.findByPk(id, {
    include: {
      model: User,
      attributes: ["name", "email", "rollNumber", "section", "classGrade"],
    },
  });
  if (!attendances) {
    throw new Error("ATTENDANCE_NOT_FOUND");
  }

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background: #f4f4f4; }
        </style>
      </head>
      <body>
        <h1>School Result Report</h1>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Roll Number</th>
              <th>Class Grade</th>
              <th>Status</th>
            </tr>
          </thead>
         <tbody>

            <tr>
              <td>${attendances.user?.name ?? ""}</td>
              <td>${attendances.user?.email ?? ""}</td>
              <td>${attendances.user?.rollNumber ?? ""}</td>
              <td>${attendances.user?.classGrade ?? ""}</td>
              <td>${attendances.status}</td>

            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfPage = await page.pdf({
    format: "a4",
    printBackground: true,
    margin: {
      top: "20px",
      bottom: "20px",
      right: "16px",
      left: "16px",
    },
  });

  return pdfPage;
};
