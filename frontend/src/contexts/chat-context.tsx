"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  sendMessageToDialogflow: (message: string) => Promise<string>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      content: "Hello! I'm here to help you with your flight maintenance planning. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const addMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessageToDialogflow = async (message: string) => {
    try {
      // First try the main Dialogflow API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      
      // If the main API fails or returns an error, try the fallback
      if (data.response && data.response.includes('trouble connecting') || data.response.includes('not configured')) {
        console.log('Main API failed, trying fallback...');
        return await tryFallbackAPI(message);
      }
      
      // Check if the AI response contains flight information to add to maintenance
      if (data.response && typeof data.response === 'string') {
        const flightInfo = parseFlightInfoFromResponse(data.response);
        if (flightInfo) {
          // Add flight to maintenance schedule
          addFlightToMaintenance(flightInfo);
          return `${data.response}\n\n✅ I've added ${flightInfo.flightNumber} to your maintenance schedule!`;
        }
      }
      
      return data.response;
    } catch (error) {
      console.error('Error sending message to Dialogflow:', error);
      // Try fallback API if main API fails
      return await tryFallbackAPI(message);
    }
  };

  const tryFallbackAPI = async (message: string) => {
    try {
      const response = await fetch('/api/chat-fallback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      return data.response || "I'm here to help with flight maintenance planning. How can I assist you?";
    } catch (error) {
      console.error('Error with fallback API:', error);
      return "I'm here to help with flight maintenance planning. How can I assist you?";
    }
  };

  const parseFlightInfoFromResponse = (response: string) => {
    // Look for flight patterns in the AI response
    const flightPattern = /(?:flight|Flight)\s*([A-Z]{2}\d{3,4})/i;
    const aircraftPattern = /(?:Boeing|Airbus|Embraer|Bombardier)\s+\w+/i;
    const datePattern = /(\d{4}-\d{2}-\d{2})/;
    
    const flightMatch = response.match(flightPattern);
    const aircraftMatch = response.match(aircraftPattern);
    const dateMatch = response.match(datePattern);
    
    if (flightMatch) {
      return {
        flightNumber: flightMatch[1],
        aircraftType: aircraftMatch ? aircraftMatch[0] : 'Unknown Aircraft',
        scheduledDate: dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0],
        status: 'Scheduled' as const,
        priority: 'Medium' as const,
        description: 'Added via AI assistant'
      };
    }
    
    return null;
  };

  const addFlightToMaintenance = (flightInfo: any) => {
    // This will be handled by the maintenance context
    // We'll dispatch a custom event that the maintenance context can listen to
    const event = new CustomEvent('addFlightToMaintenance', { detail: flightInfo });
    window.dispatchEvent(event);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, sendMessageToDialogflow, isOpen, setIsOpen }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
