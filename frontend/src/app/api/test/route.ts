import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if environment variables are loaded
    const hasJsonCreds = !!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    const hasFileCreds = !!process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const projectId = process.env.DIALOGFLOW_CX_PROJECT_ID;
    const location = process.env.DIALOGFLOW_CX_LOCATION;
    const agentId = process.env.DIALOGFLOW_CX_AGENT_ID;
    const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE;

    // Try to parse the JSON credentials to check format
    let jsonCredsValid = false;
    let jsonError = null;
    
    if (hasJsonCreds) {
      try {
        const parsed = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
        jsonCredsValid = !!parsed.type && !!parsed.project_id && !!parsed.private_key;
      } catch (error) {
        jsonError = error instanceof Error ? error.message : 'Unknown error';
      }
    }

    return NextResponse.json({
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      credentials: {
        hasJsonCreds,
        hasFileCreds,
        jsonCredsValid,
        jsonError
      },
      dialogflow: {
        projectId: projectId || 'NOT SET',
        location: location || 'NOT SET',
        agentId: agentId || 'NOT SET',
        languageCode: languageCode || 'NOT SET'
      },
      status: hasJsonCreds && jsonCredsValid && projectId && location && agentId ? 'READY' : 'NOT_READY'
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Test endpoint failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
