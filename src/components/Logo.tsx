import React from 'react';
import { motion } from 'motion/react';

export const PhoenixLogo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#FF00FF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Stylized Phoenix Body/Arrow */}
        <motion.path
          d="M50 20 L80 70 L50 60 L20 70 Z"
          fill="url(#phoenixGradient)"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Abstract Shards/Wings */}
        <motion.path
          d="M50 35 L85 25 L75 55 Z"
          fill="url(#phoenixGradient)"
          fillOpacity="0.6"
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 2, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M50 35 L15 25 L25 55 Z"
          fill="url(#phoenixGradient)"
          fillOpacity="0.6"
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, -2, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Central Spark */}
        <circle cx="50" cy="45" r="3" fill="#FFFF00">
          <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </motion.div>
  );
};
