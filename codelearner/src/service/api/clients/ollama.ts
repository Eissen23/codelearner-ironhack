import { Ollama } from 'ollama';

// Create Ollama client instance
const ollama = new Ollama({
  host: import.meta.env.VITE_OLLAMA_API_URL || 'http://localhost:11434',
});

// Type definitions for Ollama responses
export interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export interface OllamaGenerateOptions {
  model?: string;
  prompt: string;
  system?: string;
  template?: string;
  context?: number[];
  options?: {
    temperature?: number;
    top_p?: number;
    top_k?: number;
    num_predict?: number;
    stop?: string[];
    seed?: number;
  };
}

// Helper functions for common Ollama operations
export const ollamaService = {
  // Generate text completion
  generate: async (options: OllamaGenerateOptions): Promise<OllamaGenerateResponse> => {
    try {
      const response = await ollama.generate({
        model: options.model || 'llama2',
        prompt: options.prompt,
        system: options.system,
        template: options.template,
        context: options.context,
        options: options.options,
      });
      // Convert the response to match OllamaGenerateResponse type
      return {
        ...response,
        created_at: response.created_at.toISOString(),
      };
    } catch (error) {
      console.error('Ollama generate error:', error);
      throw error;
    }
  },

  // List available models
  listModels: async () => {
    try {
      const models = await ollama.list();
      return models;
    } catch (error) {
      console.error('Ollama list models error:', error);
      throw error;
    }
  },

  // Pull a model
  pullModel: async (model: string) => {
    try {
      const response = await ollama.pull({ model });
      return response;
    } catch (error) {
      console.error('Ollama pull model error:', error);
      throw error;
    }
  },

  // Create embeddings
  createEmbeddings: async (model: string, prompt: string) => {
    try {
      const response = await ollama.embeddings({
        model,
        prompt,
      });
      return response;
    } catch (error) {
      console.error('Ollama embeddings error:', error);
      throw error;
    }
  },
};

export default ollamaService;