import { useState, useEffect, useRef } from 'react';
import { HomePage } from './components/HomePage';
import { ChatPage } from './components/ChatPage';
import { SettingsPanel } from './components/SettingsPanel';
import { ModelManagement } from './components/ModelManagement';
import { ChatPopup } from './components/ChatPopup';
import { OllamaService } from './services/ollamaService';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Settings {
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

export interface Model {
  name: string;
  size: number;
  digest: string;
  modified_at: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [endpoint, setEndpoint] = useState(() => 
    localStorage.getItem('ollamaEndpoint') || 'http://localhost:11434'
  );
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [models, setModels] = useState<Model[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showModelManagement, setShowModelManagement] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'chat'>('home');
  const [selectedModelForChat, setSelectedModelForChat] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('ollamaSettings');
    return saved ? JSON.parse(saved) : {
      temperature: 0.7,
      maxTokens: 2048,
      systemPrompt: 'You are a helpful AI assistant.'
    };
  });
  const [error, setError] = useState<string>('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('ollamaSettings', JSON.stringify(settings));
  }, [settings]);

  // Save endpoint to localStorage
  useEffect(() => {
    localStorage.setItem('ollamaEndpoint', endpoint);
  }, [endpoint]);

  // Load models when endpoint changes
  useEffect(() => {
    loadModels();
  }, [endpoint]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadModels = async () => {
    try {
      setError('');
      const ollamaService = new OllamaService(endpoint);
      const modelList = await ollamaService.getModels();
      setModels(modelList);
      if (modelList.length > 0 && !selectedModel) {
        setSelectedModel(modelList[0].name);
      }
    } catch (err) {
      setError(`Failed to connect to Ollama at ${endpoint}. Please check if Ollama is running.`);
      console.error('Error loading models:', err);
    }
  };

  const handleDeleteModel = async (modelName: string) => {
    if (!confirm(`Are you sure you want to delete "${modelName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const ollamaService = new OllamaService(endpoint);
      await ollamaService.deleteModel(modelName);
      loadModels(); // Refresh the models list
    } catch (err) {
      console.error('Failed to delete model:', err);
      setError(`Failed to delete model: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };


  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleStartChat = (modelName: string) => {
    setSelectedModelForChat(modelName);
  };

  const handleCloseChat = () => {
    setSelectedModelForChat(null);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !selectedModel || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError('');

    try {
      const ollamaService = new OllamaService(endpoint);
      const response = await ollamaService.generateResponse(
        selectedModel,
        content,
        settings,
        messages
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError('Failed to send message. Please check your connection and try again.');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setError('');
  };

  const handleClearChat = () => {
    setMessages([]);
    setError('');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      {currentPage === 'home' ? (
        <HomePage
          models={models}
          onSelectModel={handleStartChat}
          onRefreshModels={loadModels}
          onAddModel={() => setShowModelManagement(true)}
          onDeleteModel={handleDeleteModel}
          onOpenSettings={() => setShowSettings(true)}
          isRefreshing={false}
        />
      ) : (
        <ChatPage
          messages={messages}
          isLoading={isLoading}
          error={error}
          selectedModel={selectedModel}
          models={models}
          endpoint={endpoint}
          setEndpoint={setEndpoint}
          setSelectedModel={setSelectedModel}
          onSendMessage={handleSendMessage}
          onNewChat={handleNewChat}
          onClearChat={handleClearChat}
          onRefreshModels={loadModels}
          onAddModel={() => setShowModelManagement(true)}
          onOpenSettings={() => setShowSettings(true)}
          onBackToHome={handleBackToHome}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          chatEndRef={chatEndRef}
          chatAreaRef={useRef<HTMLDivElement>(null)}
        />
      )}
      
      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          setSettings={setSettings}
          endpoint={endpoint}
          setEndpoint={setEndpoint}
          onClose={() => setShowSettings(false)}
        />
      )}
      
      {/* Model Management Modal */}
      <ModelManagement
        isOpen={showModelManagement}
        onClose={() => setShowModelManagement(false)}
        models={models}
        onModelsChange={loadModels}
        endpoint={endpoint}
      />

      {/* Chat Popup */}
      {selectedModelForChat && (
        <ChatPopup
          isOpen={!!selectedModelForChat}
          onClose={handleCloseChat}
          modelName={selectedModelForChat}
          endpoint={endpoint}
          settings={settings}
        />
      )}
      
    </>
  );
}

export default App;