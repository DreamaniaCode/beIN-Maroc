import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { users as mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  favorites: string[];
  login: (email: string) => boolean;
  logout: () => void;
  toggleFavorite: (channelId: string) => void;
  isFavorite: (channelId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate checking for a user in localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        const storedFavorites = localStorage.getItem(`favorites-${parsedUser.id}`);
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false); // Finished loading
    }
  }, []);

  const login = (email: string): boolean => {
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      // Load their favorites
      const storedFavorites = localStorage.getItem(`favorites-${foundUser.id}`);
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setFavorites([]);
  };

  const toggleFavorite = (channelId: string) => {
    if (!user) return;
    const newFavorites = favorites.includes(channelId)
      ? favorites.filter(id => id !== channelId)
      : [...favorites, channelId];
    
    setFavorites(newFavorites);
    localStorage.setItem(`favorites-${user.id}`, JSON.stringify(newFavorites));
  };
  
  const isFavorite = (channelId: string) => favorites.includes(channelId);

  return (
    <AuthContext.Provider value={{ user, loading, favorites, login, logout, toggleFavorite, isFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
