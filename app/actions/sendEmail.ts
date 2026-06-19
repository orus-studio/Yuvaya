'use server'

import nodemailer from 'nodemailer'

interface EmailData {
  name: string
  email: string
  phone?: string
  message: string
}

export async function sendContactEmail(data: EmailData) {
  const host = process.env.SMTP_HOST || 'smtp.resend.com' // SMTP Server Host
  const port = parseInt(process.env.SMTP_PORT || '465') // SMTP Server Port
  const user = process.env.SMTP_USER // Authenticated email or username (e.g., 'resend')
  const pass = process.env.SMTP_PASSWORD // API Key or Password
  const receiver = process.env.CONTACT_RECEIVER || 'hello@yuvaya.in' // Where you receive emails
  const sender = process.env.SMTP_FROM || 'hello@yuvaya.in' // Verified domain email to send from

  if (!user || !pass) {
    console.error('SMTP credentials are not configured in environment variables.')
    return { success: false, error: 'Mail server credentials are not configured in .env' }
  }

  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587 or 25
    auth: {
      user,
      pass,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false, // Prevents certificate verification issues on custom domains
    }
  })

  // Format email
  const mailOptions = {
    from: `"${data.name} via Yuvaya Contact" <${sender}>`, // Must be a verified domain email
    to: receiver,
    replyTo: data.email, // Allows replying directly to the customer when hitting 'Reply'
    subject: `New Contact Submission from ${data.name}`,
    text: `You have received a new contact message:\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone || 'N/A'}\n\n` +
      `Message:\n${data.message}\n\n` +
      `---\nSent from Yuvaya website contact form.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #26312d; background-color: #fffdf2; padding: 25px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(17,115,27,0.2);">
        <h2 style="color: #11731b; border-bottom: 2px solid #11731b; padding-bottom: 12px; margin-top: 0; font-weight: 600;">New Contact Form Message</h2>
        <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #26312d;">Name:</td>
            <td style="padding: 8px 0; color: #26312d;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #26312d;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #11731b; text-decoration: underline;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #26312d;">Phone:</td>
            <td style="padding: 8px 0; color: #26312d;">${data.phone || 'N/A'}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #11731b; white-space: pre-wrap; color: #26312d; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <strong style="display: block; margin-bottom: 6px; color: #11731b;">Message:</strong>
          ${data.message}
        </div>
        <hr style="border: 0; border-top: 1px solid rgba(38,49,45,0.1); margin-top: 25px; margin-bottom: 15px;" />
        <p style="font-size: 11px; color: #5a5a5a; text-align: center; margin: 0;">This email was sent automatically from the Yuvaya Contact Form.</p>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error: any) {
    console.error('SMTP sending error:', error)
    return { success: false, error: error.message || 'Error occurred while sending email.' }
  }
}

export interface QuizSubmissionData {
  name: string
  email: string
  answers: { question: string; answer: string }[]
  ageGroup: string
  identifyAs: string
  drinkType: string
  wellnessGoal: string
  snackMatters: string
  sweetSpot: string
}

export async function sendQuizSubmission(data: QuizSubmissionData) {
  const host = process.env.SMTP_HOST || 'smtp.resend.com'
  const port = parseInt(process.env.SMTP_PORT || '465')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD
  const receiver = process.env.CONTACT_RECEIVER || 'hello@yuvaya.in'
  const sender = process.env.SMTP_FROM || 'hello@yuvaya.in'

  let emailSent = false
  let webhookSent = false
  let errorMsg = ''

  // 1. Post to Google Sheet webhook if configured
  const webhookUrl = process.env.QUIZ_WEBHOOK_URL
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          answers: data.answers, // Include the full answers array so the Google Sheet script can map questions dynamically
          ageGroup: data.ageGroup,
          identifyAs: data.identifyAs,
          drinkType: data.drinkType,
          wellnessGoal: data.wellnessGoal,
          snackMatters: data.snackMatters,
          sweetSpot: data.sweetSpot,
        }),
      })
      if (response.ok) {
        webhookSent = true
      } else {
        console.error('Quiz Webhook failed response status:', response.status)
      }
    } catch (webhookErr: any) {
      console.error('Quiz Webhook connection error:', webhookErr)
    }
  }

  // 2. Send Email using nodemailer
  if (!user || !pass) {
    console.error('SMTP credentials are not configured in environment variables for Quiz.')
    return {
      success: webhookSent,
      emailSuccess: false,
      webhookSuccess: webhookSent,
      error: webhookSent ? undefined : 'Mail server credentials are not configured in .env'
    }
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    }
  })

  // Format Answers for Email
  const answersHtml = data.answers
    .map(
      (a) => `
      <tr style="border-bottom: 1px solid rgba(38,49,45,0.05);">
        <td style="padding: 10px 0; font-weight: bold; color: #11731b; font-size: 13px;">${a.question}</td>
        <td style="padding: 10px 0; color: #26312d; font-size: 13px; text-align: right;">${a.answer}</td>
      </tr>
    `
    )
    .join('')

  const mailOptions = {
    from: `"${data.name} via Yuvaya Quiz" <${sender}>`,
    to: receiver,
    replyTo: data.email.includes('@') ? data.email : undefined,
    subject: `New Offer Quiz Lead from ${data.name}`,
    text: `New Quiz Lead Details:\n\n` +
      `Name: ${data.name}\n` +
      `${data.email.includes('@') ? 'Email' : 'Contact Number'}: ${data.email}\n\n` +
      `Answers:\n` +
      data.answers.map((a) => `- ${a.question}: ${a.answer}`).join('\n') +
      `\n\n---\nSent from Yuvaya offer quiz popup.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #26312d; background-color: #fffdf2; padding: 25px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(17,115,27,0.2);">
         <h2 style="color: #11731b; border-bottom: 2px solid #11731b; padding-bottom: 12px; margin-top: 0; font-weight: 600; text-align: center;">New Quiz Lead Collected</h2>
         <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
           <tr>
             <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #26312d; font-size: 14px;">Name:</td>
             <td style="padding: 8px 0; color: #26312d; font-size: 14px;">${data.name}</td>
           </tr>
           <tr>
             <td style="padding: 8px 0; font-weight: bold; color: #26312d; font-size: 14px;">${data.email.includes('@') ? 'Email' : 'Contact Number'}:</td>
             <td style="padding: 8px 0; font-size: 14px;">
               ${data.email.includes('@')
        ? `<a href="mailto:${data.email}" style="color: #11731b; text-decoration: underline;">${data.email}</a>`
        : `<span style="color: #26312d;">${data.email}</span>`
      }
             </td>
           </tr>
         </table>
        
        <h3 style="color: #26312d; border-top: 1px solid rgba(38,49,45,0.1); padding-top: 15px; margin-top: 20px; font-weight: 600; font-size: 15px;">Quiz Responses</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${answersHtml}
        </table>
        
        <hr style="border: 0; border-top: 1px solid rgba(38,49,45,0.1); margin-top: 25px; margin-bottom: 15px;" />
        <p style="font-size: 11px; color: #5a5a5a; text-align: center; margin: 0;">This email was sent automatically from the Yuvaya Offer Quiz Form.</p>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    emailSent = true
  } catch (error: any) {
    console.error('Quiz SMTP sending error:', error)
    errorMsg = error.message || 'Error occurred while sending quiz email.'
  }

  return {
    success: emailSent || webhookSent,
    emailSuccess: emailSent,
    webhookSuccess: webhookSent,
    error: emailSent || webhookSent ? undefined : errorMsg
  }
}
