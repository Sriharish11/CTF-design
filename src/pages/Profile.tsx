
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import MatrixRain from '@/components/MatrixRain';
import { User, Shield, Award, Users, Code, Plus, X } from 'lucide-react';

const Profile = () => {
  const { user, createTeam, joinTeam } = useAuth();
  const { toast } = useToast();
  
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamAction, setTeamAction] = useState<'create' | 'join'>('create');
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (teamAction === 'create') {
        await createTeam(teamName);
      } else {
        await joinTeam(teamCode);
      }
      setShowTeamForm(false);
    } catch (error) {
      console.error('Team action failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Mock achievements data
  const achievements = [
    { id: 'a1', title: 'First Blood', description: 'Solve your first challenge', icon: '🩸', completed: true },
    { id: 'a2', title: 'Crypto Novice', description: 'Solve 3 cryptography challenges', icon: '🔐', completed: true },
    { id: 'a3', title: 'Web Warrior', description: 'Solve 5 web exploitation challenges', icon: '🌐', completed: false },
    { id: 'a4', title: 'Persistence Hunter', description: 'Solve a challenge after 10 failed attempts', icon: '🏹', completed: true },
    { id: 'a5', title: 'Night Owl', description: 'Solve a challenge between 2 AM and 5 AM', icon: '🦉', completed: false },
    { id: 'a6', title: 'Team Player', description: 'Join a team with at least 3 members', icon: '👥', completed: user?.teamId ? true : false },
  ];
  
  // Filter completed achievements
  const completedAchievements = achievements.filter(a => a.completed);
  
  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let score = 0;
    if (user?.username) score += 25;
    if (user?.teamId) score += 25;
    if (completedAchievements.length >= 2) score += 25;
    if (completedAchievements.length >= 4) score += 25;
    return score;
  };
  
  const profileCompletion = calculateProfileCompletion();
  
  return (
    <div className="min-h-screen bg-cyber-black text-white">
      <MatrixRain />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="cyber-panel">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full border-4 border-cyber-purple flex items-center justify-center bg-cyber-dark mb-4">
                    <User className="h-12 w-12 text-cyber-purple" />
                  </div>
                  <h2 className="text-xl font-bold">{user?.username}</h2>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
                
                <div className="border-t border-b border-gray-800 py-4 mb-4">
                  <p className="text-sm text-gray-400 mb-1">Profile Completion</p>
                  <div className="w-full bg-cyber-dark rounded-full h-2">
                    <div 
                      className="bg-cyber-purple h-2 rounded-full"
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right mt-1 text-gray-400">{profileCompletion}%</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Team</span>
                    <span>{user?.teamName || 'Not in a team'}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Achievements</span>
                    <span>{completedAchievements.length}/{achievements.length}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Score</span>
                    <span className="text-cyber-green font-mono font-bold">250 pts</span>
                  </div>
                </div>
                
                {!user?.teamId && (
                  <div className="mt-6">
                    <button 
                      onClick={() => {
                        setTeamAction('create');
                        setShowTeamForm(true);
                      }}
                      className="cyber-btn w-full mb-2"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Create Team
                    </button>
                    
                    <button 
                      onClick={() => {
                        setTeamAction('join');
                        setShowTeamForm(true);
                      }}
                      className="cyber-btn-blue w-full"
                    >
                      <Users className="h-4 w-4 mr-1" /> Join Team
                    </button>
                  </div>
                )}
              </div>
              
              {/* Team Form Modal */}
              {showTeamForm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
                  <div className="cyber-panel w-full max-w-md relative">
                    <button 
                      onClick={() => setShowTeamForm(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    
                    <h3 className="text-xl font-bold mb-4">
                      {teamAction === 'create' ? 'Create a New Team' : 'Join a Team'}
                    </h3>
                    
                    <form onSubmit={handleTeamSubmit} className="space-y-4">
                      {teamAction === 'create' ? (
                        <div>
                          <label htmlFor="teamName" className="block text-sm font-medium mb-1 text-gray-300">
                            Team Name
                          </label>
                          <input
                            id="teamName"
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            required
                            className="cyber-input w-full"
                            placeholder="Enter team name"
                          />
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="teamCode" className="block text-sm font-medium mb-1 text-gray-300">
                            Team Code
                          </label>
                          <input
                            id="teamCode"
                            type="text"
                            value={teamCode}
                            onChange={(e) => setTeamCode(e.target.value)}
                            required
                            className="cyber-input w-full"
                            placeholder="Enter team code"
                          />
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        className={`cyber-btn w-full ${isSubmitting ? 'opacity-70' : ''}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Processing...' : teamAction === 'create' ? 'Create Team' : 'Join Team'}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
            
            {/* Achievements */}
            <div className="lg:col-span-2">
              <div className="cyber-panel mb-6">
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-cyber-green mr-2" />
                  <h3 className="text-xl font-bold">Achievements</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map(achievement => (
                    <div 
                      key={achievement.id}
                      className={`border rounded p-3 flex items-center ${
                        achievement.completed 
                          ? 'border-cyber-green bg-cyber-green/5' 
                          : 'border-gray-700 bg-cyber-dark opacity-50'
                      }`}
                    >
                      <div className="bg-cyber-dark cyber-border h-10 w-10 flex items-center justify-center rounded text-xl mr-3">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="cyber-panel">
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-cyber-blue mr-2" />
                  <h3 className="text-xl font-bold">Recent Activity</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="border-l-2 border-cyber-green pl-4 py-1">
                    <div className="flex items-center">
                      <Code className="h-4 w-4 text-cyber-green mr-2" />
                      <span className="text-sm">Solved challenge: <strong>Caesar's Secret</strong></span>
                    </div>
                    <span className="text-xs text-gray-400">Today, 2:45 PM</span>
                  </div>
                  
                  <div className="border-l-2 border-cyber-blue pl-4 py-1">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-cyber-blue mr-2" />
                      <span className="text-sm">Achievement unlocked: <strong>Crypto Novice</strong></span>
                    </div>
                    <span className="text-xs text-gray-400">Yesterday, 7:12 PM</span>
                  </div>
                  
                  <div className="border-l-2 border-cyber-purple pl-4 py-1">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-cyber-purple mr-2" />
                      <span className="text-sm">Registered for CTF::Academy</span>
                    </div>
                    <span className="text-xs text-gray-400">3 days ago, 10:30 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
