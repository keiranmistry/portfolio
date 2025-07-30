"use client";

import { motion } from "framer-motion";

export default function RealWorldMap({ visitedCountries, onCountryHover, onCountryLeave }) {
  const isVisited = (countryCode) => {
    return visitedCountries.hasOwnProperty(countryCode);
  };

  return (
    <svg
      viewBox="0 0 1000 500"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor: '#0f172a', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#1e293b', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      {/* Ocean Background */}
      <rect width="1000" height="500" fill="url(#oceanGradient)" rx="8"/>
      
      {/* World Map - Simplified but recognizable shapes */}
      
      {/* North America */}
      <g>
        {/* Canada */}
        <motion.path
          d="M 120 80 L 350 80 L 380 120 L 400 150 L 380 180 L 350 200 L 320 220 L 280 240 L 250 250 L 200 260 L 150 250 L 120 220 L 100 180 L 90 140 L 100 100 Z"
          fill={isVisited("CA") ? "#A2D6F9" : "#374151"}
          stroke="#4B5563"
          strokeWidth="0.5"
          className="cursor-pointer transition-all duration-300"
          whileHover={{ 
            scale: isVisited("CA") ? 1.02 : 1.01,
            fill: isVisited("CA") ? "#4FC3F7" : "#4B5563"
          }}
          onMouseEnter={(e) => isVisited("CA") && onCountryHover(e, "CA")}
          onMouseLeave={onCountryLeave}
          filter={isVisited("CA") ? "url(#glow)" : "none"}
        />
        
        {/* United States */}
        <motion.path
          d="M 150 200 L 350 200 L 380 220 L 400 250 L 380 280 L 350 300 L 320 320 L 280 340 L 250 350 L 200 360 L 150 350 L 120 320 L 100 280 L 90 240 L 100 200 Z"
          fill={isVisited("US") ? "#A2D6F9" : "#374151"}
          stroke="#4B5563"
          strokeWidth="0.5"
          className="cursor-pointer transition-all duration-300"
          whileHover={{ 
            scale: isVisited("US") ? 1.02 : 1.01,
            fill: isVisited("US") ? "#4FC3F7" : "#4B5563"
          }}
          onMouseEnter={(e) => isVisited("US") && onCountryHover(e, "US")}
          onMouseLeave={onCountryLeave}
          filter={isVisited("US") ? "url(#glow)" : "none"}
        />
      </g>

      {/* Europe */}
      <g>
        {/* United Kingdom */}
        <motion.path
          d="M 480 160 L 500 160 L 510 170 L 510 180 L 500 190 L 480 190 L 470 180 L 470 170 Z"
          fill={isVisited("GB") ? "#A2D6F9" : "#374151"}
          stroke="#4B5563"
          strokeWidth="0.5"
          className="cursor-pointer transition-all duration-300"
          whileHover={{ 
            scale: isVisited("GB") ? 1.05 : 1.02,
            fill: isVisited("GB") ? "#4FC3F7" : "#4B5563"
          }}
          onMouseEnter={(e) => isVisited("GB") && onCountryHover(e, "GB")}
          onMouseLeave={onCountryLeave}
          filter={isVisited("GB") ? "url(#glow)" : "none"}
        />
        
        {/* French Guiana */}
        <motion.path
          d="M 490 180 L 520 180 L 530 190 L 530 210 L 520 220 L 490 220 L 480 210 L 480 190 Z"
          fill={isVisited("GUF") ? "#A2D6F9" : "#374151"}
          stroke="#4B5563"
          strokeWidth="0.5"
          className="cursor-pointer transition-all duration-300"
          whileHover={{ 
            scale: isVisited("GUF") ? 1.05 : 1.02,
            fill: isVisited("GUF") ? "#4FC3F7" : "#4B5563"
          }}
          onMouseEnter={(e) => isVisited("GUF") && onCountryHover(e, "GUF")}
          onMouseLeave={onCountryLeave}
          filter={isVisited("GUF") ? "url(#glow)" : "none"}
        />
        
        {/* Germany */}
        <motion.path
          d="M 510 170 L 540 170 L 550 180 L 550 200 L 540 210 L 510 210 L 500 200 L 500 180 Z"
          fill={isVisited("DE") ? "#A2D6F9" : "#374151"}
          stroke="#4B5563"
          strokeWidth="0.5"
          className="cursor-pointer transition-all duration-300"
          whileHover={{ 
            scale: isVisited("DE") ? 1.05 : 1.02,
            fill: isVisited("DE") ? "#4FC3F7" : "#4B5563"
          }}
          onMouseEnter={(e) => isVisited("DE") && onCountryHover(e, "DE")}
          onMouseLeave={onCountryLeave}
          filter={isVisited("DE") ? "url(#glow)" : "none"}
        />
        
        {/* Netherlands */}
        <motion.path
          d="M 505 165 L 515 165 L 520 170 L 520 175 L 515 180 L 505 180 L 500 175 L 500 170 Z"
          fill={isVisited("NL") ? "#A2D6F9" : "#374151"}
          stroke="#4B5563"
          strokeWidth="0.5"
          className="cursor-pointer transition-all duration-300"
          whileHover={{ 
            scale: isVisited("NL") ? 1.1 : 1.05,
            fill: isVisited("NL") ? "#4FC3F7" : "#4B5563"
          }}
          onMouseEnter={(e) => isVisited("NL") && onCountryHover(e, "NL")}
          onMouseLeave={onCountryLeave}
          filter={isVisited("NL") ? "url(#glow)" : "none"}
        />
        
        {/* Belgium */}
        <motion.path
          d="M 495 175 L 505 175 L 510 180 L 510 185 L 505 190 L 495 190 L 490 185 L 490 180 Z"
          fill={isVisited("BE") ? "#A2D6F9" : "#374151"}
          stroke="#4B5563"
          strokeWidth="0.5"
          className="cursor-pointer transition-all duration-300"
          whileHover={{ 
            scale: isVisited("BE") ? 1.1 : 1.05,
            fill: isVisited("BE") ? "#4FC3F7" : "#4B5563"
          }}
          onMouseEnter={(e) => isVisited("BE") && onCountryHover(e, "BE")}
          onMouseLeave={onCountryLeave}
          filter={isVisited("BE") ? "url(#glow)" : "none"}
        />
        
        {/* Switzerland */}
        <motion.path
          d="M 520 190 L 530 190 L 535 195 L 535 205 L 530 210 L 520 210 L 515 205 L 515 195 Z"
          fill={isVisited("CH") ? "#A2D6F9" : "#374151"}
          stroke="#4B5563"
          strokeWidth="0.5"
          className="cursor-pointer transition-all duration-300"
          whileHover={{ 
            scale: isVisited("CH") ? 1.1 : 1.05,
            fill: isVisited("CH") ? "#4FC3F7" : "#4B5563"
          }}
          onMouseEnter={(e) => isVisited("CH") && onCountryHover(e, "CH")}
          onMouseLeave={onCountryLeave}
          filter={isVisited("CH") ? "url(#glow)" : "none"}
        />
        
        {/* Italy */}
        <motion.path
          d="M 520 200 L 550 200 L 560 210 L 560 230 L 550 240 L 520 240 L 510 230 L 510 210 Z"
          fill={isVisited("IT") ? "#A2D6F9" : "#374151"}
          stroke="#4B5563"
          strokeWidth="0.5"
          className="cursor-pointer transition-all duration-300"
          whileHover={{ 
            scale: isVisited("IT") ? 1.05 : 1.02,
            fill: isVisited("IT") ? "#4FC3F7" : "#4B5563"
          }}
          onMouseEnter={(e) => isVisited("IT") && onCountryHover(e, "IT")}
          onMouseLeave={onCountryLeave}
          filter={isVisited("IT") ? "url(#glow)" : "none"}
        />
        
        {/* Spain */}
        <motion.path
          d="M 470 200 L 500 200 L 510 210 L 510 230 L 500 240 L 470 240 L 460 230 L 460 210 Z"
          fill={isVisited("ES") ? "#A2D6F9" : "#374151"}
          stroke="#4B5563"
          strokeWidth="0.5"
          className="cursor-pointer transition-all duration-300"
          whileHover={{ 
            scale: isVisited("ES") ? 1.05 : 1.02,
            fill: isVisited("ES") ? "#4FC3F7" : "#4B5563"
          }}
          onMouseEnter={(e) => isVisited("ES") && onCountryHover(e, "ES")}
          onMouseLeave={onCountryLeave}
          filter={isVisited("ES") ? "url(#glow)" : "none"}
        />
      </g>

      {/* Other continents for context */}
      <g opacity="0.4">
        {/* South America */}
        <path
          d="M 200 300 L 350 300 L 380 320 L 400 350 L 380 380 L 350 400 L 320 420 L 280 440 L 250 450 L 200 460 L 150 450 L 120 420 L 100 380 L 90 340 L 100 300 Z"
          fill="#374151"
          stroke="#4B5563"
          strokeWidth="0.5"
        />
        
        {/* Africa */}
        <path
          d="M 520 250 L 650 250 L 680 270 L 700 300 L 680 330 L 650 350 L 620 370 L 580 390 L 550 400 L 500 410 L 450 400 L 420 370 L 400 330 L 390 290 L 400 250 Z"
          fill="#374151"
          stroke="#4B5563"
          strokeWidth="0.5"
        />
        
        {/* Asia */}
        <path
          d="M 700 150 L 900 150 L 950 170 L 950 200 L 900 220 L 700 220 L 650 200 L 650 170 Z"
          fill="#374151"
          stroke="#4B5563"
          strokeWidth="0.5"
        />
        
        {/* Australia */}
        <path
          d="M 750 350 L 850 350 L 870 370 L 870 390 L 850 410 L 750 410 L 730 390 L 730 370 Z"
          fill="#374151"
          stroke="#4B5563"
          strokeWidth="0.5"
        />
      </g>

      {/* Subtle grid lines */}
      <g stroke="#ffffff" strokeWidth="0.2" opacity="0.05">
        <line x1="0" y1="100" x2="1000" y2="100" />
        <line x1="0" y1="200" x2="1000" y2="200" />
        <line x1="0" y1="300" x2="1000" y2="300" />
        <line x1="0" y1="400" x2="1000" y2="400" />
        <line x1="200" y1="0" x2="200" y2="500" />
        <line x1="400" y1="0" x2="400" y2="500" />
        <line x1="600" y1="0" x2="600" y2="500" />
        <line x1="800" y1="0" x2="800" y2="500" />
      </g>
    </svg>
  );
} 