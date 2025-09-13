import type { Model, Message, Settings } from '../App';

export class OllamaService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  async getModels(): Promise<Model[]> {
    const response = await fetch(`${this.baseUrl}/api/tags`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const models = data.models || [];
    
    // If no models are available, add a demo model for testing
    if (models.length === 0) {
      return [{
        name: 'demo-model',
        size: 1000000000, // 1GB
        digest: 'demo-digest',
        modified_at: new Date().toISOString()
      }];
    }
    
    return models;
  }

  async generateResponse(
    model: string,
    prompt: string,
    settings: Settings,
    conversationHistory: Message[]
  ): Promise<string> {
    // Demo model for testing when no real models are available
    if (model === 'demo-model') {
      return `Hello! I'm a demo AI assistant. You said: "${prompt}"

This is a simulated response since no real Ollama models are installed yet. To get real AI responses, you can install a model by running:

\`\`\`bash
ollama pull llama3.2
# or
ollama pull tinyllama
\`\`\`

The Open-Ollama-UI is working perfectly! 🎉

**Features demonstrated:**
- ✅ Clean, modern interface
- ✅ Dark/light mode toggle
- ✅ Settings panel (temperature, max tokens, system prompt)
- ✅ Markdown rendering
- ✅ Conversation management
- ✅ Responsive design

Once you install a real model, you'll get actual AI responses instead of this demo message.`;
    }

    // Build conversation context
    const messages = [
      { role: 'system', content: settings.systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        options: {
          temperature: settings.temperature,
          num_predict: settings.maxTokens,
        },
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.message?.content || 'No response received';
  }

  async pullModel(
    modelName: string, 
    onProgress?: (status: string) => void,
    onCancel?: () => void
  ): Promise<void> {
    const controller = new AbortController();
    
    // Set up cancel callback
    if (onCancel) {
      onCancel = () => controller.abort();
    }

    const response = await fetch(`${this.baseUrl}/api/pull`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: modelName,
        stream: true
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Failed to pull model: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            
            if (data.status && onProgress) {
              // Show simple, user-friendly status messages
              if (data.status.includes('pulling manifest')) {
                onProgress('Preparing to download model...');
              } else if (data.status.includes('pulling')) {
                onProgress('Downloading model files...');
              } else if (data.status.includes('verifying')) {
                onProgress('Verifying download...');
              } else if (data.status.includes('success')) {
                onProgress('Model downloaded successfully!');
              } else {
                onProgress('Downloading model...');
              }
            }
          } catch (e) {
            // Ignore parsing errors for non-JSON lines
          }
        }
      }
    }
  }

  async deleteModel(modelName: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: modelName
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete model: ${response.statusText}`);
    }
  }

  async generateStreamingResponse(
    model: string,
    prompt: string,
    settings: Settings,
    conversationHistory: Message[],
    onChunk: (chunk: string) => void
  ): Promise<void> {
    // Demo model for testing when no real models are available
    if (model === 'demo-model') {
      const demoResponse = `Hello! I'm a demo AI assistant. You said: "${prompt}"

This is a simulated response since no real Ollama models are installed yet. To get real AI responses, you can install a model by running:

\`\`\`bash
ollama pull llama3.2
# or
ollama pull tinyllama
\`\`\`

The Open-Ollama-UI is working perfectly! 🎉

**Features demonstrated:**
- ✅ Clean, modern interface
- ✅ Dark/light mode toggle
- ✅ Settings panel (temperature, max tokens, system prompt)
- ✅ Markdown rendering
- ✅ Conversation management
- ✅ Responsive design

Once you install a real model, you'll get actual AI responses instead of this demo message.`;

      // Simulate streaming by sending chunks
      const words = demoResponse.split(' ');
      for (let i = 0; i < words.length; i++) {
        const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
        onChunk(chunk);
        // Small delay to simulate streaming
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      return;
    }

    // Build conversation context
    const messages = [
      { role: 'system', content: settings.systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        options: {
          temperature: settings.temperature,
          num_predict: settings.maxTokens,
        },
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body reader available');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line);
              if (data.message?.content) {
                onChunk(data.message.content);
              }
            } catch (e) {
              // Skip invalid JSON lines
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.getModels();
      return true;
    } catch {
      return false;
    }
  }
}
