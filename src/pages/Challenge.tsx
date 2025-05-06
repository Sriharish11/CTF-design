
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { apiService } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import MatrixRain from '@/components/MatrixRain';
import { Terminal, Flag, ChevronLeft, MessageSquare, Award, Lock } from 'lucide-react';

const Challenge = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [flag, setFlag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [usedHints, setUsedHints] = useState<Record<string, boolean>>({});
  
  const { data: challenge, isLoading, error } = useQuery({
    queryKey: ['challenge', id],
    queryFn: () => apiService.getChallenge(id || ''),
    enabled: !!id,
  });
  
  const handleSubmitFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!challenge || !user) return;
    
    setIsSubmitting(true);
    
    try {
      const isCorrect = await apiService.submitFlag(challenge.id, flag, user.id);
      
      if (isCorrect) {
        toast({
          title: "Flag Correct! 🎉",
          description: `Congratulations! You've captured the flag for ${challenge.title}.`,
        });
        // Force a refetch of the challenge to update the solved status
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        toast({
          title: "Incorrect Flag",
          description: "The submitted flag doesn't match. Try again!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit flag. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const useHint = (hintId: string) => {
    if (usedHints[hintId]) return;
    
    setUsedHints(prev => ({
      ...prev,
      [hintId]: true
    }));
    
    toast({
      title: "Hint Unlocked",
      description: `You've unlocked a hint. This costs ${challenge?.hints.find(h => h.id === hintId)?.cost} points.`,
    });
  };
  
  const isSolved = challenge?.solvedBy.includes(user?.id || '') || false;
  
  return (
    <div className="min-h-screen bg-cyber-black text-white">
      <MatrixRain />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 md:px-12">
        <div className="container mx-auto">
          {/* Back button */}
          <button 
            onClick={() => navigate('/dashboard')} 
            className="cyber-btn mb-6 py-1 px-4 inline-flex"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Challenges
          </button>
          
          {isLoading ? (
            <div className="cyber-panel flex items-center justify-center p-12">
              <div className="text-cyber-green terminal-text">Loading challenge...</div>
            </div>
          ) : error || !challenge ? (
            <div className="cyber-panel bg-red-900/20 border-red-500 p-6">
              <p className="text-red-500">Error loading challenge</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main challenge content */}
              <div className="lg:col-span-2">
                <div className="cyber-panel">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Terminal className="h-5 w-5 text-cyber-green mr-2" />
                      <h2 className="text-xl font-bold">{challenge.title}</h2>
                    </div>
                    <span className="text-cyber-purple font-mono font-bold">{challenge.points} pts</span>
                  </div>
                  
                  <div className="border-b border-gray-700 mb-4 pb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-cyber-dark">
                        Category: <span className="text-cyber-green uppercase">{challenge.category}</span>
                      </span>
                      <span className="text-xs font-medium px-2 py-1 rounded bg-cyber-dark">
                        Difficulty: <span className={`${
                          challenge.difficulty === 'easy' ? 'text-green-500' : 
                          challenge.difficulty === 'medium' ? 'text-yellow-500' : 
                          'text-red-500'
                        }`}>
                          {challenge.difficulty}
                        </span>
                      </span>
                      <span className="text-xs font-medium px-2 py-1 rounded bg-cyber-dark">
                        Solves: <span className="text-cyber-blue">{challenge.solvedBy.length}</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Terminal-like challenge description */}
                  <div className="bg-cyber-black p-4 rounded border border-cyber-green/30 mb-6 font-mono">
                    <p className="text-green-500 mb-2">$ cat challenge_description.txt</p>
                    <pre className="whitespace-pre-wrap text-gray-300 text-sm">
                      {challenge.description}
                    </pre>
                  </div>
                  
                  {/* Flag submission */}
                  {!isSolved ? (
                    <div>
                      <h3 className="text-lg font-bold mb-2 flex items-center">
                        <Flag className="h-4 w-4 mr-2 text-cyber-green" />
                        Submit Flag
                      </h3>
                      
                      <form onSubmit={handleSubmitFlag} className="mt-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={flag}
                            onChange={(e) => setFlag(e.target.value)}
                            placeholder="CTF{flag_format}"
                            className="cyber-input flex-1"
                            required
                          />
                          <button
                            type="submit"
                            className={`cyber-btn px-4 ${isSubmitting ? 'opacity-70' : ''}`}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Checking...' : 'Submit'}
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Flag format: CTF{'{flag_text}'}
                        </p>
                      </form>
                    </div>
                  ) : (
                    <div className="bg-green-900/20 border border-green-500 rounded p-4 flex items-center">
                      <Award className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <p className="text-green-500 font-bold">Challenge Completed!</p>
                        <p className="text-gray-300 text-sm">You've already solved this challenge.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Sidebar with hints */}
              <div>
                <div className="cyber-panel">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setShowHints(!showHints)}
                  >
                    <h3 className="text-lg font-bold flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-cyber-blue" />
                      Hints
                    </h3>
                    <span className="text-xs border border-cyber-blue px-2 py-1 rounded-full">
                      {challenge.hints.length} Available
                    </span>
                  </div>
                  
                  {showHints && (
                    <div className="mt-4 space-y-3">
                      {challenge.hints.map(hint => (
                        <div
                          key={hint.id}
                          className={`border p-3 rounded ${
                            usedHints[hint.id] 
                              ? 'border-cyber-blue' 
                              : 'border-gray-700 bg-cyber-dark'
                          }`}
                        >
                          {usedHints[hint.id] ? (
                            <p className="text-sm text-gray-300">{hint.text}</p>
                          ) : (
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Lock className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="text-sm text-gray-400">Locked Hint</span>
                              </div>
                              <button 
                                onClick={() => useHint(hint.id)}
                                className="text-xs cyber-btn-blue py-1 px-2"
                              >
                                Use (-{hint.cost} pts)
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenge;
