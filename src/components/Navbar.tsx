
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Terminal, Shield, Trophy, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="py-4 px-6 md:px-12 cyber-border bg-cyber-black/80 backdrop-blur-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Terminal className="h-6 w-6 text-cyber-green" />
          <span className="text-xl font-bold text-white">CTF<span className="text-cyber-green">::</span>Academy</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`hover:text-cyber-green transition-colors ${location.pathname === '/' ? 'text-cyber-green' : 'text-white'}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className={`hover:text-cyber-green transition-colors ${location.pathname === '/dashboard' ? 'text-cyber-green' : 'text-white'}`}
                onClick={closeMenu}
              >
                <span className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Challenges
                </span>
              </Link>
              <Link 
                to="/scoreboard" 
                className={`hover:text-cyber-green transition-colors ${location.pathname === '/scoreboard' ? 'text-cyber-green' : 'text-white'}`}
                onClick={closeMenu}
              >
                <span className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  Scoreboard
                </span>
              </Link>
              <Link 
                to="/profile" 
                className={`hover:text-cyber-green transition-colors ${location.pathname === '/profile' ? 'text-cyber-green' : 'text-white'}`}
                onClick={closeMenu}
              >
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Profile
                </span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="cyber-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="cyber-btn-blue" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/register" className="cyber-btn" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-cyber-dark cyber-border shadow-lg p-4 mt-2 mx-4">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`py-2 px-4 hover:bg-cyber-black transition-colors ${location.pathname === '/' ? 'text-cyber-green' : 'text-white'}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`py-2 px-4 hover:bg-cyber-black transition-colors ${location.pathname === '/dashboard' ? 'text-cyber-green' : 'text-white'}`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Challenges
                  </span>
                </Link>
                <Link 
                  to="/scoreboard" 
                  className={`py-2 px-4 hover:bg-cyber-black transition-colors ${location.pathname === '/scoreboard' ? 'text-cyber-green' : 'text-white'}`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Scoreboard
                  </span>
                </Link>
                <Link 
                  to="/profile" 
                  className={`py-2 px-4 hover:bg-cyber-black transition-colors ${location.pathname === '/profile' ? 'text-cyber-green' : 'text-white'}`}
                  onClick={closeMenu}
                >
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="py-2 px-4 text-left text-cyber-green hover:bg-cyber-black transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="py-2 px-4 text-cyber-blue hover:bg-cyber-black transition-colors"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="py-2 px-4 text-cyber-green hover:bg-cyber-black transition-colors"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
