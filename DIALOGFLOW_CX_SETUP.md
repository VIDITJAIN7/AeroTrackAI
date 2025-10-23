# Dialogflow CX Integration Setup Guide

## ✅ Integration Complete!

Your Dialogflow CX agent is now successfully integrated with your flight tracker website!

## 🔧 What's Been Configured:

### 1. **Environment Variables** (`.env.local`):
```env
GOOGLE_APPLICATION_CREDENTIALS=./credentials/dialogflow-service-account.json
DIALOGFLOW_CX_PROJECT_ID=quiet-engine-474303-i5
DIALOGFLOW_CX_LOCATION=global
DIALOGFLOW_CX_AGENT_ID=dc40fde4-0fde-43fc-9a7f-eaa65c0ef6ea
DIALOGFLOW_LANGUAGE_CODE=en-US
```

### 2. **API Endpoint** (`/api/chat`):
- ✅ Uses Dialogflow CX client library
- ✅ Correct session path format for CX
- ✅ Proper request structure
- ✅ Error handling and fallbacks

### 3. **Frontend Integration**:
- ✅ Chat context updated for CX
- ✅ Floating chat component ready
- ✅ Dedicated chat page ready

## 🎯 **Your Agent Details:**
- **Agent ID**: `dc40fde4-0fde-43fc-9a7f-eaa65c0ef6ea`
- **Location**: `global`
- **Project ID**: `quiet-engine-474303-i5`
- **Agent Name**: `testcheck1`

## 🚀 **Next Steps - Configure Your Agent:**

### 1. **Go to Dialogflow CX Console**:
- Visit: https://dialogflow.cloud.google.com/cx/
- Select your project: `quiet-engine-474303-i5`
- Open your agent: `testcheck1`

### 2. **Configure Your Agent**:

#### **Start Page**:
- Set up a welcome message
- Add quick replies for common actions
- Configure the initial flow

#### **Create Flows**:
1. **Welcome Flow**:
   - Intent: `Default Welcome Intent`
   - Response: "Hello! I'm your flight management assistant. How can I help you today?"

2. **Flight Information Flow**:
   - Intent: `Flight Information`
   - Training phrases:
     - "What's the status of flight [flight_number]?"
     - "Is flight [flight_number] on time?"
     - "Flight status for [flight_number]"
   - Response: "I can help you check flight status. Let me look that up for you."

3. **Maintenance Flow**:
   - Intent: `Maintenance Schedule`
   - Training phrases:
     - "When is the next maintenance scheduled?"
     - "Show me maintenance schedule"
     - "What maintenance is due?"
   - Response: "I can show you the maintenance schedule. Let me pull that information."

4. **General Help Flow**:
   - Intent: `General Help`
   - Training phrases:
     - "What can you help me with?"
     - "Help"
     - "What are your capabilities?"
   - Response: "I can help you with flight information, maintenance schedules, booking assistance, and general flight management tasks."

### 3. **Test Your Agent**:
1. **Use the simulator** in Dialogflow CX console
2. **Test with your website** at `http://localhost:3005`
3. **Try different conversation flows**

## 🧪 **Testing the Integration:**

### **Test via Website**:
1. **Open your website**: `http://localhost:3005`
2. **Click the chat icon** (bottom right)
3. **Send test messages**:
   - "Hello"
   - "What can you help me with?"
   - "Flight status for FL123"

### **Test via API**:
```bash
curl -X POST http://localhost:3005/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, can you help me with flight information?"}'
```

## 🔍 **Troubleshooting:**

### **If responses are undefined**:
- Check that your agent has proper responses configured
- Ensure the agent is published/deployed
- Verify the agent is active in the console

### **If you get authentication errors**:
- Verify the service account JSON file is in the correct location
- Check that the service account has Dialogflow CX API permissions
- Ensure the Dialogflow CX API is enabled in Google Cloud Console

### **If you get "agent not found" errors**:
- Verify the agent ID is correct
- Check that the agent is in the correct location (global)
- Ensure the agent is active and deployed

## 🎉 **Success Indicators:**

✅ **Integration working**: No authentication errors
✅ **Agent responding**: Getting responses from your agent
✅ **Intent detection**: Proper intent recognition
✅ **Website integration**: Chat working on your website

## 📝 **Notes:**

- **Session Management**: Each conversation maintains its own session
- **Context Preservation**: The agent remembers conversation context
- **Error Handling**: Fallback responses if the agent is unavailable
- **Scalability**: Ready for production deployment

Your Dialogflow CX integration is now complete and ready to use! 🚀


