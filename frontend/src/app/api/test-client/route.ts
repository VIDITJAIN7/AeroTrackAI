import { NextResponse } from 'next/server';
import { SessionsClient } from '@google-cloud/dialogflow-cx';

export async function GET() {
  try {
    // Test environment variables
    const envVars = {
      GOOGLE_APPLICATION_CREDENTIALS_JSON: !!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
      GOOGLE_APPLICATION_CREDENTIALS: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
      DIALOGFLOW_CX_PROJECT_ID: process.env.DIALOGFLOW_CX_PROJECT_ID,
      DIALOGFLOW_CX_LOCATION: process.env.DIALOGFLOW_CX_LOCATION,
      DIALOGFLOW_CX_AGENT_ID: process.env.DIALOGFLOW_CX_AGENT_ID,
      DIALOGFLOW_LANGUAGE_CODE: process.env.DIALOGFLOW_LANGUAGE_CODE,
    };

    // Test client creation
    let clientCreationResult = 'Not attempted';
    let clientError = null;
    
    try {
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        console.log('Testing JSON credentials...');
        const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        const client = new SessionsClient({ credentials });
        clientCreationResult = 'Success with JSON credentials';
      } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        console.log('Testing file credentials...');
        const client = new SessionsClient({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });
        clientCreationResult = 'Success with file credentials';
      } else {
        console.log('Testing default credentials...');
        const client = new SessionsClient();
        clientCreationResult = 'Success with default credentials';
      }
    } catch (error) {
      clientError = error instanceof Error ? error.message : 'Unknown error';
      clientCreationResult = 'Failed';
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      environmentVariables: envVars,
      clientCreation: {
        result: clientCreationResult,
        error: clientError
      }
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
