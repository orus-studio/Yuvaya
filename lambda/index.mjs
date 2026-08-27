import nodemailer from "nodemailer";

/**
 * AWS Lambda Handler for Yuvaya Forms (Contact Us & Offer Quiz Leads).
 * Supports Lambda Function URLs and API Gateway HTTP API.
 */
export const handler = async (event) => {
  // Common CORS Headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
    "Content-Type": "application/json",
  };

  // 1. Handle CORS Preflight (OPTIONS)
  const httpMethod = event.requestContext?.http?.method || event.httpMethod || "POST";
  if (httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "OK" }),
    };
  }

  // 2. Parse Request Body
  let body = {};
  try {
    body = typeof event.body === "string" ? JSON.parse(event.body) : event.body || {};
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: "Invalid JSON payload." }),
    };
  }

  const { action, data } = body;

  // 3. SMTP Config from Environment Variables
  const host = process.env.SMTP_HOST || "smtp.resend.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const receiver = process.env.CONTACT_RECEIVER || "hello@yuvaya.in";
  const sender = process.env.SMTP_FROM || "hello@yuvaya.in";
  const quizWebhookUrl = process.env.QUIZ_WEBHOOK_URL;

  // Initialize Nodemailer Transporter
  let transporter = null;
  if (user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });
  }

  // 4. Handle Contact Form Action
  if (action === "contact") {
    if (!data?.name || !data?.email || !data?.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: "Missing required contact fields." }),
      };
    }

    if (!transporter) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: "SMTP credentials not configured on Lambda.",
        }),
      };
    }

    try {
      await transporter.sendMail({
        from: `"${data.name} via Yuvaya Contact" <${sender}>`,
        to: receiver,
        replyTo: data.email,
        subject: `New Contact Submission from ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\n\nMessage:\n${data.message}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #26312d; background-color: #fffdf2; padding: 25px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(17,115,27,0.2);">
            <h2 style="color: #11731b; border-bottom: 2px solid #11731b; padding-bottom: 12px; margin-top: 0;">New Contact Form Message</h2>
            <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td><td>${data.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${data.phone || "N/A"}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #11731b;">
              <strong style="color: #11731b;">Message:</strong><br />${data.message}
            </div>
          </div>
        `,
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: "Contact email sent successfully." }),
      };
    } catch (err) {
      console.error("Contact form sending error:", err);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: err.message || "Failed to send email." }),
      };
    }
  }

  // 5. Handle Quiz Submission Action
  if (action === "quiz") {
    if (!data?.name || !data?.email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: "Missing required quiz lead details." }),
      };
    }

    let webhookSent = false;
    let emailSent = false;

    // A. Forward to Google Sheets Webhook if available
    if (quizWebhookUrl) {
      try {
        const sheetRes = await fetch(quizWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            answers: data.answers || [],
            ageGroup: data.ageGroup,
            identifyAs: data.identifyAs,
            drinkType: data.drinkType,
            wellnessGoal: data.wellnessGoal,
            snackMatters: data.snackMatters,
            sweetSpot: data.sweetSpot,
          }),
        });
        webhookSent = sheetRes.ok;
      } catch (sheetErr) {
        console.error("Google Sheets webhook error:", sheetErr);
      }
    }

    // B. Send Email Notification
    if (transporter) {
      try {
        const answersHtml = (data.answers || [])
          .map(
            (a) => `
            <tr style="border-bottom: 1px solid rgba(38,49,45,0.05);">
              <td style="padding: 8px 0; font-weight: bold; color: #11731b; font-size: 13px;">${a.question}</td>
              <td style="padding: 8px 0; color: #26312d; font-size: 13px; text-align: right;">${a.answer}</td>
            </tr>
          `
          )
          .join("");

        await transporter.sendMail({
          from: `"${data.name} via Yuvaya Quiz" <${sender}>`,
          to: receiver,
          replyTo: data.email.includes("@") ? data.email : undefined,
          subject: `New Offer Quiz Lead from ${data.name}`,
          text: `Name: ${data.name}\nContact: ${data.email}\n\nAnswers:\n${(data.answers || []).map((a) => `- ${a.question}: ${a.answer}`).join("\n")}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #26312d; background-color: #fffdf2; padding: 25px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(17,115,27,0.2);">
              <h2 style="color: #11731b; border-bottom: 2px solid #11731b; padding-bottom: 12px; margin-top: 0; text-align: center;">New Quiz Lead Collected</h2>
              <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td><td>${data.name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Contact:</td><td>${data.email}</td></tr>
              </table>
              <h3 style="color: #26312d; margin-top: 20px;">Quiz Responses</h3>
              <table style="width: 100%; border-collapse: collapse;">${answersHtml}</table>
            </div>
          `,
        });
        emailSent = true;
      } catch (mailErr) {
        console.error("Quiz email error:", mailErr);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: webhookSent || emailSent,
        webhookSuccess: webhookSent,
        emailSuccess: emailSent,
      }),
    };
  }

  return {
    statusCode: 400,
    headers,
    body: JSON.stringify({
      success: false,
      error: `Unknown action: '${action}'. Expected 'contact' or 'quiz'.`,
    }),
  };
};
