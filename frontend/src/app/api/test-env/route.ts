import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check environment variables without exposing sensitive data
    const envCheck = {
      hasCredentialsJson: !!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
      hasCredentialsFile: !!process.env.GOOGLE_APPLICATION_CREDENTIALS,
      hasProjectId: !!process.env.DIALOGFLOW_CX_PROJECT_ID,
      hasLocation: !!process.env.DIALOGFLOW_CX_LOCATION,
      hasAgentId: !!process.env.DIALOGFLOW_CX_AGENT_ID,
      hasLanguageCode: !!process.env.DIALOGFLOW_LANGUAGE_CODE,
      nodeEnv: process.env.NODE_ENV,
      projectId: process.env.DIALOGFLOW_CX_PROJECT_ID || 'Not set',
      location: process.env.DIALOGFLOW_CX_LOCATION || 'Not set',
      languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE || 'Not set',
    };

    return NextResponse.json({
      success: true,
      environment: envCheck,
      message: 'Environment variables check complete'
    });

  } catch (error) {
    console.error('Environment check error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to check environment variables',
      message: 'Please check your Vercel environment variable configuration'
    }, { status: 500 });
  }
}
