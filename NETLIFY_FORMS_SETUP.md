# Netlify Configuration for Contact Form

## Build Settings (netlify.toml)
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

# Form handling
[[plugins]]
  package = "@netlify/plugin-forms"

# Redirects for SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Form Notifications Setup

### 1. Deploy to Netlify
1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Deploy with these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 2. Enable Form Notifications
1. Go to your Netlify site dashboard
2. Go to **Forms** section
3. You'll see your "contact" form listed
4. Click **Settings & Usage**
5. Set up **Email notifications**:
   - Add your email: `hardikcp5@gmail.com`
   - Choose notification triggers
   - Customize email template

### 3. Form Submissions
- All form submissions will appear in Netlify dashboard
- You'll receive email notifications
- Can export submissions as CSV
- Can set up Slack/Discord webhooks

## Features:
✅ **No backend needed** - Pure frontend solution
✅ **Free tier includes** 100 form submissions/month
✅ **Email notifications** to your inbox
✅ **Spam protection** built-in
✅ **Form dashboard** to view all submissions
✅ **CSV export** of submissions
✅ **Webhook integration** for advanced workflows

## Form Data:
- Name, Email, Subject, Message
- Timestamp of submission
- User's IP address (for spam protection)
- Referrer information

This is the perfect solution for a frontend-only deployment on Netlify!
