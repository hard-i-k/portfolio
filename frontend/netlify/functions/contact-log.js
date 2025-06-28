// Alternative contact function using built-in fetch for external email service
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' }
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
    
    // Basic validation
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

    // Log the contact form submission with full details
    console.log('=== CONTACT FORM SUBMISSION ===')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Subject:', subject)
    console.log('Message:', message)
    console.log('IP Address:', event.headers['x-forwarded-for'] || 'unknown')
    console.log('User Agent:', event.headers['user-agent'] || 'unknown')
    console.log('================================')

    // For now, we'll just log and return success
    // You can manually check the Netlify function logs to see all contact form submissions
    // TODO: Set up email sending service (EmailJS, SendGrid, or fix nodemailer)
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Thank you for your message! I have received it and will get back to you soon. (Currently logged to system for manual review)',
        timestamp: new Date().toISOString(),
        contact_id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      })
    }

  } catch (error) {
    console.error('Contact form processing error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to process your message. Please try again or contact me directly at hardikcp5@gmail.com',
        error_code: 'PROCESSING_ERROR',
        timestamp: new Date().toISOString()
      })
    }
  }
}
