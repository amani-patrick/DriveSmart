import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Login API call:', { email, password });
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        level: 5,
        totalPoints: 2450,
        badges: [],
        streakDays: 12,
        lessonsCompleted: 25,
        quizzesCompleted: 18,
        joinedDate: '2024-01-15'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Signup API call:', { email, password, name });
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name,
        email,
        level: 1,
        totalPoints: 0,
        badges: [],
        streakDays: 0,
        lessonsCompleted: 0,
        quizzesCompleted: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // TODO: Replace with actual API call
      console.log('Logout API call');
      
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};