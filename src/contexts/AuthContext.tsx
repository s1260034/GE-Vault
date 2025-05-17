import React, { createContext, useState, useContext, useEffect } from 'react';

// Define User type
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// Define Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('videoSaasUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulating API call - in a real app, this would be a backend request
      // This is a simplified version for demonstration
      if (email && password) {
        // Mock successful login
        const mockUser: User = {
          id: '1',
          email: email,
          name: email.split('@')[0],
          avatar: 'https://i.pravatar.cc/150?u=' + email,
        };
        
        setUser(mockUser);
        localStorage.setItem('videoSaasUser', JSON.stringify(mockUser));
      } else {
        throw new Error('Please enter valid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulating API call - in a real app, this would be a backend request
      if (name && email && password) {
        // Mock successful registration
        const mockUser: User = {
          id: Date.now().toString(),
          email: email,
          name: name,
          avatar: 'https://i.pravatar.cc/150?u=' + email,
        };
        
        setUser(mockUser);
        localStorage.setItem('videoSaasUser', JSON.stringify(mockUser));
      } else {
        throw new Error('Please fill in all required fields');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('videoSaasUser');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};