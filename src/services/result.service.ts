import puppeteer from "puppeteer";
import Result from "../database/models/result.models";
import User from "../database/models/user.models";
import Subject from "../database/models/subject.models";

export const addResultServices = async (
  subjectId: string,
  marks: string,
  grade: string,
  ResultStatus: "pass" | "NG",
  studentId: string,
) => {
  const results = await Result.create({
    subjectId,
    marks,
    grade,
    ResultStatus,
    studentId,
  });

  return results;
};

export const getAllResultServices = async () => {
  const results = await Result.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "name", "email", "rollNumber", "classGrade"],
      },
      {
        model: Subject,
        attributes: [
          "id",
          "subjectName",
          "subjectCode",
          "fullMarks",
          "passMarks",
        ],
      },
    ],
  });
  return results;
};
export const getResultByIdServices = async (id: string) => {
  const results = await Result.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "name", "email", "rollNumber", "classGrade"],
      },
      {
        model: Subject,
        attributes: [
          "id",
          "subjectName",
          "subjectCode",
          "fullMarks",
          "passMarks",
        ],
      },
    ],
  });
  return results;
};

export const updateResultByIdServices = async (id: string, data: any) => {
  const results = await Result.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "name", "rollNumber", "classgrade"],
      },
      {
        model: Subject,
        attributes: [
          "id",
          "subjectName",
          "subjectCode",
          "fullMarks",
          "passMarks",
        ],
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

export const downloadsResultServices = async (id: string) => {
  const results = await Result.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "name", "email", "rollNumber", "classGrade"],
      },
      {
        model: Subject,
        attributes: [
          "id",
          "subjectName",
          "subjectCode",
          "fullMarks",
          "passMarks",
        ],
      },
    ],
  });
  if (!results) {
    throw new Error("RESULT_NOT_FOUND");
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
              <th>Subject</th>
              <th>Subject Code</th>
              <th>Full Marks</th>
              <th>Pass Marks</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Remarks</th>
            </tr>
          </thead>
         <tbody>
        
            <tr>  
              <td>${results.user?.name ?? ""}</td>
              <td>${results.user?.email ?? ""}</td>
              <td>${results.user?.rollNumber ?? ""}</td>
              <td>${results.user?.classGrade ?? ""}</td>
              <td>${results.subject?.subjectName}</td>
              <td>${results.subject?.subjectCode}</td>
              <td>${results.subject?.fullMarks}</td>
              <td>${results.subject?.passMarks}</td>
              <td>${results.marks}</td>
              <td>${results.grade}</td>
              <td>${results.status}</td>
              
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
  const pagePdf = await page.pdf({
    format: "a4",
    printBackground: true,
    margin: {
      top: "20px",
      bottom: "20px",
      right: "16px",
      left: "16px",
    },
  });

  await browser.close();
  return pagePdf;
};
