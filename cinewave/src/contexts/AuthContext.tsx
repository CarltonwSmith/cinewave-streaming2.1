import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as authService from "../lib/auth";
import type { LoginCredentials, SignupCredentials, User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem("cinewave_token");
    if (token) {
      const verifiedUser = authService.verifyToken(token);
      if (verifiedUser) {
        setUser(verifiedUser);
      } else {
        localStorage.removeItem("cinewave_token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const { user, token } = await authService.login(credentials);
    localStorage.setItem("cinewave_token", token);
    setUser(user);
  };

  const signup = async (credentials: SignupCredentials) => {
    const { user, token } = await authService.signup(credentials);
    localStorage.setItem("cinewave_token", token);
    setUser(user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
