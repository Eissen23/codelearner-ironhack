import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { loginService } from "../../service/user-service/login.ts";
import { logoutService } from "../../service/user-service/logout.ts";
import { registerService } from "../../service/user-service/register.ts";
import { verifyToken } from "../../service/user-service/verifyToken.ts";
import { RegisterResponse } from "../../types/auth.types.ts";
import { AxiosError } from "axios";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    account_name: string,
    full_name: string,
    password_confirmation: string
  ) => Promise<RegisterResponse>;
  error: string;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth_token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("auth_token")
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");

    if (!storedToken) {
      return;
    }

    verifyTokenUser(storedToken);
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await loginService({ email, password });
      localStorage.setItem("auth_token", response.token);
      setToken(response.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    account_name: string,
    full_name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    try {
      const response = await registerService({
        account_name,
        full_name,
        email,
        password,
        password_confirmation,
      });

      localStorage.setItem("auth_token", response.token);
      setToken(response.token);
      setIsAuthenticated(true);
      return response;
    } catch (err: unknown) {
      // console.error("Register failed:", err);
      if (err instanceof AxiosError && err.response?.data?.message) {
        setError(err.response?.data?.message);
      }
      throw err;
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      const response = await logoutService({ token });
      console.log(response);
    }
    localStorage.removeItem("auth_token");
    setToken(null);
    setIsAuthenticated(false);
  };

  const verifyTokenUser = async (token: string) => {
    try {
      const response = await verifyToken(token);

      if (response.status !== 200) {
        localStorage.removeItem("auth_token");
        setToken(null);
        setIsAuthenticated(false);
      }

      setToken(token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setError("Token verification failed");
      return false;
    }
  };

  const value = {
    isAuthenticated,
    token,
    isLoading,
    login,
    logout,
    register,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
