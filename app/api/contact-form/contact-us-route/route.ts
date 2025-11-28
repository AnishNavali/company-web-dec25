import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, designation, phone, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Use environment variables for credentials
    const user = process.env.GMAIL_USER || "anish.equilibrate@gmail.com";
    const pass = process.env.GMAIL_PASS || "ufsmbhlpjcwfmfob";

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass,
      },
    });

    // Verify connection
    await transporter.verify();

    // Email to company
    const companyMailOptions = {
      from: `"Corporate Contact Form" <${user}>`, // Use authenticated user
      to: "anish.equilibrate@gmail.com",
      subject: `New Contact Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="color: #3498db; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${designation ? `<p><strong>Designation:</strong> ${designation}</p>` : ''}
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
            <h3 style="color: #3498db; margin-top: 0;">Message</h3>
            <p>${message}</p>
          </div>
          
          <div style="margin-top: 30px; font-size: 12px; color: #7f8c8d;">
            <p>This message was received through the corporate contact form.</p>
          </div>
        </div>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: `"EQUILIBRATE AI" <${user}>`, // Use authenticated user
      to: email, // Send to user's email
      subject: `We've received your message`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Message Received</h1>
          
          <p style="font-size: 16px;"><strong>Dear ${name},</strong></p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
            <p style="margin: 0;">Thank you for contacting us. We've received your message and will respond within 24-48 hours.</p>
          </div>
          
          <p>For reference, here's what you submitted:</p>
          <blockquote style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
            ${message}
          </blockquote>
          
          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee;">
            <p style="margin-bottom: 5px;">Best regards,</p>
            <p style="margin-top: 0; font-weight: bold;">EQUILIBRATE AI TEAM</p>
            <p style="margin: 0; font-size: 12px; color: #7f8c8d;">This is an automated message - please do not reply directly to this email.</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send message', error: error.message || String(error) },
      { status: 500 }
    );
  }
}
