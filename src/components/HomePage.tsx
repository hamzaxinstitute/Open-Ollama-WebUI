import React from 'react';
import { MessageCircle, Download, Settings as SettingsIcon, Plus, RefreshCw, Trash2, Bot, Zap, Brain, Sparkles } from 'lucide-react';
import type { Model } from '../App';
import { Logo } from './Logo';
import { GitHubButton } from './GitHubButton';

interface HomePageProps {
  models: Model[];
  onSelectModel: (modelName: string) => void;
  onRefreshModels: () => void;
  onAddModel: () => void;
  onDeleteModel: (modelName: string) => void;
  onOpenSettings: () => void;
  isRefreshing: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  models,
  onSelectModel,
  onRefreshModels,
  onAddModel,
  onDeleteModel,
  onOpenSettings,
  isRefreshing,
}) => {
  const formatModelSize = (size: number) => {
    const gb = size / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)}GB`;
  };

  const getModelIcon = (modelName: string) => {
    const name = modelName.toLowerCase();
    if (name.includes('llama')) return <Bot className="w-8 h-8" />;
    if (name.includes('code')) return <Zap className="w-8 h-8" />;
    if (name.includes('mistral')) return <Sparkles className="w-8 h-8" />;
    if (name.includes('gemma')) return <Brain className="w-8 h-8" />;
    return <Bot className="w-8 h-8" />;
  };

  const getModelDescription = (modelName: string) => {
    const name = modelName.toLowerCase();
    if (name.includes('llama')) return 'Meta\'s powerful language model for general conversations';
    if (name.includes('code')) return 'Specialized model for coding assistance and programming tasks';
    if (name.includes('mistral')) return 'Efficient and capable model for various language tasks';
    if (name.includes('gemma')) return 'Google\'s lightweight and efficient language model';
    return 'A powerful AI model ready for conversation';
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-all duration-300">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 glass-effect border-b border-white/20 dark:border-gray-700/20 px-4 py-4 shadow-lg backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="hover:scale-110 transition-transform duration-200">
              <Logo size="lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Open Ollama WebUI
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Choose a model to start chatting</p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onRefreshModels}
              disabled={isRefreshing}
              className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh Models"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onAddModel}
              className="btn-primary flex items-center space-x-2 px-6 py-3"
              title="Add New Model"
            >
              <Plus className="w-5 h-5" />
              <span>Add Model</span>
            </button>
            <button
              onClick={onOpenSettings}
              className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              title="Settings"
            >
              <SettingsIcon className="w-5 h-5" />
            </button>
            <GitHubButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {models.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                  <Bot className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  No Models Downloaded Yet
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Get started by downloading your first AI model. Choose from popular models like Llama, CodeLlama, Mistral, and more.
                </p>
                <button
                  onClick={onAddModel}
                  className="btn-primary flex items-center space-x-3 px-8 py-4 text-lg mx-auto"
                >
                  <Download className="w-6 h-6" />
                  <span>Download Your First Model</span>
                </button>
              </div>
            </div>
          ) : (
            /* Models Grid */
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Your AI Models
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Select a model to start a conversation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {models.map((model) => (
                  <div
                    key={model.name}
                    className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 dark:border-gray-700/20 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600"
                  >
                    {/* Model Icon and Name */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
                          {getModelIcon(model.name)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                            {model.name.split(':')[0]}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatModelSize(model.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Are you sure you want to delete "${model.name}"?`)) {
                            onDeleteModel(model.name);
                          }
                        }}
                        className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        title={`Delete ${model.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Model Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">
                      {getModelDescription(model.name)}
                    </p>

                    {/* Chat Button */}
                    <button
                      onClick={() => onSelectModel(model.name)}
                      className="w-full btn-primary flex items-center justify-center space-x-2 py-3 group-hover:scale-105 transition-transform duration-200"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Start Chatting</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Add More Models Button */}
              <div className="text-center mt-12">
                <button
                  onClick={onAddModel}
                  className="btn-secondary flex items-center space-x-3 px-8 py-4 text-lg mx-auto"
                >
                  <Plus className="w-6 h-6" />
                  <span>Add More Models</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

    </div>
  );
};
