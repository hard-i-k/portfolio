# SMTP Email Setup Guide

## Overview
SMTP (Simple Mail Transfer Protocol) allows your backend server to send emails directly through email providers like Gmail, Outlook, etc. This is more reliable than frontend-only solutions and gives you better control.

## Benefits of SMTP over EmailJS:
- ✅ More reliable email delivery
- ✅ No monthly email limits (free with your Gmail account)
- ✅ Better security (credentials stored on server)
- ✅ Professional email formatting
- ✅ Automatic confirmation emails to users
- ✅ Full control over email templates

## Setup Instructions

### Option 1: Gmail SMTP (Recommended)

#### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click "Security" in the left menu
3. Enable "2-Step Verification" if not already enabled

#### Step 2: Generate App Password
1. In Google Account Security settings
2. Click "App passwords" (you need 2FA enabled first)
3. Select "Mail" and "Other (custom name)"
4. Enter "Portfolio Website" as the name
5. Click "Generate"
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

#### Step 3: Update Backend Environment
1. Open `backend/.env` file
2. Update the SMTP settings:

```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=hardikcp59@gmail.com
SMTP_PASS=your_16_character_app_password_here

# Email Settings
FROM_EMAIL=hardikcp59@gmail.com
FROM_NAME=Hardik Kannoija Portfolio
TO_EMAIL=hardikcp59@gmail.com
```

### Option 2: Outlook/Hotmail SMTP (Alternative)

#### Step 1: Update Backend Environment
```env
# Outlook SMTP Configuration
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_outlook_password

# Email Settings
FROM_EMAIL=your_email@outlook.com
FROM_NAME=Hardik Kannoija Portfolio
TO_EMAIL=hardikcp59@gmail.com
```

### Step 4: Start the Backend Server
1. Open terminal in the backend folder:
```bash
cd backend
npm install
npm run dev
```

2. You should see:
```
🚀 Server running on port 5000
📱 Health check: http://localhost:5000/api/health
```

### Step 5: Test the Setup
1. Make sure both frontend and backend are running:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

2. Fill out and submit the contact form
3. Check your email inbox for the message
4. The user should also receive a confirmation email

## How It Works

### Email Flow:
1. **User submits form** → Frontend sends data to backend API
2. **Backend validates** → Checks required fields and email format
3. **SMTP sends email** → Professional HTML email sent to your inbox
4. **Confirmation sent** → User receives thank you email
5. **Success response** → Frontend shows success message

### Email Features:
- **HTML formatted emails** with professional styling
- **Automatic replies** to users confirming receipt
- **Error handling** with specific error messages
- **Email validation** to prevent spam
- **Rate limiting** (can be added for production)

## Troubleshooting

### Common Issues:

#### "Authentication Failed" Error
- ✅ **Gmail**: Make sure you're using an App Password, not your regular password
- ✅ **Outlook**: Check if you need to enable "Less secure app access"

#### "Connection Refused" Error
- ✅ Check if your firewall/antivirus is blocking port 587
- ✅ Try using port 465 with `SMTP_SECURE=true`

#### "Backend Not Running" Error
- ✅ Make sure backend server is started: `npm run dev` in backend folder
- ✅ Check if port 5000 is available

#### Emails Going to Spam
- ✅ Add your domain to SPF records (for production)
- ✅ Use a professional "From" name and email
- ✅ Avoid spam keywords in subject lines

### Testing Commands:
```bash
# Test backend health
curl http://localhost:5000/api/health

# Test contact endpoint
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"Hello"}'
```

## Production Considerations

### For Deployment:
1. **Use environment variables** for all sensitive data
2. **Add rate limiting** to prevent spam
3. **Use proper domain** for email sending
4. **Set up monitoring** for email delivery
5. **Consider email services** like SendGrid for high volume

### Security Best Practices:
- ✅ Never commit `.env` files to version control
- ✅ Use App Passwords instead of account passwords
- ✅ Enable HTTPS in production
- ✅ Add input validation and sanitization
- ✅ Implement rate limiting

## Email Template Customization

The backend uses HTML email templates that you can customize in `server.js`. The current template includes:
- Professional styling with gradient header
- Responsive design for mobile devices
- Proper formatting for all form fields
- Automatic timestamps
- Reply-to functionality

You can modify the `createEmailTemplate()` function to match your branding and preferences.

## Support
If you encounter issues:
1. Check the backend console for error messages
2. Verify your SMTP credentials are correct
3. Test with a simple email first
4. Check your email provider's SMTP documentation

Your contact form is now powered by reliable SMTP email delivery! 🚀
