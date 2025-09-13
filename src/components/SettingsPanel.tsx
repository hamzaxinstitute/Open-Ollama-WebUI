import React from 'react';
import { X, Thermometer, Hash, FileText } from 'lucide-react';
import type { Settings } from '../App';
import { Logo } from './Logo';

interface SettingsPanelProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  setSettings,
  endpoint,
  setEndpoint,
  onClose
}) => {
  const handleTemperatureChange = (value: number) => {
    setSettings({ ...settings, temperature: value });
  };

  const handleMaxTokensChange = (value: number) => {
    setSettings({ ...settings, maxTokens: value });
  };

  const handleSystemPromptChange = (value: string) => {
    setSettings({ ...settings, systemPrompt: value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Settings Panel */}
      <div className="w-80 sm:w-96 h-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-l border-gray-200/50 dark:border-gray-700/50 flex flex-col shadow-xl relative z-10">
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Logo size="sm" />
            <span>Settings</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Ollama Endpoint */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Ollama Endpoint
            </label>
          </div>
          <input
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="http://localhost:11434"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Enter the URL where your Ollama server is running
          </p>
        </div>

        {/* Temperature */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Thermometer className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Temperature
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {settings.temperature}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.temperature}
            onChange={(e) => handleTemperatureChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Focused (0)</span>
            <span>Balanced (1)</span>
            <span>Creative (2)</span>
          </div>
        </div>

        {/* Max Tokens */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Hash className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Max Tokens
            </label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {settings.maxTokens}
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="4096"
            step="100"
            value={settings.maxTokens}
            onChange={(e) => handleMaxTokensChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>100</span>
            <span>4096</span>
          </div>
        </div>

        {/* System Prompt */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <FileText className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              System Prompt
            </label>
          </div>
          <textarea
            value={settings.systemPrompt}
            onChange={(e) => handleSystemPromptChange(e.target.value)}
            placeholder="Enter the system prompt that defines the AI's behavior..."
            className="input-field w-full h-32 resize-none text-sm"
            rows={6}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            This prompt sets the AI's personality and behavior for all conversations.
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>• Higher temperature = more creative responses</p>
          <p>• Max tokens = response length limit</p>
          <p>• System prompt = AI's personality</p>
        </div>
        </div>
      </div>
    </div>
  );
};
