const nodemailer = require('nodemailer')

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    }
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body)

    // Validation
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'All fields are required' })
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Invalid email format' })
      }
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'hardikcp5@gmail.com',
        pass: 'byjh tbif gxgs hvru'
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Email template
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { background: white; padding: 10px; border-radius: 5px; margin-top: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🚀 New Portfolio Contact Message</h2>
              <p>You've received a new message from your portfolio website!</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 From:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">📝 Subject:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>📅 Received: ${new Date().toLocaleString()}</p>
              <p>🌐 Source: Portfolio Contact Form</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send email
    await transporter.sendMail({
      from: '"Hardik Kannoija Portfolio" <hardikcp5@gmail.com>',
      to: 'hardikcp5@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: emailTemplate,
      replyTo: email
    })

    // Send confirmation email to sender
    const confirmationTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #667eea;">Thank you for your message, ${name}!</h2>
        <p>I've received your message and will get back to you within 24 hours.</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h4>Your message:</h4>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
        <p>Best regards,<br>Hardik Kannoija</p>
        <p style="color: #666; font-size: 12px;">This is an automated response from my portfolio website.</p>
      </div>
    `

    try {
      await transporter.sendMail({
        from: '"Hardik Kannoija Portfolio" <hardikcp5@gmail.com>',
        to: email,
        subject: 'Thank you for contacting me!',
        html: confirmationTemplate
      })
    } catch (confirmError) {
      console.log('Confirmation email failed (non-critical):', confirmError.message)
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      })
    }

  } catch (error) {
    console.error('Contact form error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to send message. Please try again later.'
      })
    }
  }
}
