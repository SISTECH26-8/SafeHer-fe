'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import api from '@/lib/api';

interface User {
  user_id?: string;
  full_name?: string;
  fullName?: string;
  name?: string; // fallback
  username?: string;
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, userData?: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cek token saat aplikasi dimuat
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = Cookies.get('token');
      if (storedToken) {
        setToken(storedToken);
        try {
          // Verify token or get user info
          const response = await api.get('/api/v1/auth/me');
          // Adjust based on the actual response structure of /auth/me
          setUser(response.data.user || response.data);
        } catch (error) {
          console.error("Failed to authenticate user", error);
          Cookies.remove('token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (newToken: string, userData?: any) => {
    Cookies.set('token', newToken, { expires: 7 }); // Simpan token selama 7 hari
    setToken(newToken);
    if (userData) {
      setUser(userData);
    } else {
      // Refresh user data if missing
      api.get('/api/v1/auth/me').then((res) => {
        setUser(res.data.user || res.data);
      }).catch(console.error);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    setUser(null);
    window.location.href = '/'; // Arahkan ke beranda setelah logout
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
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
