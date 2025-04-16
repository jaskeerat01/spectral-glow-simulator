
import React from 'react';
import { temperatureToColor } from './PhysicsCalculations';

interface BlackBodyVisualProps {
  temperature: number;
}

const BlackBodyVisual: React.FC<BlackBodyVisualProps> = ({ temperature }) => {
  const color = temperatureToColor(temperature);
  
  // Calculate dynamic glow size based on temperature
  const glowIntensity = Math.min(temperature / 10000, 1) * 0.5 + 0.5;
  
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg">
      <div 
        className="relative flex items-center justify-center"
        aria-label={`Visual representation of a black body at ${temperature} Kelvin`}
      >
        {/* Outer glow */}
        <div 
          className="absolute rounded-full animate-glow" 
          style={{ 
            backgroundColor: color,
            width: `${120 * glowIntensity}px`,
            height: `${120 * glowIntensity}px`,
            opacity: 0.3,
            filter: `blur(${20 * glowIntensity}px)`,
          }}
        />
        
        {/* Middle glow */}
        <div 
          className="absolute rounded-full animate-glow" 
          style={{ 
            backgroundColor: color,
            width: `${100 * glowIntensity}px`,
            height: `${100 * glowIntensity}px`,
            opacity: 0.5,
            filter: `blur(${15 * glowIntensity}px)`,
            animationDelay: '0.2s'
          }}
        />
        
        {/* Inner circle (blackbody) */}
        <div 
          className="relative rounded-full z-10 transition-all duration-300 ease-in-out" 
          style={{ 
            backgroundColor: color,
            width: '80px',
            height: '80px',
            boxShadow: `0 0 ${15 * glowIntensity}px ${5 * glowIntensity}px ${color}`
          }}
        />
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-lg font-medium">Black Body</p>
        <p className="text-sm text-muted-foreground">Temperature: {temperature.toLocaleString()} K</p>
      </div>
    </div>
  );
};

export default BlackBodyVisual;
