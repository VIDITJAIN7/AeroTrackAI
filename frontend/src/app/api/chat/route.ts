import { NextRequest, NextResponse } from 'next/server';
import { SessionsClient } from '@google-cloud/dialogflow-cx';

// Function to initialize Dialogflow client
function createDialogflowClient(): SessionsClient | null {
  try {
    // For Vercel deployment - credentials as JSON string
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      console.log('Using JSON credentials for Vercel deployment');
      console.log('JSON length:', process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON.length);
      console.log('JSON starts with:', process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON.substring(0, 50));
      
      const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
      console.log('Parsed credentials project_id:', credentials.project_id);
      console.log('Parsed credentials client_email:', credentials.client_email);
      
      return new SessionsClient({
        credentials: credentials,
      });
    }
    // For local development - credentials file path
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.log('Using file credentials for local development');
      return new SessionsClient({
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      });
    }
    // Try default credentials (for Google Cloud environments)
    else {
      console.log('Using default credentials');
      return new SessionsClient();
    }
  } catch (error) {
    console.error('Error creating Dialogflow client:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

// Get environment variables - these should be set in Vercel
const projectId = process.env.DIALOGFLOW_CX_PROJECT_ID;
const location = process.env.DIALOGFLOW_CX_LOCATION;
const agentId = process.env.DIALOGFLOW_CX_AGENT_ID;
const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE;

// Validate that all required environment variables are set
if (!projectId || !location || !agentId || !languageCode) {
  console.error('Missing required environment variables:');
  console.error('  DIALOGFLOW_CX_PROJECT_ID:', !!projectId);
  console.error('  DIALOGFLOW_CX_LOCATION:', !!location);
  console.error('  DIALOGFLOW_CX_AGENT_ID:', !!agentId);
  console.error('  DIALOGFLOW_LANGUAGE_CODE:', !!languageCode);
}
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check if all required environment variables are set
    if (!projectId || !location || !agentId || !languageCode) {
      console.error('Missing required Dialogflow environment variables');
      return NextResponse.json({
        response: "AI service configuration is incomplete. Please contact the administrator.",
        intent: 'Configuration Error',
        confidence: 0,
      });
    }

    // Generate a unique session ID for each conversation
    const sessionId = `flighttracker-session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log('Generated session ID:', sessionId);

    // Create Dialogflow client
    const dialogflowClient = createDialogflowClient();
    
    if (!dialogflowClient) {
      console.error('Failed to create Dialogflow client');
      return NextResponse.json({
        response: "AI service is not configured. Please contact the administrator.",
        intent: 'Configuration Error',
        confidence: 0,
      });
    }

    // Debug: Log the configuration being used
    console.log('Dialogflow Configuration:');
    console.log('  Project ID:', projectId);
    console.log('  Location:', location);
    console.log('  Agent ID:', agentId);
    console.log('  Language Code:', languageCode);
    console.log('  Environment Variables Check:');
    console.log('    DIALOGFLOW_CX_PROJECT_ID from env:', process.env.DIALOGFLOW_CX_PROJECT_ID);
    console.log('    DIALOGFLOW_CX_LOCATION from env:', process.env.DIALOGFLOW_CX_LOCATION);
    console.log('    DIALOGFLOW_CX_AGENT_ID from env:', process.env.DIALOGFLOW_CX_AGENT_ID);
    console.log('    DIALOGFLOW_LANGUAGE_CODE from env:', process.env.DIALOGFLOW_LANGUAGE_CODE);

    // Create session path for Dialogflow CX
    const sessionPath = dialogflowClient.projectLocationAgentSessionPath(
      projectId,
      location,
      agentId,
      sessionId
    );

    // Prepare the request for Dialogflow CX
    const dialogflowRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
        },
        languageCode: languageCode,
      },
    };

    // Send request to Dialogflow
    const [response] = await dialogflowClient.detectIntent(dialogflowRequest);

    // Extract the response - CORRECT Dialogflow CX format
    const result = response.queryResult;
    const intent = result.intent;
    
    // Log full response for debugging
    console.log('Full Dialogflow Response:', JSON.stringify(result, null, 2));
    
    // CORRECT way to extract text from Dialogflow CX responses:
    const messages = result.responseMessages || [];
    const textMessage = messages.find(msg => msg.text);
    const botReply = textMessage?.text?.text?.[0] || 'I apologize, I did not understand that.';

    // Return the response
    return NextResponse.json({
      response: botReply,
      intent: intent?.displayName || 'Default Welcome Intent',
      confidence: result.intentDetectionConfidence || 0,
    });

  } catch (error) {
    console.error('Dialogflow API Error:', error);
    
    // More specific error handling
    let errorMessage = "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again later.";
    
    if (error instanceof Error) {
      if (error.message.includes('credentials')) {
        errorMessage = "AI service credentials are not properly configured.";
      } else if (error.message.includes('permission')) {
        errorMessage = "AI service permission denied. Please contact support.";
      } else if (error.message.includes('network') || error.message.includes('timeout')) {
        errorMessage = "Network connection issue. Please check your internet connection and try again.";
      }
    }
    
    return NextResponse.json({
      response: errorMessage,
      intent: 'Error',
      confidence: 0,
    });
  }
}
