import React, { useState, useEffect } from 'react';
import { Github, Star } from 'lucide-react';

interface GitHubStats {
  stargazers_count: number;
  forks_count: number;
}

export const GitHubButton: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const repoUrl = 'https://github.com/hamzaxinstitute/Open-Ollama-WebUI';

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/hamzaxinstitute/Open-Ollama-WebUI');
        if (response.ok) {
          const data = await response.json();
          setStats({
            stargazers_count: data.stargazers_count,
            forks_count: data.forks_count,
          });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch GitHub stats:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  const handleGitHubClick = () => {
    window.open(repoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleGitHubClick}
      className="group flex items-center space-x-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
      title="View on GitHub - Star us if you like it!"
    >
      <Github className="w-5 h-5" />
      <div className="flex items-center space-x-1">
        <Star className="w-4 h-4" />
        {isLoading ? (
          <span className="text-sm animate-pulse">...</span>
        ) : error ? (
          <span className="text-sm">Star</span>
        ) : (
          <span className="text-sm font-medium">{stats?.stargazers_count || 0}</span>
        )}
      </div>
      <span className="text-sm font-medium hidden sm:inline">GitHub</span>
    </button>
  );
};
