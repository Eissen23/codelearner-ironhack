import axios from "axios";

// Create axios instance
const ollamaAxios = axios.create({
  baseURL: import.meta.env.VITE_OLLAMA,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_OLLAMA_KEY}`,
  },
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
  generate: async (
    options: OllamaGenerateOptions
  ): Promise<OllamaGenerateResponse> => {
    try {
      const { data } = await ollamaAxios.post("/api/generate", {
        model: options.model || "llama3.2:latest",
        prompt: options.prompt,
        system: options.system,
        template: options.template,
        context: options.context,
        options: options.options,
        "stream": false
      });

      return {
        ...data,
        created_at: new Date(data.created_at).toDateString(),
      };
    } catch (error) {
      console.error("Ollama generate error:", error);
      throw error;
    }
  },

  // List available models
  listModels: async () => {
    try {
      const { data } = await ollamaAxios.get("/api/tags");
      return data;
    } catch (error) {
      console.error("Ollama list models error:", error);
      throw error;
    }
  },

  // Pull a model
  pullModel: async (model: string) => {
    try {
      const { data } = await ollamaAxios.post("/api/pull", { model });
      return data;
    } catch (error) {
      console.error("Ollama pull model error:", error);
      throw error;
    }
  },

  // Create embeddings
  createEmbeddings: async (model: string, prompt: string) => {
    try {
      const { data } = await ollamaAxios.post("/api/embeddings", {
        model,
        prompt,
      });
      return data;
    } catch (error) {
      console.error("Ollama embeddings error:", error);
      throw error;
    }
  },
};

export default ollamaService;
