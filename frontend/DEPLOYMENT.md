# AeroTrack AI Frontend - Deployment Guide

## 🚀 Vercel Deployment

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/VIDITJAIN7/AeroTrackAI/tree/main/frontend)

### Manual Deployment Steps

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as the root directory

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Environment Variables**
   Add the following environment variables in Vercel dashboard:

   ```
   GOOGLE_APPLICATION_CREDENTIALS=./credentials/dialogflow-service-account.json
   DIALOGFLOW_CX_PROJECT_ID=your-project-id
   DIALOGFLOW_CX_LOCATION=global
   DIALOGFLOW_CX_AGENT_ID=your-agent-id
   DIALOGFLOW_LANGUAGE_CODE=en-US
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-app.vercel.app`

## 🔧 Local Development

### Prerequisites
- Node.js 18+ 
- npm 8+

### Setup
```bash
# Clone repository
git clone https://github.com/VIDITJAIN7/AeroTrackAI.git
cd AeroTrackAI/frontend

# Install dependencies
npm install

# Set up environment variables
cp env.template .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

## 📋 Build Verification

Before deploying, ensure:

- [ ] All TypeScript types are correct (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Build completes successfully (`npm run build`)
- [ ] Environment variables are configured
- [ ] Google Cloud credentials are accessible

## 🔐 Security Checklist

- [ ] Environment variables are set in Vercel dashboard
- [ ] No sensitive data in code
- [ ] API routes are properly secured
- [ ] HTTPS is enabled (automatic on Vercel)

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Ensure all dependencies are installed
   - Verify TypeScript types

2. **Environment Variables**
   - Double-check variable names
   - Ensure credentials are properly formatted
   - Test locally first

3. **API Routes**
   - Verify Google Cloud credentials
   - Check Dialogflow configuration
   - Test endpoints individually

### Support

For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Google Cloud Dialogflow Setup](https://cloud.google.com/dialogflow/docs)

## 📊 Performance Optimization

- Enable Vercel Analytics
- Use Next.js Image optimization
- Implement proper caching strategies
- Monitor Core Web Vitals

---

**Ready to deploy!** 🚀
