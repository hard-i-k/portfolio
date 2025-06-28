// Simple backup contact function for testing
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
    
    // Log the contact attempt (for debugging)
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      ip: event.headers['x-forwarded-for'] || 'unknown'
    })

    // Simulate successful email sending
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Message received! This is a test response. Email functionality is being configured.',
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    console.error('Backup contact form error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to process message',
        error: error.message
      })
    }
  }
}
