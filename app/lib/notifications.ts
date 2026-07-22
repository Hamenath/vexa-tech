import nodemailer from "nodemailer";
import { Lead } from "../types/lead";
import { sendWhatsAppLeadAlert } from "./twilio";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendLeadNotifications(lead: Lead) {
  // 1. Email Admin
  const mailOptions = {
    from: `"VEXA TECH System" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `New Lead: ${lead.fullName} for ${lead.serviceRequired}`,
    html: `
      <div style="font-family: sans-serif; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #0f62fe;">New Lead Alert</h2>
        <p><strong>Name:</strong> ${lead.fullName}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Service:</strong> ${lead.serviceRequired}</p>
        <p><strong>Budget:</strong> ${lead.projectBudget}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${lead.message}</p>
        <p style="font-size: 12px; color: #888; margin-top: 20px;">Received at: ${new Date(lead.createdAt).toLocaleString()}</p>
      </div>
    `,
  };

  // 2. Email User Confirmation
  const userMailOptions = {
    from: `"VEXA TECH" <${process.env.GMAIL_USER}>`,
    to: lead.email,
    subject: `We've received your inquiry - VEXA TECH`,
    html: `
      <div style="font-family: sans-serif; color: #333; padding: 30px; line-height: 1.6;">
        <h1 style="color: #0f62fe; margin-bottom: 20px;">Hi ${lead.fullName},</h1>
        <p>Thank you for reaching out to **VEXA TECH**. We've successfully received your inquiry for **${lead.serviceRequired}**.</p>
        <p>Our team is currently reviewing your details. You can expect to hear from one of our specialists within the next 24 business hours.</p>
        <br />
        <p>Best Regards,</p>
        <p><strong>VEXA TECH Team</strong></p>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 40px;" />
        <p style="font-size: 11px; color: #999;">This is an automated confirmation. Please do not reply directly to this email.</p>
      </div>
    `,
  };

  try {
    const notifications: Promise<unknown>[] = [
      transporter.sendMail(mailOptions),
      transporter.sendMail(userMailOptions),
    ];

    // 3. Trigger WhatsApp alert via new Twilio helper
    notifications.push(
      sendWhatsAppLeadAlert({
        name: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
      })
    );

    await Promise.allSettled(notifications);
  } catch (error) {
    console.error("Error sending notifications", error);
  }
}

