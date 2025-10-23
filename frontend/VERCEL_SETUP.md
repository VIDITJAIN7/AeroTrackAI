# Vercel Deployment Setup Guide for AeroTrack AI

## 🚀 Quick Setup for Vercel Deployment

### Step 1: Environment Variables Setup

In your Vercel dashboard, go to your project settings and add these environment variables:

#### Required Environment Variables:

```
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type":"service_account","project_id":"your-project-id","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}

DIALOGFLOW_CX_PROJECT_ID=your-project-id
DIALOGFLOW_CX_LOCATION=global
DIALOGFLOW_CX_AGENT_ID=your-agent-id
DIALOGFLOW_LANGUAGE_CODE=en-US

NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NODE_ENV=production
```

### Step 2: Getting Your Google Cloud Credentials

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project**
3. **Go to IAM & Admin > Service Accounts**
4. **Find your service account** (or create one if needed)
5. **Click on the service account**
6. **Go to Keys tab**
7. **Click "Add Key" > "Create new key"**
8. **Select JSON format**
9. **Download the JSON file**

### Step 3: Setting Up Environment Variables in Vercel

1. **Copy the entire JSON content** from your downloaded service account file
2. **In Vercel dashboard**:
   - Go to your project
   - Click on "Settings"
   - Click on "Environment Variables"
   - Add each variable:

#### GOOGLE_APPLICATION_CREDENTIALS_JSON
- **Name**: `GOOGLE_APPLICATION_CREDENTIALS_JSON`
- **Value**: Paste the entire JSON content (as one line)
- **Environment**: Production, Preview, Development

#### DIALOGFLOW_CX_PROJECT_ID
- **Name**: `DIALOGFLOW_CX_PROJECT_ID`
- **Value**: Your Google Cloud project ID
- **Environment**: Production, Preview, Development

#### DIALOGFLOW_CX_LOCATION
- **Name**: `DIALOGFLOW_CX_LOCATION`
- **Value**: `global`
- **Environment**: Production, Preview, Development

#### DIALOGFLOW_CX_AGENT_ID
- **Name**: `DIALOGFLOW_CX_AGENT_ID`
- **Value**: Your Dialogflow CX agent ID
- **Environment**: Production, Preview, Development

#### DIALOGFLOW_LANGUAGE_CODE
- **Name**: `DIALOGFLOW_LANGUAGE_CODE`
- **Value**: `en-US`
- **Environment**: Production, Preview, Development

### Step 4: Deploy

1. **Push your changes** to GitHub
2. **Vercel will automatically deploy**
3. **Check the deployment logs** for any errors

### Step 5: Testing

1. **Visit your deployed app**
2. **Go to the chat page**
3. **Test the chatbot functionality**

## 🔧 Troubleshooting

### Common Issues:

1. **"AI service is not configured"**
   - Check if `GOOGLE_APPLICATION_CREDENTIALS_JSON` is set
   - Verify the JSON format is correct

2. **"Permission denied"**
   - Check if your service account has Dialogflow permissions
   - Verify the project ID is correct

3. **"Network error"**
   - Check if your Vercel deployment has internet access
   - Verify all environment variables are set

### Environment Variable Format:

The `GOOGLE_APPLICATION_CREDENTIALS_JSON` should be a single line JSON string. Example:

```
{"type":"service_account","project_id":"my-project","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n","client_email":"my-service@my-project.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/my-service%40my-project.iam.gserviceaccount.com"}
```

## ✅ Success Checklist

- [ ] Environment variables added to Vercel
- [ ] Google Cloud service account created
- [ ] Dialogflow CX agent configured
- [ ] Deployment successful
- [ ] Chatbot working in production

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally first
4. Check Google Cloud Console for API quotas
