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
    // Parse request body
    const { name, email, subject, message } = JSON.parse(event.body || '{}')

    // Validation
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'All fields are required' })
      }
    }

    // Log the contact attempt for debugging
    console.log('📧 CONTACT FORM SUBMISSION:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString(),
      ip: event.headers['x-forwarded-for'] || 'unknown',
      userAgent: event.headers['user-agent'] || 'unknown'
    })

    // TODO: Send actual email (Gmail App Password needs to be updated)
    // For now, just log and return success
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Message received successfully! Email functionality is being configured. Your message has been logged.',
        timestamp: new Date().toISOString(),
        debug: {
          name: name,
          email: email,
          subject: subject,
          messageLength: message.length
        }
      })
    }

  } catch (error) {
    console.error('❌ Contact form error:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error. Please try again later.',
        error: error.message,
        timestamp: new Date().toISOString()
      })
    }
  }
}
