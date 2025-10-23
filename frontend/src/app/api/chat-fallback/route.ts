import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Simple fallback responses for testing
    const responses = {
      'hello': 'Hello! I\'m AeroTrack AI. I can help you with flight maintenance planning.',
      'hi': 'Hi there! How can I assist you with your aircraft maintenance today?',
      'help': 'I can help you with:\n• Flight maintenance scheduling\n• Aircraft status updates\n• Maintenance type recommendations\n• Flight tracking assistance',
      'maintenance': 'I can help you schedule maintenance for your aircraft. What type of maintenance do you need?',
      'schedule': 'To schedule maintenance, I need to know:\n• Aircraft type\n• Flight number\n• Maintenance type (A-Check, B-Check, C-Check)',
      'default': 'I understand you\'re looking for flight maintenance assistance. Could you provide more details about what you need help with?'
    };

    // Simple keyword matching
    const lowerMessage = message.toLowerCase();
    let response = responses.default;

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = responses.hello;
    } else if (lowerMessage.includes('help')) {
      response = responses.help;
    } else if (lowerMessage.includes('maintenance')) {
      response = responses.maintenance;
    } else if (lowerMessage.includes('schedule')) {
      response = responses.schedule;
    }

    return NextResponse.json({
      response: response,
      intent: 'Fallback Response',
      confidence: 0.8,
    });

  } catch (error) {
    console.error('Fallback Chat Error:', error);
    
    return NextResponse.json({
      response: "I'm sorry, I encountered an error. Please try again.",
      intent: 'Error',
      confidence: 0,
    });
  }
}
