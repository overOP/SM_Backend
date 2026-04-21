import puppeteer from "puppeteer";
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
      attributes: ["name", "email"],
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

export const downloadFeeService = async (id: string) => {
  const fees = await Fee.findByPk(id, {
    include: {
      model: User,
      attributes: ["name", "email"],
    },
  });

  if (!fees) {
    throw new Error("FEE_NOT_FOUND");
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
        <h1>School Fee Report</h1>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Status</th>
            </tr>
          </thead>
         <tbody>
        
            <tr>  
              <td>${fees.user?.name ?? ""}</td>
              <td>${fees.user?.email ?? ""}</td>
              <td>${fees.totalAmount}</td>
              <td>${fees.paidAmount}</td>
              <td>${fees.dueAmount}</td>
              <td>${fees.AmountStatus}</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  // launch puppeteer
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // create page
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pagePdf = await page.pdf({
    format: "a4",
    printBackground: true,
    margin: {
      top: "20px",
      right: "20px",
      bottom: "16px",
      left: "16px",
    },
  });
  await browser.close();

  return pagePdf;
};
