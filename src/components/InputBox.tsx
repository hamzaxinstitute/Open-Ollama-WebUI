import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface InputBoxProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export const InputBox: React.FC<InputBoxProps> = ({
  onSendMessage,
  isLoading,
  disabled
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="border-t border-white/20 dark:border-gray-700/20 glass-effect px-2 sm:px-4 py-4 sm:py-6">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2 sm:space-x-4">
          <div className="flex-1 relative">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  disabled
                    ? 'Select a model to start chatting...'
                    : 'Type your message here... (Press Enter to send, Shift+Enter for new line)'
                }
                disabled={disabled || isLoading}
                className="input-field resize-none min-h-[48px] sm:min-h-[52px] max-h-32 pr-12 sm:pr-16 shadow-lg focus:shadow-xl transition-all duration-200 text-sm sm:text-base"
                rows={1}
              />
              <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs text-gray-400 bg-white/80 dark:bg-gray-800/80 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                {message.length > 0 && `${message.length}`}
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!message.trim() || isLoading || disabled}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 sm:space-x-2 min-w-[80px] sm:min-w-[120px] justify-center h-[48px] sm:h-[52px] shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Sending</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </>
            )}
          </button>
        </form>
        
        {disabled && (
          <div className="mt-3 sm:mt-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm backdrop-blur-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <p>
                <span className="hidden sm:inline">Please select a model from the dropdown above to start chatting</span>
                <span className="sm:hidden">Select a model to start</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
