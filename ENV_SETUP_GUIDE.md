# 🔐 Environment Variables Setup Guide

## Security Update: SMTP Password Protection

The SMTP password has been removed from the code and moved to environment variables for security.

## 🚨 REQUIRED SETUP

### **Step 1: Generate Gmail App Password**

1. **Enable 2-Factor Authentication** on your Gmail account if not already enabled
2. **Go to Google Account Settings**:
   - Visit: https://myaccount.google.com/
   - Navigate to **Security** → **2-Step Verification**
   - Scroll down to **App passwords**

3. **Generate App Password**:
   - Click **App passwords**
   - Select **Mail** and **Other (custom name)**
   - Enter name: "Portfolio Contact Form"
   - **Copy the 16-character password** (format: `xxxx xxxx xxxx xxxx`)

### **Step 2: Set Environment Variables in Netlify**

1. **Go to Netlify Dashboard**:
   - Visit: https://app.netlify.com/
   - Select your portfolio site

2. **Navigate to Environment Variables**:
   - Go to **Site settings** → **Environment variables**

3. **Add Required Variables**:
   ```
   Key: GMAIL_USER
   Value: hardikcp5@gmail.com
   
   Key: GMAIL_APP_PASSWORD
   Value: [your-16-character-app-password]
   ```

4. **Save and Redeploy**:
   - Click **Save**
   - Trigger a new deployment (push to GitHub or manual deploy)

## 🧪 **Testing After Setup**

### **Test 1: Environment Variables**
Visit: `https://hardik-kannojia.netlify.app/.netlify/functions/test-email`

**Expected Success Response**:
```json
{
  "success": true,
  "message": "Test email sent successfully!",
  "messageId": "some-message-id"
}
```

**Expected Error if Not Set**:
```json
{
  "success": false,
  "message": "Email service not configured - missing environment variables",
  "error": "GMAIL_APP_PASSWORD not set"
}
```

### **Test 2: Contact Form**
- Submit the contact form on your portfolio
- Check for success message
- Verify email delivery to hardikcp5@gmail.com

## 📁 **Files Updated**

1. **contact.js**: Removed hardcoded password, added env var checks
2. **test-email.js**: Updated to use environment variables only
3. **netlify.toml**: Added comment about secure env var setup

## 🔐 **Security Benefits**

✅ **No exposed credentials** in code repository
✅ **Environment-specific configurations** (dev/staging/prod)
✅ **Easy password rotation** without code changes
✅ **Audit trail** through Netlify dashboard
✅ **Secure deployment** practices

## ⚠️ **Important Notes**

- **Never commit passwords** to Git repositories
- **Use Netlify dashboard** to set sensitive environment variables
- **Regenerate app passwords** if compromised
- **Keep backup** of working app passwords in secure location

## 🚀 **Deployment Status**

✅ **Code updated** - Environment variables implemented
⚠️ **Manual setup required** - Add GMAIL_APP_PASSWORD to Netlify
🔄 **Ready for testing** - After environment variable setup

---

**Next Step**: Set up the environment variables in Netlify dashboard, then test the functions! 🎯
