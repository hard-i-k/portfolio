const nodemailer = require('nodemailer')

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  }

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    }
  }

  try {
    // Check if nodemailer is available
    if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
      console.error('Nodemailer module issue:', {
        nodemailerExists: !!nodemailer,
        createTransportType: typeof (nodemailer && nodemailer.createTransport),
        nodemailerKeys: nodemailer ? Object.keys(nodemailer) : 'undefined'
      })
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Nodemailer dependency not available',
          error: 'nodemailer.createTransport is not a function',
          details: {
            timestamp: new Date().toISOString(),
            errorType: 'TypeError',
            nodemailerAvailable: !!nodemailer,
            createTransportType: typeof (nodemailer && nodemailer.createTransport)
          }
        })
      }
    }
    // Create SMTP transporter with environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'hardikcp5@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    })

    // Check if required environment variables are set
    if (!process.env.GMAIL_APP_PASSWORD) {
      console.error('GMAIL_APP_PASSWORD environment variable not set')
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Email service not configured - missing environment variables',
          error: 'GMAIL_APP_PASSWORD not set'
        })
      }
    }

    // Test the connection
    console.log('Testing SMTP connection...')
    await transporter.verify()
    console.log('SMTP connection successful!')

    // Send a test email
    const testEmail = {
      from: '"Portfolio Test" <hardikcp5@gmail.com>',
      to: 'hardikcp5@gmail.com',
      subject: 'Test Email - Portfolio Contact Form',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #667eea;">Portfolio Contact Form Test</h2>
          <p>This is a test email to verify that the email functionality is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Source:</strong> Netlify Function Test</p>
        </div>
      `
    }

    const info = await transporter.sendMail(testEmail)
    console.log('Test email sent:', info.messageId)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Test email sent successfully!',
        messageId: info.messageId,
        timestamp: new Date().toISOString(),
        config: {
          service: 'gmail',
          user: process.env.GMAIL_USER || 'hardikcp5@gmail.com (fallback)',
          hasPassword: !!(process.env.GMAIL_APP_PASSWORD || 'byjh tbif gxgs hvru')
        }
      })
    }

  } catch (error) {
    console.error('Test email error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Test email failed',
        error: error.message,
        code: error.code,
        details: {
          timestamp: new Date().toISOString(),
          errorType: error.name,
          command: error.command
        }
      })
    }
  }
}
