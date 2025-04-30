'use client';

import { useState, useRef, useEffect } from 'react';
import { ExpenseButton } from '@/components/ui/ExpenseButton';
import Card from '@/components/ui/Card';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

const MaxChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi, I\'m Max! I can help you with your expenses. What would you like to know?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Make API call to your backend chatbot
      const response = await fetch('http://localhost:8000/api/chat/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ question: userMessage.content })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Add assistant response
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.data.answer
        }]);
      } else {
        // Add error message
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again later.'
        }]);
      }
    } catch (error) {
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I couldn\'t connect to my brain. Please check your internet connection and try again.'
      }]);
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <div className="relative z-10">
      {/* Chat button */}
      <ExpenseButton
        onClick={toggleChat}
        variant="primary"
        className="flex items-center"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mr-2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        Ask Max
      </ExpenseButton>
      
      {/* Chat interface */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96">
          <Card className="bg-white shadow-lg">
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="text-lg font-semibold">Max - Expense Assistant</h3>
              <button 
                onClick={toggleChat} 
                className="text-gray-400 hover:text-gray-600"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="h-80 overflow-y-auto p-3 bg-gray-50">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-3 ${
                    message.role === 'user' 
                      ? 'text-right' 
                      : 'text-left'
                  }`}
                >
                  <div 
                    className={`inline-block px-3 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-left mb-3">
                  <div className="inline-block px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className="border-t p-3">
              <div className="flex">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Ask me anything about your expenses..."
                  value={inputValue}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-black px-4 py-2 rounded-r-lg disabled:bg-blue-300"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
              
              {/* Quick suggestions */}
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setInputValue("How much did I spend this month?")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
                >
                  Monthly spending
                </button>
                <button
                  type="button"
                  onClick={() => setInputValue("What's my top expense category?")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
                >
                  Top category
                </button>
                <button
                  type="button"
                  onClick={() => setInputValue("How can I save money?")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
                >
                  Saving tips
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MaxChatbot;




