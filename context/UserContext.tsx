import { account } from "@/services/appwrite";
import { createContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";

interface UserContextType {
  user: Models.User<Models.Preferences> | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  authChecked: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [authChecked, setAuthChecked] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession({ email, password });
      const user = await account.get();
      setUser(user);
    } catch (error) {
      throw Error((error as Error).message);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await account.create({ userId: ID.unique(), email, password });
      await login(email, password);
    } catch (error) {
      throw Error((error as Error).message);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession({ sessionId: "current" });
      setUser(null);
    } catch (error) {
      throw Error((error as Error).message);
    }
  };

  const getInitialUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    getInitialUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, signup, authChecked }}>
      {children}
    </UserContext.Provider>
  );
}
