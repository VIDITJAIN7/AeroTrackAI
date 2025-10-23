"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react";
import { useChat } from "@/contexts/chat-context";
import { FlightTable } from "./flight-table";
import { cleanResponseText, extractTableData } from "@/lib/chat-utils";

export function FloatingChat() {
  const { messages, addMessage, sendMessageToDialogflow, isOpen, setIsOpen } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Resizing functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !chatRef.current) return;

      const rect = chatRef.current.getBoundingClientRect();
      const newWidth = Math.max(300, Math.min(800, e.clientX - rect.left));
      const newHeight = Math.max(200, Math.min(800, e.clientY - rect.top));

      console.log('Resizing:', { resizeDirection, newWidth, newHeight });

      if (resizeDirection === 'right') {
        setDimensions(prev => ({ ...prev, width: newWidth }));
      } else if (resizeDirection === 'bottom') {
        setDimensions(prev => ({ ...prev, height: newHeight }));
      } else if (resizeDirection === 'bottom-right') {
        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection("");
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeDirection]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    
    addMessage({
      sender: "user",
      content: userMessage
    });
    setInputValue("");
    setIsLoading(true);

    try {
      // Send message to Dialogflow
      const aiResponse = await sendMessageToDialogflow(userMessage);
      
      addMessage({
        sender: "ai",
        content: aiResponse
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      addMessage({
        sender: "ai",
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      ref={chatRef}
      className={`fixed bottom-6 right-6 bg-white border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col ${
        isMinimized ? "h-12" : ""
      } ${isResizing ? "select-none" : ""}`}
      style={{
        width: isMinimized ? 300 : dimensions.width,
        height: isMinimized ? 48 : dimensions.height,
        userSelect: isResizing ? 'none' : 'auto',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-gray-900">Vertex AI Assistant</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: dimensions.height - 120 }}>
            {messages.map((message) => {
              const { hasTable, flights } = extractTableData(message.content);
              const cleanedContent = cleanResponseText(message.content);
              
              return (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-xs ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 ${message.sender === "user" ? "ml-2" : "mr-2"}`}>
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        {message.sender === "user" ? (
                          <User className="h-3 w-3 text-gray-600" />
                        ) : (
                          <Bot className="h-3 w-3 text-gray-600" />
                        )}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="flex flex-col">
                      <div
                        className={`px-3 py-2 rounded-lg text-sm ${
                          message.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        {/* Render flight table if data is present */}
                        {hasTable && message.sender === "ai" && (
                          <div className="mb-2">
                            <FlightTable flights={flights} title="Aircraft with Upcoming Maintenance" />
                          </div>
                        )}
                        
                        {/* Render cleaned text content */}
                        <p className="whitespace-pre-wrap">{cleanedContent}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-xs">
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3 text-gray-600" />
                    </div>
                  </div>
                  <div className="bg-gray-200 text-gray-900 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Resize Handles */}
      {!isMinimized && (
        <>
          {/* Bottom-right resize handle */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-400 hover:bg-gray-500 transition-colors"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Bottom-right resize started');
              setIsResizing(true);
              setResizeDirection("bottom-right");
            }}
            style={{
              clipPath: "polygon(100% 0%, 0% 100%)",
            }}
          />
          
          {/* Right resize handle */}
          <div
            className="absolute top-0 right-0 w-2 h-full cursor-e-resize hover:bg-gray-400 transition-colors opacity-0 hover:opacity-100"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsResizing(true);
              setResizeDirection("right");
            }}
          />
          
          {/* Bottom resize handle */}
          <div
            className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize hover:bg-gray-400 transition-colors opacity-0 hover:opacity-100"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsResizing(true);
              setResizeDirection("bottom");
            }}
          />
        </>
      )}
    </div>
  );
}
