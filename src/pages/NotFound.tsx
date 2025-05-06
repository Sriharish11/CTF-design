
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MatrixRain from "@/components/MatrixRain";
import { AlertTriangle, Terminal, ChevronLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      <MatrixRain />
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="cyber-panel max-w-lg text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-cyber-purple" />
          </div>
          
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <div className="cyber-border bg-cyber-dark p-2 mb-4">
            <code className="text-cyber-green">
              Error: Access Denied. Path not found in system.
            </code>
          </div>
          <p className="text-gray-400 mb-6">
            The endpoint you're trying to access doesn't exist or you lack sufficient permissions to view it.
          </p>
          
          <Link to="/" className="cyber-btn inline-flex">
            <Terminal className="h-4 w-4 mr-2" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
