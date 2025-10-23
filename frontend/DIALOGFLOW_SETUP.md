# Dialogflow Integration Setup Guide

## Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or select your project** where your Dialogflow agent is located
3. **Enable the Dialogflow API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Dialogflow API"
   - Click "Enable"

## Step 2: Create Service Account

1. **Go to IAM & Admin** > **Service Accounts**
2. **Click "Create Service Account"**
3. **Fill in the details**:
   - Name: `dialogflow-service-account`
   - Description: `Service account for Dialogflow integration`
4. **Click "Create and Continue"**
5. **Grant roles**:
   - Select "Dialogflow API Client" role
   - Click "Continue"
6. **Click "Done"**

## Step 3: Generate Service Account Key

1. **Find your service account** in the list
2. **Click on the service account name**
3. **Go to "Keys" tab**
4. **Click "Add Key" > "Create new key"**
5. **Select "JSON" format**
6. **Download the JSON file**

## Step 4: Configure Your Application

1. **Place the downloaded JSON file** in the `credentials` folder:
   ```
   /Users/raghubirprasad/Documents/flighttracker/credentials/dialogflow-service-account.json
   ```

2. **Create environment variables** (create `.env.local` file in project root):
   ```env
   GOOGLE_APPLICATION_CREDENTIALS=./credentials/dialogflow-service-account.json
   DIALOGFLOW_PROJECT_ID=your-actual-project-id
   DIALOGFLOW_LANGUAGE_CODE=en-US
   DIALOGFLOW_SESSION_ID=flighttracker-session
   ```

3. **Replace `your-actual-project-id`** with your actual Google Cloud project ID

## Step 5: Dialogflow Agent Configuration

1. **Go to Dialogflow Console**: https://dialogflow.cloud.google.com/
2. **Select your agent**
3. **Go to "Settings" (gear icon)**
4. **Note down your Project ID** (this should match your Google Cloud project)
5. **Configure your intents** for flight-related conversations:
   - Welcome intent
   - Flight status queries
   - Maintenance schedule questions
   - General help requests

## Step 6: Test the Integration

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Open the application** and test the chatbot
3. **Check the browser console** for any errors
4. **Verify the API endpoint** by visiting: `http://localhost:3000/api/chat`

## Troubleshooting

### Common Issues:

1. **"Authentication failed"**:
   - Check that the service account JSON file is in the correct location
   - Verify the file path in `GOOGLE_APPLICATION_CREDENTIALS`
   - Ensure the service account has the correct permissions

2. **"Project not found"**:
   - Verify your `DIALOGFLOW_PROJECT_ID` matches your Google Cloud project ID
   - Check that the Dialogflow API is enabled

3. **"Session not found"**:
   - This is normal for new sessions
   - The session will be created automatically

### Testing the API Directly:

You can test the API endpoint directly using curl:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, can you help me with flight information?"}'
```

## Security Notes

- **Never commit** the service account JSON file to version control
- **Add `credentials/` to your `.gitignore`** file
- **Use environment variables** for sensitive configuration
- **Consider using Google Cloud Secret Manager** for production deployments

## Production Deployment

For production, consider:
1. **Using Google Cloud Secret Manager** instead of JSON files
2. **Setting up proper IAM roles** with minimal permissions
3. **Using environment-specific configurations**
4. **Implementing rate limiting** for the API endpoint
