import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const noticePeriodRaw = formData.get('noticePeriod') as string;
    let noticePeriod = noticePeriodRaw;
    
    if (noticePeriodRaw) {
      try {
        const dateObj = new Date(noticePeriodRaw);
        noticePeriod = dateObj.toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        });
      } catch {
        noticePeriod = noticePeriodRaw;
      }
    }
    
    const coverLetter = formData.get('coverLetter') as string;
    const skills = formData.get('skills') as string;
    const experience = formData.get('experience') as string;
    const linkedinUrl = formData.get('linkedinUrl') as string;
    const portfolioUrl = formData.get('portfolioUrl') as string;
    const resumeFile = formData.get('resume') as File | null;

    if (!firstName || !lastName || !email || !position) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const attachments = [];
    if (resumeFile) {
      const buffer = await resumeFile.arrayBuffer();
      attachments.push({
        filename: resumeFile.name,
        content: Buffer.from(buffer),
      });
    }

    // Use environment variables for credentials
    const user = process.env.GMAIL_USER || "anish.equilibrate@gmail.com";
    const pass = process.env.GMAIL_PASS || "ufsmbhlpjcwfmfob";

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    await transporter.verify();

    // Email to HR
    const hrEmail = {
      from: `"HR Recruitment Portal" <${user}>`,
      to: "anish.equilibrate@gmail.com",
      subject: `New Application Received - ${position} (${firstName} ${lastName})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">New Job Application Received</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #3498db; margin-top: 0;">Candidate Details</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Position Applied:</strong> ${position}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          </div>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #3498db; margin-top: 0;">Professional Information</h3>
            <p><strong>Skills:</strong> ${skills || 'Not provided'}</p>
            <p><strong>Experience:</strong> ${experience || 'Not provided'}</p>
            <p><strong>Notice Period:</strong> ${noticePeriod || 'Not provided'}</p>
            <p><strong>LinkedIn:</strong> ${linkedinUrl ? `<a href="${linkedinUrl}">View Profile</a>` : 'Not provided'}</p>
            <p><strong>Portfolio:</strong> ${portfolioUrl ? `<a href="${portfolioUrl}">View Portfolio</a>` : 'Not provided'}</p>
          </div>
          ${coverLetter ? `
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <h3 style="color: #3498db; margin-top: 0;">Cover Letter</h3>
            <p>${coverLetter}</p>
          </div>` : ''}
          <p style="margin-top: 20px;">Resume has been attached to this email.</p>
        </div>
      `,
      attachments,
    };

    // Email to Applicant
    const userEmail = {
      from: `"HR Recruitment Team" <${user}>`,
      to: email,
      subject: `Application Submitted Successfully for ${position}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Application Submitted Successfully!</h1>
          <p style="font-size: 16px;"><strong>Hey ${firstName.toUpperCase()} 😊</strong></p>
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
            <p style="margin: 0;">Your application for <strong>${position}</strong> has been submitted successfully.</p>
          </div>
          <p>We will review your application and get back to you shortly.</p>
          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee;">
            <p style="margin-bottom: 5px;">Best regards,</p>
            <p style="margin-top: 0; font-weight: bold;">HR Recruitment Team</p>
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(hrEmail),
      transporter.sendMail(userEmail),
    ]);

    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error("❌ Error sending email:", error);
    return NextResponse.json(
      { message: "Submission failed", error: error.message || String(error) },
      { status: 500 }
    );
  }
}
