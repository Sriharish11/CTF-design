
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import TerminalText from '@/components/TerminalText';
import MatrixRain from '@/components/MatrixRain';
import { Shield, Terminal, Trophy, Clock } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      <MatrixRain />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-cyber-green">&lt;</span> 
              <span className="glitch-effect" data-text="CTF::Academy">CTF::Academy</span> 
              <span className="text-cyber-green">/&gt;</span>
            </h1>
            
            <div className="cyber-panel mb-8">
              <TerminalText 
                text="Dive into the world of cybersecurity challenges. Hack, decrypt, and capture the flags." 
                className="text-xl"
                typingSpeed={20}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="cyber-btn">
                  <Terminal className="mr-2 h-4 w-4" />
                  Access Challenges
                </Link>
              ) : (
                <>
                  <Link to="/register" className="cyber-btn">
                    <Shield className="mr-2 h-4 w-4" />
                    Join the Mission
                  </Link>
                  <Link to="/login" className="cyber-btn-blue">
                    <Terminal className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="cyber-panel opacity-80">
            <pre className="text-xs md:text-sm text-cyber-green overflow-x-auto">
{`#!/usr/bin/env python3
import ctf

def main():
    player = ctf.Player()
    challenges = ctf.get_challenges()
    
    for challenge in challenges:
        flag = player.solve(challenge)
        if flag:
            points += challenge.points
            print(f"Flag captured: {flag}")
    
    print(f"Total score: {player.score}")

if __name__ == "__main__":
    print("CTF::Academy initialized...")
    main()`}
            </pre>
          </div>
        </div>
      </section>
      
      {/* Event Info Section */}
      <section className="py-16 px-6 md:px-12 bg-cyber-dark">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-cyber-green">#</span> Event Details <span className="text-cyber-green">#</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="cyber-panel hover:shadow-[0_0_15px_theme(colors.cyber.green)] transition duration-300">
              <div className="text-cyber-green mb-4">
                <Clock className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Event Schedule</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Registration Opens:</span> 
                  <span className="text-cyber-green">May 10, 2025</span>
                </li>
                <li className="flex justify-between">
                  <span>Competition Starts:</span> 
                  <span className="text-cyber-green">May 15, 2025</span>
                </li>
                <li className="flex justify-between">
                  <span>Competition Ends:</span> 
                  <span className="text-cyber-green">May 17, 2025</span>
                </li>
                <li className="flex justify-between">
                  <span>Winners Announced:</span> 
                  <span className="text-cyber-green">May 18, 2025</span>
                </li>
              </ul>
            </div>
            
            <div className="cyber-panel hover:shadow-[0_0_15px_theme(colors.cyber.blue)] transition duration-300">
              <div className="text-cyber-blue mb-4">
                <Shield className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Challenge Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>🌐 <span className="text-cyber-blue">Web Exploitation</span></li>
                <li>🔒 <span className="text-cyber-blue">Cryptography</span></li>
                <li>🕵️ <span className="text-cyber-blue">Steganography</span></li>
                <li>⚙️ <span className="text-cyber-blue">Reverse Engineering</span></li>
                <li>🔍 <span className="text-cyber-blue">Forensics</span></li>
              </ul>
            </div>
            
            <div className="cyber-panel hover:shadow-[0_0_15px_theme(colors.cyber.purple)] transition duration-300">
              <div className="text-cyber-purple mb-4">
                <Trophy className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Prizes</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>1st Place:</span> 
                  <span className="text-cyber-purple">$1,000 + Certificates</span>
                </li>
                <li className="flex justify-between">
                  <span>2nd Place:</span> 
                  <span className="text-cyber-purple">$500 + Certificates</span>
                </li>
                <li className="flex justify-between">
                  <span>3rd Place:</span> 
                  <span className="text-cyber-purple">$250 + Certificates</span>
                </li>
                <li className="flex justify-between">
                  <span>All Participants:</span> 
                  <span className="text-cyber-purple">Digital Badges</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Rules Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-cyber-green">&gt;</span> Competition Rules <span className="text-cyber-green">&lt;</span>
          </h2>
          
          <div className="cyber-panel">
            <pre className="text-cyber-green text-sm mb-6">
{`
.------..------..------..------..------.
|C.--. ||T.--. ||F.--. ||:.--. ||:.--. |
| :/\\: || :/\\: || :(): || :/\\: || :/\\: |
| :\\/: || (__) || ()() || :\\/: || :\\/: |
| '--'C|| '--'T|| '--'F|| '--':|| '--':|
\`------'\`------'\`------'\`------'\`------'
`}
            </pre>
            
            <ol className="list-decimal pl-5 space-y-3">
              <li>Participants can compete individually or in teams of up to 4 members.</li>
              <li>No attacking the competition infrastructure. Focus only on the challenges provided.</li>
              <li>No sharing of flags or solutions with other teams.</li>
              <li>Do not attempt to disrupt other participants or teams.</li>
              <li>Hints can be purchased with points, but they reduce the total points earned from a challenge.</li>
              <li>All submissions will be logged with timestamps, which will be used for tie-breakers.</li>
              <li>The administrators' decisions are final in any disputes.</li>
              <li>Have fun and learn from the experience!</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 bg-cyber-dark border-t border-cyber-green/30">
        <div className="container mx-auto text-center text-sm text-gray-400">
          <p>© 2025 CTF::Academy - All rights reserved</p>
          <p className="mt-2">
            <Link to="/" className="text-cyber-green hover:underline">Home</Link> |&nbsp;
            <Link to="/register" className="text-cyber-green hover:underline">Register</Link> |&nbsp;
            <Link to="/login" className="text-cyber-green hover:underline">Login</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
