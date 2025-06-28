# EmailJS Setup Guide

## Overview
EmailJS allows you to send emails directly from your frontend without a backend server. Messages submitted through your contact form will be sent directly to your email inbox.

## Step-by-Step Setup

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions:
   - For Gmail: Click "Connect Account" and authorize EmailJS
   - Copy the **Service ID** (looks like: `service_abc123`)

### 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply-To: {{reply_to}}
```

4. Save the template and copy the **Template ID** (looks like: `template_xyz789`)

### 4. Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (looks like: `abcDEF123_ghi456JKL`)

### 5. Update Environment Variables
1. Open `frontend/.env` file
2. Replace the placeholder values:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcDEF123_ghi456JKL
```

### 6. Template Variables
Make sure your EmailJS template includes these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{reply_to}}` - Reply-to email address

### 7. Test the Form
1. Restart your development server: `npm run dev`
2. Fill out and submit your contact form
3. Check your email inbox for the message

## Troubleshooting

### Common Issues:
1. **"Service ID not found"** - Double-check your Service ID in the .env file
2. **"Template not found"** - Verify your Template ID is correct
3. **"Unauthorized"** - Check your Public Key
4. **Emails not arriving** - Check spam folder, verify email service setup

### Free Plan Limits:
- 200 emails per month
- EmailJS branding in emails
- All features included

### Security Notes:
- Public Key is safe to expose in frontend code
- Service ID and Template ID are also safe to expose
- No sensitive credentials are stored in frontend

## Support
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/
