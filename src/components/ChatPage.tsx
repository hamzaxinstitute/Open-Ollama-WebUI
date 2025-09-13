import React from 'react';
import { ArrowLeft, Settings, Sun, Moon, RefreshCw, Wifi, Plus } from 'lucide-react';
import { ChatArea } from './ChatArea';
import { InputBox } from './InputBox';
import { Logo } from './Logo';
import type { Message, Model } from '../App';

interface ChatPageProps {
  messages: Message[];
  isLoading: boolean;
  error: string;
  selectedModel: string;
  models: Model[];
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
  setSelectedModel: (model: string) => void;
  onSendMessage: (message: string) => void;
  onNewChat: () => void;
  onClearChat: () => void;
  onRefreshModels: () => void;
  onAddModel: () => void;
  onOpenSettings: () => void;
  onBackToHome: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  chatAreaRef: React.RefObject<HTMLDivElement | null>;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  messages,
  isLoading,
  error,
  selectedModel,
  models,
  endpoint,
  setEndpoint,
  setSelectedModel,
  onSendMessage,
  onNewChat,
  onClearChat,
  onRefreshModels,
  onAddModel,
  onOpenSettings,
  onBackToHome,
  isDarkMode,
  toggleTheme,
  chatEndRef,
  chatAreaRef,
}) => {
  const formatModelSize = (size: number) => {
    const gb = size / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)}GB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-all duration-300">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20 dark:border-gray-700/20 px-4 py-3 shadow-lg backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side - Back Button & Title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToHome}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Back to Models"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="hover:scale-110 transition-transform duration-200">
                <Logo size="md" className="sm:w-10 sm:h-10" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                <span className="hidden sm:inline">Open Ollama WebUI</span>
                <span className="sm:hidden">Ollama WebUI</span>
              </h1>
            </div>
          </div>

          {/* Center Controls - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-6 max-w-3xl">
            {/* Endpoint Input */}
            <div className="flex items-center space-x-3 glass-effect rounded-xl px-4 py-3 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 shadow-lg">
              <Wifi className="w-5 h-5 text-blue-500" />
              <input
                type="url"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="http://localhost:11434"
                className="bg-transparent text-sm w-52 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Model Selector */}
            <div className="flex items-center space-x-3 glass-effect rounded-xl px-4 py-3 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 shadow-lg">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-transparent text-sm min-w-40 text-gray-700 dark:text-gray-300 focus:outline-none"
              >
                <option value="">Select Model</option>
                {models.map((model) => (
                  <option key={model.name} value={model.name}>
                    {model.name.split(':')[0]} ({formatModelSize(model.size)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onRefreshModels}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Refresh Models"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={onAddModel}
              className="p-2 text-purple-500 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
              title="Add Model"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={onOpenSettings}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-screen pt-16 relative z-10">
        <div className="flex-1 flex flex-col">
          <ChatArea
            messages={messages}
            isLoading={isLoading}
            error={error}
            chatEndRef={chatEndRef}
            chatAreaRef={chatAreaRef}
          />
          <InputBox
            onSendMessage={onSendMessage}
            isLoading={isLoading}
            disabled={!selectedModel}
          />
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 left-4 right-4 flex justify-between items-end z-40 lg:right-auto lg:flex-col lg:items-start lg:space-y-3">
        <div className="flex gap-3">
          <button
            onClick={onNewChat}
            className="btn-secondary glass-effect shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
            title="New Chat"
          >
            <span className="group-hover:scale-110 transition-transform duration-200">✨</span>
            <span className="hidden sm:inline ml-2">New Chat</span>
          </button>
          <button
            onClick={onClearChat}
            className="btn-secondary glass-effect shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
            title="Clear Chat"
          >
            <span className="group-hover:scale-110 transition-transform duration-200">🗑️</span>
            <span className="hidden sm:inline ml-2">Clear</span>
          </button>
        </div>
        
        {/* Mobile model status indicator */}
        <div className="lg:hidden">
          {selectedModel ? (
            <div className="bg-green-500/20 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-green-200 dark:border-green-800 shadow-lg">
              ✓ {selectedModel.split(':')[0]}
            </div>
          ) : (
            <div className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-yellow-200 dark:border-yellow-800 shadow-lg">
              ⚠️ No model
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
