
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import MatrixRain from '@/components/MatrixRain';
import { Shield, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      <MatrixRain />
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto">
          <div className="cyber-panel">
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 text-cyber-blue mx-auto mb-2" />
              <h1 className="text-2xl font-bold">Login to CTF::Academy</h1>
              <p className="text-gray-400 text-sm mt-1">Access your account to start hacking</p>
            </div>
            
            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-100 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="cyber-input w-full"
                  placeholder="hacker@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="cyber-input w-full"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className={`cyber-btn-blue w-full ${isLoading ? 'opacity-70' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Authenticating...' : 'Login'}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-cyber-green hover:underline">
                  Register now
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              For demo purposes, any email/password combination will work
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
