# Dialogflow Agent Setup Guide

## Issue Found
The error "No DesignTimeAgent found for project" means you need to create a Dialogflow agent in your Google Cloud project.

## Step-by-Step Solution

### 1. Go to Dialogflow Console
- Visit: https://dialogflow.cloud.google.com/
- Make sure you're logged in with the same Google account that has access to your project

### 2. Create a New Agent
1. **Click "Create Agent"**
2. **Fill in the details**:
   - Agent name: `testcheck1` (as you mentioned)
   - Default language: `English (en)`
   - Default timezone: Choose your timezone
   - Google Project: Select `quiet-engine-474303-i5`

### 3. Configure the Agent
1. **Go to "Intents"** in the left sidebar
2. **Create a welcome intent** (if not already present):
   - Intent name: `Default Welcome Intent`
   - Training phrases: Add phrases like:
     - "Hello"
     - "Hi"
     - "Good morning"
     - "Help me"
   - Responses: Add responses like:
     - "Hello! I'm your flight management assistant. How can I help you today?"
     - "Hi there! I can help you with flight information, maintenance schedules, and more. What would you like to know?"

### 4. Create Flight-Related Intents
Create these additional intents:

#### Intent: Flight Status
- **Training phrases**:
  - "What's the status of flight [flight_number]?"
  - "Is flight [flight_number] on time?"
  - "Flight status for [flight_number]"
- **Responses**:
  - "I can help you check the status of flight [flight_number]. Let me look that up for you."
  - "Checking flight status for [flight_number]..."

#### Intent: Maintenance Schedule
- **Training phrases**:
  - "When is the next maintenance scheduled?"
  - "Show me maintenance schedule"
  - "What maintenance is due?"
- **Responses**:
  - "I can show you the maintenance schedule. Let me pull that information for you."
  - "Here's the current maintenance schedule..."

#### Intent: General Help
- **Training phrases**:
  - "What can you help me with?"
  - "What are your capabilities?"
  - "Help"
- **Responses**:
  - "I can help you with flight information, maintenance schedules, booking assistance, and general flight management tasks. What would you like to know?"
  - "I'm your flight management assistant. I can help with flight status, maintenance schedules, and more!"

### 5. Test the Agent
1. **Go to the "Test" tab** in Dialogflow console
2. **Type test messages** like:
   - "Hello"
   - "What can you help me with?"
   - "Flight status for FL123"
3. **Verify responses** are working correctly

### 6. Deploy the Agent
1. **Go to "Settings"** (gear icon)
2. **Click "Deploy"** or ensure the agent is active
3. **Note the agent ID** (should be the same as your project ID)

## After Creating the Agent

Once you've created the agent in Dialogflow console, run this test again:

```bash
node test-dialogflow.js
```

The integration should work correctly after the agent is created and configured.

## Troubleshooting

### If you still get errors:
1. **Check agent is active** in Dialogflow console
2. **Verify project ID** matches exactly
3. **Ensure service account** has Dialogflow API Client role
4. **Check that Dialogflow API** is enabled in Google Cloud Console

### Common Issues:
- **Agent not found**: Create the agent in Dialogflow console
- **Permission denied**: Check service account permissions
- **API not enabled**: Enable Dialogflow API in Google Cloud Console

