const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Create SMTP transporter
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }

  // Gmail specific settings
  if (process.env.SMTP_HOST === 'smtp.gmail.com') {
    config.tls = {
      rejectUnauthorized: false
    }
  }

  console.log('Creating transporter with config:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: config.auth.user
  })

  return nodemailer.createTransport(config)
}

// Email templates
const createEmailTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Message</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { background: white; padding: 10px; border-radius: 5px; margin-top: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>🚀 New Portfolio Contact Message</h2>
        <p>You've received a new message from your portfolio website!</p>
      </div>
      <div class="content">
        <div class="field">
          <div class="label">👤 From:</div>
          <div class="value">${data.name}</div>
        </div>
        <div class="field">
          <div class="label">📧 Email:</div>
          <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
        </div>
        <div class="field">
          <div class="label">📝 Subject:</div>
          <div class="value">${data.subject}</div>
        </div>
        <div class="field">
          <div class="label">💬 Message:</div>
          <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
        </div>
      </div>
      <div class="footer">
        <p>📅 Received: ${new Date().toLocaleString()}</p>
        <p>🌐 Source: Portfolio Contact Form</p>
      </div>
    </body>
    </html>
  `
}

// Middleware
app.use(helmet())
app.use(compression())

// CORS configuration - Allow development and production origins
app.use(cors({
  origin: [
    'http://localhost:5173',  // Vite default
    'http://localhost:3000',  // Our frontend port
    'http://127.0.0.1:5173', 
    'http://127.0.0.1:3000',
    'http://localhost:4173',  // Vite preview
    'http://127.0.0.1:4173',
    'https://hardik-kannojia.netlify.app',  // Your Netlify URL
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
    cors: 'enabled',
    origin: req.headers.origin || 'no-origin'
  })
})

// CORS test endpoint
app.get('/api/test-cors', (req, res) => {
  res.json({
    message: 'CORS is working!',
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  })
})

// Email test endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    console.log('Testing email configuration...')
    
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.json({
        success: false,
        message: 'SMTP not configured',
        config: {
          host: !!process.env.SMTP_HOST,
          user: !!process.env.SMTP_USER,
          pass: !!process.env.SMTP_PASS
        }
      })
    }

    const transporter = createTransporter()
    
    // Test connection
    console.log('Testing SMTP connection...')
    await transporter.verify()
    console.log('SMTP connection successful!')

    // Send test email
    const testMailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject: 'Portfolio Email Test',
      html: `
        <h2>Email Test Successful!</h2>
        <p>This is a test email from your portfolio backend.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
        <p>If you receive this, your email configuration is working correctly!</p>
      `
    }

    const info = await transporter.sendMail(testMailOptions)
    console.log('Test email sent:', info.messageId)

    res.json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: info.messageId,
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL
      }
    })

  } catch (error) {
    console.error('Email test failed:', error)
    res.status(500).json({
      success: false,
      message: 'Email test failed',
      error: error.message,
      stack: error.stack
    })
  }
})

// Test email sending with sample contact form data
app.get('/api/test-contact-email', async (req, res) => {
  try {
    console.log('Testing contact form email functionality...')
    
    // Sample contact form data
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Contact Form Message',
      message: 'This is a test message from the contact form to verify email delivery.'
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.json({
        success: false,
        message: 'SMTP not configured',
        config: {
          host: !!process.env.SMTP_HOST,
          user: !!process.env.SMTP_USER,
          pass: !!process.env.SMTP_PASS
        }
      })
    }

    const transporter = createTransporter()
    
    // Test connection
    console.log('Testing SMTP connection...')
    await transporter.verify()
    console.log('SMTP connection successful!')

    // Send test contact form email
    const mailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject: `Portfolio Contact: ${testData.subject}`,
      html: createEmailTemplate(testData),
      replyTo: testData.email
    }

    console.log('Sending test contact email to:', process.env.TO_EMAIL)
    const info = await transporter.sendMail(mailOptions)
    console.log('Test contact email sent:', info.messageId)

    res.json({
      success: true,
      message: 'Test contact email sent successfully!',
      messageId: info.messageId,
      sentTo: process.env.TO_EMAIL,
      subject: mailOptions.subject,
      testData: testData
    })

  } catch (error) {
    console.error('Test contact email failed:', error)
    res.status(500).json({
      success: false,
      message: 'Test contact email failed',
      error: error.message
    })
  }
})

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      })
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('SMTP not configured, logging message:', { name, email, subject, message })
      return res.json({
        success: true,
        message: 'Message received! SMTP not configured - check server logs.'
      })
    }

    console.log('SMTP Configuration:')
    console.log('- Host:', process.env.SMTP_HOST)
    console.log('- Port:', process.env.SMTP_PORT)
    console.log('- User:', process.env.SMTP_USER)
    console.log('- From Email:', process.env.FROM_EMAIL)
    console.log('- To Email:', process.env.TO_EMAIL)

    // Create transporter
    const transporter = createTransporter()

    // Verify SMTP connection
    console.log('Verifying SMTP connection...')
    await transporter.verify()
    console.log('SMTP connection verified successfully!')

    // Email to yourself (notification)
    const mailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject: `Portfolio Contact: ${subject}`,
      html: createEmailTemplate({ name, email, subject, message }),
      replyTo: email
    }

    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo
    })

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully!')
    console.log('- Message ID:', info.messageId)
    console.log('- Response:', info.response)

    // Optional: Send confirmation email to the sender
    const confirmationOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
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
    }

    // Send confirmation email (optional)
    try {
      await transporter.sendMail(confirmationOptions)
      console.log('Confirmation email sent to:', email)
    } catch (confirmError) {
      console.log('Confirmation email failed (non-critical):', confirmError.message)
    }

    res.json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    // More specific error messages
    let errorMessage = 'Internal server error. Please try again later.'
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check SMTP credentials.'
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Failed to connect to email server. Please try again later.'
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage
    })
  }
})

// Analytics endpoint
app.post('/api/analytics/page-view', (req, res) => {
  try {
    const { page, timestamp } = req.body
    
    // Here you would typically save to database or analytics service
    console.log('Page view:', { page, timestamp })
    
    res.json({ success: true })
  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ success: false })
  }
})

// Project stats endpoint (for GitHub integration)
app.get('/api/projects/stats', async (req, res) => {
  try {
    // Mock data - in real app, fetch from GitHub API
    const stats = {
      totalProjects: 25,
      totalStars: 1250,
      totalForks: 340,
      languages: {
        JavaScript: 45,
        TypeScript: 30,
        Python: 15,
        CSS: 10
      }
    }

    res.json(stats)
  } catch (error) {
    console.error('Project stats error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch project stats' 
    })
  }
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  })
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
}

// Export for Vercel
module.exports = app
