import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { loginService } from '../../service/user-service/login';
import { logoutService } from '../../service/user-service/logout.tsx';
import { registerService } from '../../service/user-service/register.tsx';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, account_name: string, full_name: string, password_confirmation: string) => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });
      localStorage.setItem('auth_token', response.token);
      setToken(response.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async ( account_name: string, full_name: string, email: string, password: string, password_confirmation: string) => {
    try {
      const response = await registerService({ account_name, full_name, email, password, password_confirmation });
      
      localStorage.setItem('auth_token', response.token);
      setToken(response.token);
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  }

  const logout = async () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const response = await logoutService({ token });
      console.log(response);
    }
    localStorage.removeItem('auth_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    token,
    isLoading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};