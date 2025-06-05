import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const pendingRequests = new Map<string, Promise<any>>();

export const CODELEARNER_API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
});

CODELEARNER_API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const url = config.url || "";
    const method = (config.method || "get").toLowerCase();
    const authHeader = config.headers?.Authorization || "";
    const cacheKey = `${method}:${url}:${authHeader}`;

    // If the same request is pending, cancel the duplicate
    if (pendingRequests.has(cacheKey)) {
      return Promise.reject(new axios.Cancel("Duplicate request canceled"));
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to clean up pending requests
CODELEARNER_API.interceptors.response.use(
  (response: AxiosResponse) => {
    const cacheKey = `${response.config.method?.toLowerCase()}:${
      response.config.url
    }:${response.config.headers?.Authorization || ""}`;
    pendingRequests.delete(cacheKey); // Remove from pending on success
    return response;
  },
  (error) => {
    const cacheKey = `${error.config?.method?.toLowerCase()}:${
      error.config?.url
    }:${error.config?.headers?.Authorization || ""}`;
    pendingRequests.delete(cacheKey); // Remove from pending on error
    return Promise.reject(error);
  }
);
