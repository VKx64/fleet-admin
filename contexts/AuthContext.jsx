'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

// Create context
const AuthContext = createContext(null);

// PocketBase client initialization with error handling
const initPocketBase = () => {
  try {
    const pb = new PocketBase("http://192.168.1.7:8090");
    return pb;
  } catch (error) {
    console.error('Failed to initialize PocketBase:', error);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [pb, setPb] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Initialize PocketBase on client-side only
  useEffect(() => {
    // Make sure we're in the browser
    if (typeof window !== 'undefined') {
      const pocketbase = initPocketBase();
      setPb(pocketbase);
      setInitialized(true);
    }
  }, []);

  // Setup auth state after PocketBase is initialized
  useEffect(() => {
    if (!initialized || !pb) return;

    // Get initial user state
    setUser(pb.authStore.model);
    setLoading(false);

    // Listen for auth changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model);
    });

    return () => {
      unsubscribe?.();
    };
  }, [pb, initialized]);

  const login = async (email, password) => {
    if (!pb) throw new Error('PocketBase not initialized');

    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      return authData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    if (!pb) return;
    pb.authStore.clear();
  };

  const getCurrentUser = () => {
    return pb?.authStore?.model || null;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, getCurrentUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);