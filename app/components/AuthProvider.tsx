'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email?: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  signin: (token: string, user: User) => void;
  signout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('hamrah_user') : null;
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    try {
      return typeof window !== 'undefined' ? localStorage.getItem('hamrah_token') : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem('hamrah_user', JSON.stringify(user));
      else localStorage.removeItem('hamrah_user');
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      if (token) localStorage.setItem('hamrah_token', token);
      else localStorage.removeItem('hamrah_token');
    } catch {}
  }, [token]);

  const signin = (jwtToken: string, u: User) => {
    try {
      localStorage.setItem('hamrah_token', jwtToken);
    } catch {}
    setToken(jwtToken);
    setUser(u);
  };

  const signout = () => {
    try {
      localStorage.removeItem('hamrah_token');
      localStorage.removeItem('hamrah_user');
    } catch {}
    setToken(null);
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    token,
    signin,
    signout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
