import { useState, useRef } from 'react';
import { X, Download, Trash2, Loader2, AlertCircle, XCircle } from 'lucide-react';
import type { Model } from '../App';
import { OllamaService } from '../services/ollamaService';
import { Logo } from './Logo';

interface ModelManagementProps {
  isOpen: boolean;
  onClose: () => void;
  models: Model[];
  onModelsChange: () => void;
  endpoint: string;
}

export const ModelManagement = ({ isOpen, onClose, models, onModelsChange, endpoint }: ModelManagementProps) => {
  const [isAddingModel, setIsAddingModel] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [addProgress, setAddProgress] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleAddModel = async () => {
    if (!newModelName.trim()) return;

    setIsAddingModel(true);
    setError('');
    setAddProgress('Please wait, model will take time to download. It depends on model size and your internet speed...');
    abortControllerRef.current = new AbortController();

    try {
      const ollamaService = new OllamaService(endpoint);
      await ollamaService.pullModel(
        newModelName, 
        (status) => {
          setAddProgress(status);
        },
        () => {
          abortControllerRef.current?.abort();
        }
      );
      
      setNewModelName('');
      setAddProgress('');
      onModelsChange();
    } catch (err) {
      console.error('Failed to add model:', err);
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Model download was cancelled');
      } else {
        setError(`Failed to add model: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    } finally {
      setIsAddingModel(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancelDownload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsAddingModel(false);
      setAddProgress('');
      abortControllerRef.current = null;
    }
  };

  const handleDeleteModel = async (modelName: string) => {
    if (!confirm(`Are you sure you want to delete "${modelName}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(modelName);
    setError('');

    try {
      const ollamaService = new OllamaService(endpoint);
      await ollamaService.deleteModel(modelName);
      onModelsChange();
    } catch (err) {
      console.error('Failed to delete model:', err);
      setError(`Failed to delete model: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsDeleting(null);
    }
  };

  const formatModelSize = (size: number) => {
    const gb = size / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)}GB`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Logo size="md" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Model Management</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Add Model Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Model</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newModelName}
                onChange={(e) => setNewModelName(e.target.value)}
                placeholder="Enter model name (e.g., llama2, codellama, mistral)"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAddingModel}
              />
              <button
                onClick={isAddingModel ? handleCancelDownload : handleAddModel}
                disabled={!newModelName.trim() && !isAddingModel}
                className={`${
                  isAddingModel 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'btn-primary'
                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 px-6`}
              >
                {isAddingModel ? (
                  <>
                    <XCircle className="w-4 h-4" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Add Model</span>
                  </>
                )}
              </button>
            </div>
            
            {addProgress && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                    <div>
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        {addProgress}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        You can cancel anytime if needed
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCancelDownload}
                    className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Cancel download"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Models List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Installed Models</h3>
            
            {models.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Download className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No models installed</p>
                <p className="text-sm">Add a model above to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {models.map((model) => (
                  <div
                    key={model.name}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {model.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Size: {formatModelSize(model.size)} • Modified: {new Date(model.modified_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteModel(model.name)}
                      disabled={isDeleting === model.name}
                      className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete model"
                    >
                      {isDeleting === model.name ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
