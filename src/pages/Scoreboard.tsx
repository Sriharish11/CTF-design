
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import Navbar from '@/components/Navbar';
import MatrixRain from '@/components/MatrixRain';
import { Trophy, Medal, Search, Users, Clock } from 'lucide-react';

const Scoreboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: teams, isLoading, error } = useQuery({
    queryKey: ['teams'],
    queryFn: apiService.getTeams,
  });
  
  const filteredTeams = teams?.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getPositionClass = (index: number) => {
    switch (index) {
      case 0: return 'text-yellow-400'; // Gold
      case 1: return 'text-gray-400'; // Silver
      case 2: return 'text-amber-600'; // Bronze
      default: return 'text-gray-600';
    }
  };
  
  const getPositionIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 1: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 2: return <Trophy className="h-5 w-5 text-amber-600" />;
      default: return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-cyber-black text-white">
      <MatrixRain />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 md:px-12">
        <div className="container mx-auto">
          <div className="cyber-panel mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
                <Trophy className="h-6 w-6 text-cyber-purple mr-3" />
                <h2 className="text-2xl font-bold">Live Scoreboard</h2>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search teams..."
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
              <div className="text-cyber-green terminal-text">Loading scoreboard...</div>
            </div>
          ) : error ? (
            <div className="cyber-panel bg-red-900/20 border-red-500 p-6">
              <p className="text-red-500">Error loading scoreboard</p>
            </div>
          ) : (
            <div className="cyber-panel">
              {/* Matrix-style scoreboard header */}
              <div className="flex items-center px-4 py-2 border-b border-cyber-green/30 bg-cyber-dark">
                <div className="w-16 text-center font-mono text-xs text-cyber-green">#</div>
                <div className="flex-1 font-mono text-xs text-cyber-green">TEAM</div>
                <div className="w-20 text-center font-mono text-xs text-cyber-green">MEMBERS</div>
                <div className="w-36 text-center font-mono text-xs text-cyber-green">SOLVED</div>
                <div className="w-24 text-center font-mono text-xs text-cyber-green">SCORE</div>
              </div>
              
              {/* Team list */}
              <div className="divide-y divide-cyber-green/10">
                {filteredTeams?.map((team, index) => (
                  <div 
                    key={team.id} 
                    className={`flex items-center px-4 py-3 hover:bg-cyber-green/5 transition-colors ${
                      index === 0 ? 'bg-yellow-400/5' : 
                      index === 1 ? 'bg-gray-400/5' :
                      index === 2 ? 'bg-amber-600/5' : ''
                    }`}
                  >
                    <div className="w-16 flex justify-center">
                      {getPositionIcon(index) || (
                        <span className={`font-mono font-bold ${getPositionClass(index)}`}>
                          {index + 1}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1 font-semibold">
                      <span className={index < 3 ? getPositionClass(index) : ''}>
                        {team.name}
                      </span>
                    </div>
                    
                    <div className="w-20 text-center">
                      <div className="flex items-center justify-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-sm">{team.members.length}</span>
                      </div>
                    </div>
                    
                    <div className="w-36 text-center">
                      <div className="bg-cyber-dark rounded-full h-2 w-full">
                        <div 
                          className="bg-cyber-green h-2 rounded-full" 
                          style={{ width: `${(team.solvedChallenges.length / 8) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 mt-1">
                        {team.solvedChallenges.length}/8 challenges
                      </span>
                    </div>
                    
                    <div className="w-24 text-center">
                      <span className="text-lg font-mono font-bold text-cyber-purple">
                        {team.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredTeams?.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  No teams found matching your search
                </div>
              )}
              
              <div className="border-t border-cyber-green/30 py-3 px-4 text-xs text-gray-400 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Live updating every 60 seconds
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
