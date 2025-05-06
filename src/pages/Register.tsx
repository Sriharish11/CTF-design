
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import MatrixRain from '@/components/MatrixRain';
import { User, Users, Shield } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [joinTeam, setJoinTeam] = useState(false);
  const [teamCode, setTeamCode] = useState('');
  const [createTeam, setCreateTeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    try {
      await register(email, username, password);
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
              <User className="h-12 w-12 text-cyber-green mx-auto mb-2" />
              <h1 className="text-2xl font-bold">Join CTF::Academy</h1>
              <p className="text-gray-400 text-sm mt-1">Create your account to start the challenge</p>
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
                <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-300">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="cyber-input w-full"
                  placeholder="l33thacker"
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
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-gray-300">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="cyber-input w-full"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="pt-2">
                <div className="text-sm font-medium mb-3 text-gray-300 flex items-center">
                  <Users className="h-4 w-4 mr-1" /> Team Options
                </div>
                
                <div className="space-y-2 pl-2 border-l-2 border-cyber-green/30">
                  <div className="flex items-center">
                    <input
                      id="individual"
                      type="radio"
                      checked={!joinTeam && !createTeam}
                      onChange={() => {
                        setJoinTeam(false);
                        setCreateTeam(false);
                      }}
                      className="mr-2 accent-cyber-green"
                    />
                    <label htmlFor="individual" className="text-sm text-gray-300">
                      Participate individually
                    </label>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <input
                        id="joinTeam"
                        type="radio"
                        checked={joinTeam}
                        onChange={() => {
                          setJoinTeam(true);
                          setCreateTeam(false);
                        }}
                        className="mr-2 accent-cyber-green"
                      />
                      <label htmlFor="joinTeam" className="text-sm text-gray-300">
                        Join an existing team
                      </label>
                    </div>
                    
                    {joinTeam && (
                      <div className="mt-2 pl-6">
                        <input
                          type="text"
                          value={teamCode}
                          onChange={(e) => setTeamCode(e.target.value)}
                          className="cyber-input w-full"
                          placeholder="Enter team code"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <input
                        id="createTeam"
                        type="radio"
                        checked={createTeam}
                        onChange={() => {
                          setCreateTeam(true);
                          setJoinTeam(false);
                        }}
                        className="mr-2 accent-cyber-green"
                      />
                      <label htmlFor="createTeam" className="text-sm text-gray-300">
                        Create a new team
                      </label>
                    </div>
                    
                    {createTeam && (
                      <div className="mt-2 pl-6">
                        <input
                          type="text"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          className="cyber-input w-full"
                          placeholder="Enter team name"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className={`cyber-btn w-full ${isLoading ? 'opacity-70' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Register'}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-cyber-blue hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
