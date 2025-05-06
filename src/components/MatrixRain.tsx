
import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  className?: string;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Create an array of drops - one per column
    const drops = Array(Math.floor(columns)).fill(1);

    // Drawing the characters
    function draw() {
      // Slightly translucent black to create the fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set the color and font
      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;
      
      // Loop over each drop
      for (let i = 0; i < drops.length; i++) {
        // Generate a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // x = i * fontSize, y = value of drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Send the drop back to the top randomly after it has crossed the screen
        // Adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y coordinate
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Recalculate columns and drops array
      const newColumns = canvas.width / fontSize;
      drops.length = Math.floor(newColumns);
      for (let i = drops.length; i < Math.floor(newColumns); i++) {
        drops.push(1);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 opacity-20 ${className}`}
    />
  );
};

export default MatrixRain;
