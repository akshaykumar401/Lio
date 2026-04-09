import nodemailer, { type Transporter } from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  otp: number;
}

async function sendEmail({ to, subject, otp }: EmailOptions): Promise<boolean> {
  // 1. Create a transporter with type definition
  const transporter: Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the mail options
  const mailOptions = {
    from: "Lio",
    to,
    subject,
    html: `
    <div
    style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; color: #333333;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="450"
                    style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">

                    <tr>
                        <td align="center" style="padding: 30px 40px 10px 40px;">
                            <h2
                                style="margin: 0; color: #4A90E2; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                                Lio</h2>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 20px 40px 30px 40px;">
                            <h1
                                style="margin: 0 0 20px; font-size: 20px; font-weight: 600; color: #1a1a1a; text-align: center;">
                                OTP for Reset Password</h1>
                            <p
                                style="margin: 0 0 25px; font-size: 16px; line-height: 1.5; color: #555555; text-align: center;">
                                Please use the following One-Time Password (OTP) for Password Reset. This code is
                                valid for 10 minutes.
                            </p>

                            <div style="text-align: center; margin: 30px 0;">
                                <span
                                    style="display: inline-block; padding: 15px 30px; background-color: #f0f7ff; border: 1px dashed #4A90E2; border-radius: 6px; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #4A90E2;">
                                    ${otp}
                                </span>
                            </div>

                            <p
                                style="margin: 25px 0 0; font-size: 14px; line-height: 1.5; color: #888888; text-align: center;">
                                If you didn't request this code, you can safely ignore this email. Someone might have
                                typed your email address by mistake.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
    `
  };

  // 3. Send mail with error handling
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

// // Example usage
// sendEmail({
//   to: "[EMAIL_ADDRESS]",
//   subject: "Testing TypeScript Nodemailer",
//   text: "Hello from a TypeScript environment!"
// });


export { sendEmail };