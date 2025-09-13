import React, { useState } from 'react';
import { Settings, Sun, Moon, RefreshCw, Wifi, Package } from 'lucide-react';
import type { Model } from '../App';
import { Logo } from './Logo';
import { GitHubButton } from './GitHubButton';

interface HeaderProps {
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  models: Model[];
  isDarkMode: boolean;
  toggleTheme: () => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  onRefreshModels: () => void;
  showModelManagement: boolean;
  setShowModelManagement: (show: boolean) => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  endpoint,
  setEndpoint,
  selectedModel,
  setSelectedModel,
  models,
  isDarkMode,
  toggleTheme,
  showSettings,
  setShowSettings,
  onRefreshModels,
  showModelManagement,
  setShowModelManagement,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefreshModels();
    setIsRefreshing(false);
  };

  const formatModelSize = (size: number) => {
    const gb = size / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)}GB`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20 dark:border-gray-700/20 px-4 py-3 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* App Title */}
        <div className="flex items-center space-x-2 sm:space-x-4">
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
            <Wifi className="w-5 h-5 text-blue-500" title="Ollama Server Endpoint" />
            <input
              type="url"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="http://localhost:11434"
              className="bg-transparent text-sm w-52 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              title="Change Ollama server endpoint"
            />
          </div>

          {/* Model Selector */}
          <div className="flex items-center space-x-3 glass-effect rounded-xl px-4 py-3 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200 shadow-lg">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-transparent text-sm min-w-40 text-gray-700 dark:text-gray-300 focus:outline-none"
              disabled={models.length === 0}
            >
              <option value="">
                {models.length === 0 ? 'No models available' : 'Select a model'}
              </option>
              {models.map((model) => (
                <option key={model.name} value={model.name}>
                  {model.name} ({formatModelSize(model.size)})
                </option>
              ))}
            </select>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Refresh models"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        
        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center space-x-2">
          <div className="flex items-center space-x-2 glass-effect rounded-lg px-3 py-2">
            <Wifi className="w-4 h-4 text-blue-500" />
            <input
              type="url"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="localhost:11434"
              className="bg-transparent text-xs w-28 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
            />
          </div>
          
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="glass-effect text-xs px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none min-w-32"
            disabled={models.length === 0}
          >
            <option value="">
              {models.length === 0 ? 'No models' : 'Select model'}
            </option>
            {models.map((model) => (
              <option key={model.name} value={model.name}>
                {model.name} ({formatModelSize(model.size)})
              </option>
            ))}
          </select>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2">
          {/* GitHub Button */}
          <GitHubButton />
          
          {/* Model Management Button */}
          <button
            onClick={() => setShowModelManagement(!showModelManagement)}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              showModelManagement
                ? 'bg-purple-500 text-white shadow-lg'
                : 'text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title="Manage Models"
          >
            <Package className="w-5 h-5" />
          </button>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              showSettings
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
