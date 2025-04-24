import { useAuth } from "../context/auth/AuthContext";

export function requireAuth() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
      throw new Response("Unauthorized", { status: 401 });
    }
    return true;
  }