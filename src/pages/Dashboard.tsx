
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { apiService, Challenge } from '@/services/api';
import Navbar from '@/components/Navbar';
import MatrixRain from '@/components/MatrixRain';
import { Terminal, Shield, Lock, File, Bookmark, Code, Search, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: apiService.getChallenges
  });
  
  const categories = [
    { id: 'all', name: 'All Challenges', icon: Terminal },
    { id: 'web', name: 'Web Exploitation', icon: Code },
    { id: 'crypto', name: 'Cryptography', icon: Lock },
    { id: 'stego', name: 'Steganography', icon: Search },
    { id: 'forensics', name: 'Forensics', icon: File },
    { id: 'reverse', name: 'Reverse Engineering', icon: Bookmark },
  ];
  
  const filteredChallenges = challenges?.filter(challenge => {
    // Filter by category
    const categoryMatch = !activeCategory || activeCategory === 'all' || challenge.category === activeCategory;
    
    // Filter by search query
    const searchMatch = !searchQuery || 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web': return <Code className="h-4 w-4" />;
      case 'crypto': return <Lock className="h-4 w-4" />;
      case 'forensics': return <File className="h-4 w-4" />;
      case 'reverse': return <Bookmark className="h-4 w-4" />;
      case 'stego': return <Search className="h-4 w-4" />;
      default: return <Terminal className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Check if user has solved a challenge
  const isSolved = (challenge: Challenge) => {
    return challenge.solvedBy.includes(user?.id || '');
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      <MatrixRain />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 md:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Category Sidebar */}
            <div className="md:w-64">
              <div className="cyber-panel sticky top-24">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-cyber-green" />
                  Categories
                </h3>
                
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-3 py-2 flex items-center rounded-sm transition-colors ${
                        activeCategory === category.id || (!activeCategory && category.id === 'all')
                          ? 'bg-cyber-green/20 text-cyber-green font-medium'
                          : 'hover:bg-cyber-dark'
                      }`}
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="cyber-panel mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold">Challenge Dashboard</h2>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search challenges..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="cyber-input pl-10 w-full md:w-64"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {isLoading ? (
                <div className="cyber-panel flex items-center justify-center p-12">
                  <div className="text-cyber-green terminal-text">Loading challenges...</div>
                </div>
              ) : error ? (
                <div className="cyber-panel bg-red-900/20 border-red-500 p-6">
                  <p className="text-red-500">Error loading challenges</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredChallenges?.map(challenge => (
                    <Link 
                      to={`/challenges/${challenge.id}`} 
                      key={challenge.id}
                      className="group"
                    >
                      <div className={`cyber-panel h-full transition-all duration-300 ${
                        isSolved(challenge) 
                          ? 'border-green-500 shadow-[0_0_5px_theme(colors.green.500)]' 
                          : 'hover:shadow-[0_0_10px_theme(colors.cyber.green)]'
                      }`}>
                        {/* Challenge header */}
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <span className="flex items-center text-xs font-medium px-2 py-1 rounded bg-cyber-dark mr-2">
                              {getCategoryIcon(challenge.category)}
                              <span className="ml-1 uppercase">{challenge.category}</span>
                            </span>
                            <span className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                              {challenge.difficulty}
                            </span>
                          </div>
                          <span className="text-cyber-purple font-mono">{challenge.points} pts</span>
                        </div>
                        
                        {/* Challenge title */}
                        <h3 className="text-lg font-bold mb-2 group-hover:text-cyber-green transition-colors">
                          {challenge.title}
                          {isSolved(challenge) && (
                            <CheckCircle className="inline-block ml-2 h-4 w-4 text-green-500" />
                          )}
                        </h3>
                        
                        {/* Challenge description (truncated) */}
                        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                          {challenge.description}
                        </p>
                        
                        {/* Challenge footer */}
                        <div className="text-xs text-gray-400 flex justify-between items-center">
                          <span>{challenge.solvedBy.length} solves</span>
                          <span className="text-cyber-green">
                            View Challenge →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              
              {filteredChallenges?.length === 0 && (
                <div className="cyber-panel p-8 text-center">
                  <p className="text-gray-400">No challenges found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
