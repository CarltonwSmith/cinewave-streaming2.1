import type { LoginCredentials, SignupCredentials, User } from "../types";

const USERS_STORAGE_KEY = "cinewave_users";
const TOKEN_STORAGE_KEY = "cinewave_token";

// Simple in-memory storage (in a real app, this would be a database)
const getUsers = (): Array<User & { password: string }> => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveUsers = (users: Array<User & { password: string }>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const signup = async (
  credentials: SignupCredentials,
): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();

      // Check if user already exists
      if (users.find((u) => u.email === credentials.email)) {
        reject(new Error("User already exists"));
        return;
      }

      // Create new user
      const newUser: User & { password: string } = {
        id: Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        name: credentials.name,
        password: credentials.password, // In a real app, this would be hashed
      };

      users.push(newUser);
      saveUsers(users);

      // Generate a mock token
      const token = `mock-token-for-${newUser.id}`;
      localStorage.setItem(TOKEN_STORAGE_KEY, token);

      const { password, ...userWithoutPassword } = newUser;
      resolve({ user: userWithoutPassword, token });
    }, 500);
  });
};

export const login = async (
  credentials: LoginCredentials,
): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password,
      );

      if (!user) {
        reject(new Error("Invalid email or password"));
        return;
      }

      // Generate a mock token
      const token = `mock-token-for-${user.id}`;
      localStorage.setItem(TOKEN_STORAGE_KEY, token);

      const { password, ...userWithoutPassword } = user;
      resolve({ user: userWithoutPassword, token });
    }, 500);
  });
};

export const verifyToken = (token: string): User | null => {
  try {
    if (!token.startsWith("mock-token-for-")) {
        return null;
    }
    const userId = token.replace("mock-token-for-", "");
    const users = getUsers();
    const user = users.find((u) => u.id === userId);

    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem("cinewave_user");
};
