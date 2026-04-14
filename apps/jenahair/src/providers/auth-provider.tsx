import { createContext, useContext, useEffect, useState } from 'react';

interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  role?: string;
}

interface AuthContextType {
  getUser: () => IUser | null;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: IUser;
  onLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
  initialUser,
  onLogout,
}: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(initialUser);

  const logout = () => {
    setUser(null);
    try {
      onLogout();
      // Set a key in localStorage to notify other tabs about the logout event
      window.localStorage.setItem('ONLOGOUT_EVENT', Date.now().toString());
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Logout failed');
    }
  };

  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === 'ONLOGOUT_EVENT') {
        setUser(null);
      }
    };
    // Listen for storage events to handle logout across multiple tabs
    // Every time anything happen in localStorage, handleStorageEvent will be called
    window.addEventListener('storage', handleStorageEvent);
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  return (
    <AuthContext value={{ getUser: () => user, logout }}>{children}</AuthContext>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
