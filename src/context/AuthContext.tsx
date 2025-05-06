
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  email: string;
  username: string;
  teamId?: string;
  teamName?: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  createTeam: (teamName: string) => Promise<void>;
  joinTeam: (teamCode: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Simulate API call to check authentication status
        // In a real app, you would call your backend API
        const storedUser = localStorage.getItem('ctf_user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate API call for login
      // In a real app, you would call your backend API

      // Mock successful login
      if (email && password) {
        // Mock user data
        const newUser = {
          id: crypto.randomUUID(),
          email,
          username: email.split('@')[0],
          isAdmin: email === 'admin@ctf.com',
        };
        
        setUser(newUser);
        localStorage.setItem('ctf_user', JSON.stringify(newUser));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${newUser.username}!`,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate API call for registration
      // In a real app, you would call your backend API
      
      // Mock successful registration
      if (email && username && password) {
        // Mock user data
        const newUser = {
          id: crypto.randomUUID(),
          email,
          username,
          isAdmin: false,
        };
        
        setUser(newUser);
        localStorage.setItem('ctf_user', JSON.stringify(newUser));
        
        toast({
          title: "Registration successful",
          description: "Your account has been created.",
        });
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: "Registration failed",
        description: "Could not create your account.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ctf_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const createTeam = async (teamName: string) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      // Simulate API call to create a team
      const teamId = crypto.randomUUID();
      const teamCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Update user with team info
      const updatedUser = {
        ...user,
        teamId,
        teamName
      };
      
      setUser(updatedUser);
      localStorage.setItem('ctf_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Team created",
        description: `Your team '${teamName}' has been created. Team code: ${teamCode}`,
      });
    } catch (error) {
      console.error('Team creation failed:', error);
      toast({
        title: "Team creation failed",
        description: "Could not create the team.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const joinTeam = async (teamCode: string) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      // Simulate API call to join a team
      // In a real app, you would validate the team code on the server
      
      // Mock team data
      const teamId = crypto.randomUUID();
      const teamName = `Team ${teamCode}`;
      
      // Update user with team info
      const updatedUser = {
        ...user,
        teamId,
        teamName
      };
      
      setUser(updatedUser);
      localStorage.setItem('ctf_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Team joined",
        description: `You have joined '${teamName}'`,
      });
    } catch (error) {
      console.error('Team join failed:', error);
      toast({
        title: "Failed to join team",
        description: "Invalid team code or other error.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout,
        createTeam,
        joinTeam
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
