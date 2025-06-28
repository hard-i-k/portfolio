# 🚀 Deployment Guide - Separate Frontend & Backend

This guide covers deploying your portfolio with separate frontend and backend services for maximum flexibility and scalability.

## 📋 Architecture Overview

- **Frontend**: React + Vite → Deploy to Netlify/Vercel
- **Backend**: Node.js + Express + SMTP → Deploy to Railway/Render/Heroku
- **Database**: MongoDB Atlas (if needed in future)
- **Email**: SMTP through backend

---

## 🎯 Backend Deployment

### Option 1: Railway (Recommended - Free Tier)

#### Step 1: Prepare Backend
1. Create `package.json` start script (already done)
2. Set up environment variables
3. Test locally first

#### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Choose the backend folder or use these settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Step 3: Set Environment Variables
In Railway dashboard, go to Variables and add:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=hardikcp59@gmail.com
SMTP_PASS=your_gmail_app_password
FROM_EMAIL=hardikcp59@gmail.com
FROM_NAME=Hardik Kannoija Portfolio
TO_EMAIL=hardikcp59@gmail.com
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-app.netlify.app
```

#### Step 4: Get Backend URL
- Railway will provide a URL like: `https://your-app-name.up.railway.app`
- Save this URL for frontend configuration

### Option 2: Render (Alternative)

1. Go to [render.com](https://render.com)
2. Connect GitHub repo
3. Create "Web Service"
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables (same as Railway)

### Option 3: Heroku (Paid)

1. Install Heroku CLI
2. Create new app: `heroku create your-portfolio-api`
3. Set buildpacks: `heroku buildpacks:set heroku/nodejs`
4. Add environment variables: `heroku config:set SMTP_HOST=smtp.gmail.com`
5. Deploy: `git push heroku main`

---

## 🌐 Frontend Deployment

### Option 1: Netlify (Recommended)

#### Step 1: Update Environment
1. Open `frontend/.env.production`
2. Update with your backend URL:
```env
VITE_API_URL=https://your-backend-app.railway.app
```

#### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

#### Step 3: Environment Variables
In Netlify dashboard → Site settings → Environment variables:
```
VITE_API_URL=https://your-backend-app.railway.app
```

#### Step 4: Update netlify.toml
Update the CSP header with your actual backend URL.

### Option 2: Vercel (Alternative)

1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Framework preset: Vite
4. Root directory: `frontend`
5. Add environment variable: `VITE_API_URL`

---

## 🔧 Production Configuration

### Backend Security Updates

Add to `backend/server.js`:
```javascript
// Production CORS settings
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-app.netlify.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}))

// Rate limiting
const rateLimit = require('express-rate-limit')
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many contact form submissions, please try again later.'
})

app.use('/api/contact', contactLimiter)
```

### Frontend Production Build

Test production build locally:
```bash
cd frontend
npm run build
npm run preview
```

---

## 📧 Email Configuration

### Gmail Setup (Required)
1. Enable 2-Factor Authentication on your Google Account
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Portfolio Website"
4. Use this 16-character password in `SMTP_PASS`

### Email Testing
Test your deployed backend:
```bash
curl -X POST https://your-backend-app.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'
```

---

## 🚀 Deployment Checklist

### Backend Deployment ✅
- [ ] Environment variables configured
- [ ] Gmail App Password set up
- [ ] CORS configured for frontend domain
- [ ] Rate limiting enabled
- [ ] Health endpoint accessible
- [ ] Contact endpoint tested

### Frontend Deployment ✅
- [ ] Backend URL updated in environment
- [ ] Production build tested locally
- [ ] Netlify/Vercel deployment successful
- [ ] Contact form connects to backend
- [ ] All sections working properly
- [ ] Mobile responsiveness verified

### Final Testing ✅
- [ ] Submit contact form on live site
- [ ] Verify email received in inbox
- [ ] Check all navigation links
- [ ] Test dark/light mode toggle
- [ ] Verify mobile navigation
- [ ] Test download resume button

---

## 🔍 Monitoring & Maintenance

### Backend Monitoring
- Railway/Render provide logs and metrics
- Set up email alerts for downtime
- Monitor email delivery rates

### Frontend Monitoring
- Netlify provides analytics
- Set up Core Web Vitals monitoring
- Monitor form submission rates

### Regular Updates
- Keep dependencies updated
- Monitor for security vulnerabilities
- Backup email configurations

---

## 💡 Benefits of Separate Deployment

✅ **Scalability**: Backend can handle multiple frontend apps
✅ **Performance**: Frontend served from CDN
✅ **Security**: Backend credentials isolated
✅ **Maintenance**: Update frontend/backend independently
✅ **Cost**: Optimize costs for each service
✅ **Reliability**: If one service fails, the other continues

Your portfolio will be production-ready with professional email delivery and excellent performance! 🎉
