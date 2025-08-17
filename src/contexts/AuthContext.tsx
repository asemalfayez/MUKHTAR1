import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'tourist' | 'organizer';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userTypeOverride?: UserType) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void; // إضافة updateUser
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app start (migrated from dalilak_user to mukhtar_user)
    const newKey = 'mukhtar_user';
    const oldKey = 'dalilak_user';
    const storedUser = localStorage.getItem(newKey) || localStorage.getItem(oldKey);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // migrate to new key if needed
      if (!localStorage.getItem(newKey)) {
        localStorage.setItem(newKey, storedUser);
        localStorage.removeItem(oldKey);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, userTypeOverride?: UserType): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in real app this would come from API
    const mockUser: User = {
      id: '1',
      name: 'مختار',
      email,
      phone: '+962 7 9999 9999',
      userType: userTypeOverride ?? (email.includes('organizer') ? 'organizer' : 'tourist'),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email
    };
    
    setUser(mockUser);
    localStorage.setItem('mukhtar_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + userData.email
    };
    
    setUser(newUser);
    localStorage.setItem('mukhtar_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mukhtar_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('mukhtar_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};