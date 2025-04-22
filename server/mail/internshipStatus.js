export const getInternshipStatusEmail = (name, status, company, position) => {
  const approvedSection = `
      <div class="status approved">
        <strong>Congratulations!</strong> Your internship at <strong>${company}</strong> as <strong>${position}</strong> has been <strong>approved</strong>.
      </div>
    `;

  const rejectedSection = `
      <div class="status rejected">
        <strong>We’re sorry.</strong> Your internship application at <strong>${company}</strong> as <strong>${position}</strong> has been <strong>rejected</strong>.
      </div>
    `;

  const statusSection =
    status === "Approved" ? approvedSection : rejectedSection;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background-color: #fafafa;
          }
          .header {
            text-align: center;
            padding-bottom: 10px;
          }
          .status {
            font-size: 18px;
            margin: 20px 0;
            padding: 15px;
            border-radius: 5px;
          }
          .approved {
            background-color: #e0f7e9;
            color: #2e7d32;
          }
          .rejected {
            background-color: #fdecea;
            color: #c62828;
          }
          .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #555;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Internship Status Update</h2>
          </div>
  
          <p>Dear <strong>${name}</strong>,</p>
  
          <p>We wanted to update you regarding the status of your internship application:</p>
  
          ${statusSection}
  
          <p>If you have any questions or need further information, feel free to reach out to your faculty supervisor.</p>
        </div>
      </body>
    </html>
    `;
};