export async function sendCareerNotifications(appData: {
  appId: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  position: string;
  experience: string;
  qualification: string;
  currentCompanyCollege?: string;
  noticePeriod?: string;
  expectedSalary?: string;
  skills: string;
  coverLetter: string;
  linkedin?: string;
  portfolio?: string;
  resumeURL: string;
  createdAt: number;
}) {
  // 1. Email HR
  const hrMailOptions = {
    from: `"VEXA TECH System" <${process.env.GMAIL_USER}>`,
    to: "vexatech.connect@gmail.com",
    subject: `🚀 New Career Application – ${appData.position}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1d1d1f; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e7; border-radius: 24px; overflow: hidden; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
        <!-- Branded Header -->
        <div style="background: #0071e3; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">VEXA TECH</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0 0; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">New Career Application</p>
        </div>
        
        <div style="padding: 32px; line-height: 1.6;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase; width: 180px;">Application ID</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 14px; color: #0071e3;">${appData.appId}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Name</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 600;">${appData.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px;"><a href="mailto:${appData.email}" style="color: #0071e3; text-decoration: none;">${appData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px;"><a href="tel:${appData.phone}" style="color: #0071e3; text-decoration: none;">${appData.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Location</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px; font-weight: 500;">${appData.city}, ${appData.state}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Position</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px; font-weight: 600;">${appData.position}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Experience</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px; font-weight: 600;">${appData.experience}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Qualification</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px;">${appData.qualification}</td>
            </tr>
            ${appData.currentCompanyCollege ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Company / College</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px;">${appData.currentCompanyCollege}</td>
            </tr>` : ""}
            ${appData.noticePeriod ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Notice Period</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px;">${appData.noticePeriod}</td>
            </tr>` : ""}
            ${appData.expectedSalary ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Expected Salary</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px;">${appData.expectedSalary}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Skills</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px; font-weight: 500;">${appData.skills}</td>
            </tr>
            ${appData.linkedin ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">LinkedIn</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px;"><a href="${appData.linkedin}" target="_blank" style="color: #0071e3; text-decoration: none;">${appData.linkedin}</a></td>
            </tr>` : ""}
            ${appData.portfolio ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase;">Portfolio</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f7; font-size: 14px;"><a href="${appData.portfolio}" target="_blank" style="color: #0071e3; text-decoration: none;">${appData.portfolio}</a></td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 24px; margin-bottom: 32px;">
            <p style="font-weight: bold; font-size: 13px; color: #86868b; text-transform: uppercase; margin-bottom: 8px;">Cover Letter</p>
            <div style="background: #f5f5f7; padding: 16px; border-radius: 14px; font-size: 14px; color: #1d1d1f; white-space: pre-wrap; line-height: 1.6;">${appData.coverLetter}</div>
          </div>

          <div style="text-align: center; margin-top: 36px; margin-bottom: 12px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="${appData.resumeURL}" target="_blank" style="display: inline-block; padding: 12px 28px; background: #0071e3; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Download Resume</a>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://vexatech.com'}/admin/careers" target="_blank" style="display: inline-block; padding: 12px 28px; background: #f5f5f7; color: #1d1d1f; border: 1px solid #e5e5e7; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-left: 10px;">Open Admin Dashboard</a>
          </div>
        </div>
        
        <div style="background: #f5f5f7; padding: 24px; text-align: center; border-top: 1px solid #e5e5e7;">
          <p style="font-size: 11px; color: #86868b; margin: 0;">This email was automatically generated by VEXA TECH Careers Protocol.</p>
        </div>
      </div>
    `,
  };

  // 2. Email Applicant Confirmation
  const applicantMailOptions = {
    from: `"VEXA TECH Recruitment" <${process.env.GMAIL_USER}>`,
    to: appData.email,
    subject: `Thank you for your application - VEXA TECH`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1d1d1f; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e7; border-radius: 24px; overflow: hidden; background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
        <!-- Branded Header -->
        <div style="background: #f5f5f7; padding: 32px; text-align: center; border-bottom: 1px solid #e5e5e7;">
          <h2 style="color: #1d1d1f; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">VEXA TECH</h2>
          <p style="color: #86868b; margin: 6px 0 0 0; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">Application Receipt Confirmation</p>
        </div>
        
        <div style="padding: 32px; line-height: 1.6;">
          <h3 style="font-size: 18px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Hello ${appData.fullName},</h3>
          <p style="margin-bottom: 24px; font-size: 14px; color: #515154;">Thank you for applying to VEXA TECH. We have successfully received your application details and resume.</p>
          
          <div style="background: #f5f5f7; padding: 20px; border-radius: 16px; margin-bottom: 28px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; font-size: 12px; color: #86868b; text-transform: uppercase;">Application ID</td>
                <td style="padding: 6px 0; font-weight: bold; font-size: 13px; color: #0071e3; text-align: right;">${appData.appId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; font-size: 12px; color: #86868b; text-transform: uppercase;">Position</td>
                <td style="padding: 6px 0; font-weight: bold; font-size: 13px; color: #1d1d1f; text-align: right;">${appData.position}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; font-size: 12px; color: #86868b; text-transform: uppercase;">Current Status</td>
                <td style="padding: 6px 0; font-weight: bold; font-size: 13px; color: #0071e3; text-align: right;">Received</td>
              </tr>
            </table>
          </div>

          <p style="margin-bottom: 0; font-size: 14px; color: #515154;">Our hiring team will review your qualifications and contact you within <strong>3–5 business days</strong> if your profile is shortlisted for the next rounds.</p>
          
          <p style="margin-top: 32px; font-size: 14px; color: #1d1d1f; font-weight: 600;">Regards,<br /><span style="color: #86868b; font-weight: 500;">The VEXA TECH Team</span></p>
        </div>

        <div style="background: #f5f5f7; padding: 24px; text-align: center; border-top: 1px solid #e5e5e7;">
          <p style="font-size: 11px; color: #86868b; margin: 0;">This is an automated receipt confirmation. Please do not reply directly to this email.</p>
        </div>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(hrMailOptions),
      transporter.sendMail(applicantMailOptions)
    ]);
  } catch (error) {
    console.error("Error sending career application emails:", error);
    throw error;
  }
}
