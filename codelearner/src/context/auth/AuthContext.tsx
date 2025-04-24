import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../../types/auth.types.ts';
import { loginService } from '../../service/user-service/login';
import { logoutService } from '../../service/user-service/logout.tsx';
import { registerService } from '../../service/user-service/register.tsx';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, account_name: string, full_name: string, password_confirmation: string) => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });
      // Store token in localStorage for persistence
      localStorage.setItem('auth_token', response.token);
      // Store user data
      setUser(response.user);
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
      
      // Store token in localStorage for persistence
      localStorage.setItem('auth_token', response.token);
      // Store user data
      setUser(response.user);
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
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    token,
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