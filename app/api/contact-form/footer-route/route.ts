import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Define credentials
    const user = process.env.GMAIL_USER || "anish.equilibrate@gmail.com";
    const pass = process.env.GMAIL_PASS || "ufsmbhlpjcwfmfob"; // Ensure this App Password is active

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    // Email to company
    const companyMailOptions = {
      from: `"Corporate Contact Form" <${user}>`, // Use consistent user
      to: "anish.equilibrate@gmail.com", // Where you want to receive the email
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #3498db; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <h3 style="color: #3498db; margin-top: 0;">Message</h3>
            <p>${message}</p>
          </div>
        </div>
      `,
    };

    // Email to user
    const userMailOptions = {
      from: `"EQUILIBRATE AI" <${user}>`,
      to: email, // Send to the user's email address
      subject: `We've received your message about ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Message Received</h1>
          <p style="font-size: 16px;"><strong>Dear ${name},</strong></p>
          <p>Thank you for contacting us regarding <strong>${subject}</strong>. We've received your message and will respond soon.</p>
          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee;">
            <p style="margin-bottom: 5px;">Best regards,</p>
            <p style="margin-top: 0; font-weight: bold;">EQUILIBRATE AI TEAM</p>
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error('Error sending email:', error.message || error);
    return NextResponse.json(
      { message: 'Failed to send message', error: error.message },
      { status: 500 }
    );
  }
}
