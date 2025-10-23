import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const envCheck = {
      GOOGLE_APPLICATION_CREDENTIALS_JSON: !!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
      DIALOGFLOW_CX_PROJECT_ID: !!process.env.DIALOGFLOW_CX_PROJECT_ID,
      DIALOGFLOW_CX_LOCATION: !!process.env.DIALOGFLOW_CX_LOCATION,
      DIALOGFLOW_CX_AGENT_ID: !!process.env.DIALOGFLOW_CX_AGENT_ID,
      DIALOGFLOW_LANGUAGE_CODE: !!process.env.DIALOGFLOW_LANGUAGE_CODE,
    };

    // Get actual values (without exposing sensitive data)
    const envValues = {
      GOOGLE_APPLICATION_CREDENTIALS_JSON: process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON ? 'SET' : 'NOT SET',
      DIALOGFLOW_CX_PROJECT_ID: process.env.DIALOGFLOW_CX_PROJECT_ID || 'NOT SET',
      DIALOGFLOW_CX_LOCATION: process.env.DIALOGFLOW_CX_LOCATION || 'NOT SET',
      DIALOGFLOW_CX_AGENT_ID: process.env.DIALOGFLOW_CX_AGENT_ID || 'NOT SET',
      DIALOGFLOW_LANGUAGE_CODE: process.env.DIALOGFLOW_LANGUAGE_CODE || 'NOT SET',
    };

    // Check if all required variables are set
    const allSet = Object.values(envCheck).every(Boolean);

    return NextResponse.json({
      status: allSet ? 'SUCCESS' : 'ERROR',
      message: allSet ? 'All environment variables are configured' : 'Missing environment variables',
      environment: process.env.NODE_ENV,
      variables: envValues,
      checks: envCheck,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      message: 'Debug endpoint failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}