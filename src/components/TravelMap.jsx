"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoMercator, geoPath } from "d3-geo";
import { Barlow, Exo_2 } from 'next/font/google';
import { countryData, nameToCodeMap, idToCodeMap } from '../lib/countryData';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Animated Counter Component
const AnimatedCounter = ({ value, color, className }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const duration = 2000; // 2 seconds
      
      const updateValue = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.round(progress * value);
        
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };
      
      updateValue();
    }, 1200); // 1.2 second delay
    
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <motion.div 
      className={className} 
      style={{ color }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      {displayValue}
    </motion.div>
  );
};

const visitedCountries = {
  "USA": {
    name: "United States",
    flag: "🇺🇸",
    cities: {
      "New York": [
        { month: "Jan", year: "2025" }
      ],
      "Boston": [
        { month: "Dec", year: "2021" },
        { month: "Jun", year: "2022" }
      ],
      "San Francisco": [
        { month: "Mar", year: "2023" }
      ]
    }
  },
  "CAN": {
    name: "Canada",
    flag: "🇨🇦",
    cities: {
      "Toronto": [
        { month: "Present", year: "2024" }
      ],
      "Vancouver": [
        { month: "Present", year: "2024" }
      ],
      "Montreal": [
        { month: "Present", year: "2024" }
      ]
    }
  },
  "NZL": {
    name: "New Zealand",
    flag: "🇳🇿",
    cities: {
      "Auckland": [
        { month: "Jan", year: "2023" }
      ],
      "Wellington": [
        { month: "Jan", year: "2023" }
      ],
      "Queenstown": [
        { month: "Jan", year: "2023" }
      ]
    }
  },
  "SLB": {
    name: "Solomon Islands",
    flag: "🇸🇧",
    cities: {
      "Honiara": [
        { month: "Jan", year: "2023" }
      ]
    }
  }
};



export default function TravelMap() {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredCentroid, setHoveredCentroid] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 0]);
  const [isCitiesExpanded, setIsCitiesExpanded] = useState(true);
  const [defaultCountry, setDefaultCountry] = useState("CAN");
  const [highlightedCountries, setHighlightedCountries] = useState(new Set());
  const mapContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });

  // Set a random default country on component mount
  useEffect(() => {
    const countryCodes = Object.keys(visitedCountries);
    const randomCountry = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    setDefaultCountry(randomCountry);
  }, []);

  // Use the default country when no country is hovered
  const currentCountry = hoveredCountry || defaultCountry;

  // Handle country click to set as default
  const handleCountryClick = (countryCode) => {
    setDefaultCountry(countryCode);
  };

  // Animate countries in random order
  useEffect(() => {
    const countryCodes = Object.keys(visitedCountries);
    const shuffledCountries = [...countryCodes].sort(() => Math.random() - 0.5);
    
    setHighlightedCountries(new Set());
    
    shuffledCountries.forEach((countryCode, index) => {
      setTimeout(() => {
        setHighlightedCountries(prev => new Set([...prev, countryCode]));
      }, index * 300); // 300ms delay between each country
    });
  }, []); // Run once on mount

  // Responsive handler
  useEffect(() => {
    function handleResize() {
      if (mapContainerRef.current) {
        const width = Math.min(mapContainerRef.current.offsetWidth, 1000);
        const height = Math.round(width * 0.6);
        setDimensions({ width, height });
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Projection for tooltip placement
  const projection = geoMercator()
    .scale(dimensions.width / 6.25)
    .translate([dimensions.width / 2, dimensions.height / 2]);

  function getCountryCode(geo) {
    // The geography data uses numeric IDs, not ISO codes
    const countryId = geo.id;
    const countryName = geo.properties.name || geo.properties.NAME || geo.properties.ADMIN || geo.properties.ADMIN0 || 'Unknown';
    
    // Debug: log all country IDs to see what we're working with
    console.log(`Country ID: ${countryId}, Name: ${countryName}`);
    
    // Special debugging for South Sudan, Bosnia, Malawi, and French Guiana
    if (countryName.toLowerCase().includes('south sudan') || countryName.toLowerCase().includes('bosnia') || countryName.toLowerCase().includes('malawi') || countryName.toLowerCase().includes('french guiana') || countryName.toLowerCase().includes('france')) {
      console.log(`🔍 SPECIAL DEBUG - Country ID: ${countryId}, Name: "${countryName}"`);
      console.log(`🔍 Available mappings for this name:`, nameToCodeMap[countryName]);
      console.log(`🔍 Available mappings for this ID:`, idToCodeMap[countryId]);
    }
    
    // Try to match by name first (more reliable)
    let finalCode = nameToCodeMap[countryName];
    
    if (!finalCode) {
      // Fallback to numeric ID mapping
      finalCode = idToCodeMap[countryId];
    }
    
    // Debug: log the result
    if (finalCode) {
      console.log(`Mapped "${countryName}" (ID: ${countryId}) to ${finalCode}`);
    } else {
      console.log(`No mapping found for "${countryName}" (ID: ${countryId})`);
    }
    
    // Debug: only log for countries we're interested in
    if (visitedCountries.hasOwnProperty(finalCode)) {
      console.log(`Found visited country: ${finalCode} - ${visitedCountries[finalCode].name} (ID: ${countryId})`);
    }
    
    return finalCode;
  }

  function getCentroid(geo) {
    const path = geoPath().projection(projection);
    return path.centroid(geo);
  }

  function getTooltipTransform(x, y, currentZoom, currentCenter) {
    const mapWidth = 1000;
    const mapHeight = 600;
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    
    // Always position tooltip in the bottom-right corner, away from countries
    const tooltipX = mapWidth - tooltipWidth - 30;
    const tooltipY = mapHeight - tooltipHeight - 30;
    
    return `translate(${tooltipX - x}px, ${tooltipY - y}px)`;
  }

  function getArrowPosition(x, y, currentZoom) {
    const mapWidth = 1000;
    const mapHeight = 600;
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    
    // Adjust for zoom level
    const zoomFactor = Math.max(0.5, Math.min(2, 1 / currentZoom));
    const adjustedTooltipWidth = tooltipWidth * zoomFactor;
    const adjustedTooltipHeight = tooltipHeight * zoomFactor;
    
    // Calculate available space (same logic as getTooltipTransform)
    const spaceOnRight = x + adjustedTooltipWidth / 2 + 120 < mapWidth;
    const spaceOnLeft = x - adjustedTooltipWidth / 2 - 120 > 0;
    const spaceAbove = y - adjustedTooltipHeight / 2 - 120 > 0;
    const spaceBelow = y + adjustedTooltipHeight / 2 + 120 < mapHeight;
    
    // Determine arrow position based on tooltip placement
    if (spaceOnRight && spaceOnLeft) {
      // If both sides have space, choose the one with more room
      const rightSpace = mapWidth - x;
      const leftSpace = x;
      if (rightSpace > leftSpace) {
        // Tooltip is to the right, arrow points left
        return {
          top: '50%',
          left: '-20px',
          transform: 'translateY(-50%)',
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'rgba(255,255,255,0.95)',
          borderRightColor: 'transparent',
          borderBottomWidth: '0px',
          borderTopWidth: '0px',
          borderLeftWidth: '20px',
          borderRightWidth: '0px'
        };
      } else {
        // Tooltip is to the left, arrow points right
        return {
          top: '50%',
          left: '100%',
          transform: 'translateY(-50%)',
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'rgba(255,255,255,0.95)',
          borderBottomWidth: '0px',
          borderTopWidth: '0px',
          borderLeftWidth: '0px',
          borderRightWidth: '20px'
        };
      }
    } else if (spaceOnRight) {
      // Tooltip is to the right, arrow points left
      return {
        top: '50%',
        left: '-20px',
        transform: 'translateY(-50%)',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'rgba(255,255,255,0.95)',
        borderRightColor: 'transparent',
        borderBottomWidth: '0px',
        borderTopWidth: '0px',
        borderLeftWidth: '20px',
        borderRightWidth: '0px'
      };
    } else if (spaceOnLeft) {
      // Tooltip is to the left, arrow points right
      return {
        top: '50%',
        left: '100%',
        transform: 'translateY(-50%)',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'rgba(255,255,255,0.95)',
        borderBottomWidth: '0px',
        borderTopWidth: '0px',
        borderLeftWidth: '0px',
        borderRightWidth: '20px'
      };
          } else if (spaceAbove && spaceBelow) {
        // If both above and below have space, choose the one with more room
        const aboveSpace = y;
        const belowSpace = mapHeight - y;
        if (aboveSpace > belowSpace) {
          // Tooltip is above, arrow points down
          return {
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderTopColor: 'transparent',
            borderBottomColor: 'rgba(255,255,255,0.95)',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomWidth: '12px',
            borderTopWidth: '0px',
            borderLeftWidth: '0px',
            borderRightWidth: '0px'
          };
        } else {
          // Tooltip is below, arrow points up
          return {
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            borderTopColor: 'rgba(255,255,255,0.95)',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomWidth: '0px',
            borderTopWidth: '20px',
            borderLeftWidth: '0px',
            borderRightWidth: '0px'
          };
        }
      } else if (spaceAbove) {
        // Tooltip is above, arrow points down
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderTopColor: 'transparent',
          borderBottomColor: 'rgba(255,255,255,0.95)',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomWidth: '20px',
          borderTopWidth: '0px',
          borderLeftWidth: '0px',
          borderRightWidth: '0px'
        };
      } else if (spaceBelow) {
        // Tooltip is below, arrow points up
        return {
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderTopColor: 'rgba(255,255,255,0.95)',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomWidth: '0px',
          borderTopWidth: '20px',
          borderLeftWidth: '0px',
          borderRightWidth: '0px'
        };
    } else {
      // Fallback: no arrow for corner positioning
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomWidth: '0px',
        borderTopWidth: '0px',
        borderLeftWidth: '0px',
        borderRightWidth: '0px'
      };
    }
  }

  return (
    <section id="travel" className="py-20 bg-gradient-to-b from-[#191A1A] to-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl sm:text-8xl font-bold italic mb-4" style={{ color: '#fff' }}>
            <em>travel</em>
          </h2>
        </div>
        <div className="relative">
          <div className="w-full h-[600px] rounded-lg border border-gray-700 overflow-hidden bg-[#181e2a] relative">
            <div className="absolute z-20 top-4 right-2 flex flex-col gap-2">
              <button
                className="bg-[#23272f] text-white px-3 py-1 rounded shadow hover:bg-[#2d3748] transition-all duration-300 ease-out flex items-center justify-center"
                onClick={() => {
                  const newZoom = Math.min(zoom * 1.5, 8);
                  setZoom(newZoom);
                }}
                style={{ pointerEvents: 'auto' }}
                title="Zoom In"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                className="bg-[#23272f] text-white px-3 py-1 rounded shadow hover:bg-[#2d3748] transition-all duration-300 ease-out flex items-center justify-center"
                onClick={() => {
                  const newZoom = Math.max(zoom / 1.5, 1);
                  setZoom(newZoom);
                }}
                style={{ pointerEvents: 'auto' }}
                title="Zoom Out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button
                className={`bg-[#23272f] text-white px-3 py-1 rounded shadow hover:bg-[#2d3748] transition-all duration-300 ease-out text-xs ${exo2.className}`}
                onClick={() => { 
                  setZoom(1); 
                  setCenter([0, 0]); 
                }}
                style={{ pointerEvents: 'auto' }}
                title="Reset View"
              >
                Reset
              </button>
            </div>
            <ComposableMap
              projectionConfig={{ scale: 160 }}
              width={1000}
              height={600}
              style={{ 
                width: "100%", 
                height: "100%"
              }}
            >
              <ZoomableGroup
                zoom={zoom}
                center={center}
                minZoom={1}
                maxZoom={8}
                onMoveEnd={({ zoom, coordinates }) => {
                  setZoom(zoom);
                  setCenter(coordinates);
                }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const code = getCountryCode(geo);
                      const isVisited = visitedCountries.hasOwnProperty(code);
                      
                      // Debug: log visited countries
                      if (isVisited) {
                        console.log(`Rendering visited country: ${code} - ${visitedCountries[code].name}`);
                      }
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={isVisited ? () => {
                            setHoveredCountry(code);
                            setHoveredCentroid(getCentroid(geo));
                          } : undefined}
                          onMouseLeave={isVisited ? () => {
                            setHoveredCountry(null);
                            setHoveredCentroid(null);
                          } : undefined}
                          onClick={() => {
                            handleCountryClick(code);
                          }}
                          style={{
                            default: {
                              fill: isVisited ? "#3B82F6" : "#1F2937",
                              outline: "none",
                              stroke: "#374151",
                              strokeWidth: 0.5,
                              transition: "fill 0.2s ease-out"
                            },
                            hover: {
                              fill: isVisited ? "#60A5FA" : "#1F2937",
                              outline: "none",
                              cursor: "pointer",
                              stroke: isVisited ? "#60A5FA" : "#374151",
                              strokeWidth: isVisited ? 1 : 0.5,
                              transition: "fill 0.2s ease-out, stroke 0.2s ease-out"
                            },
                            pressed: {
                              fill: isVisited ? "#60A5FA" : "#1F2937",
                              outline: "none"
                            }
                          }}
                          tabIndex={-1}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

          </div>
        </div>
        {/* Stats and Tooltip Section */}
        <div className="mt-12 flex flex-col lg:flex-row gap-8 items-start">
          {/* Country Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
            className="lg:w-80 flex-shrink-0 order-1 lg:order-1"
          >
            <div className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg rounded-2xl p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  key={`flag-${currentCountry}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-3xl"
                >
                  {visitedCountries[currentCountry] ? visitedCountries[currentCountry].flag : (countryData[currentCountry] ? countryData[currentCountry].flag : "🏳️")}
                </motion.span>
                <motion.h3
                  key={`name-${currentCountry}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`text-xl font-bold text-white ${barlow.className}`}
                  style={{ fontFamily: 'Barlow, sans-serif' }}
                >
                  {visitedCountries[currentCountry] ? visitedCountries[currentCountry].name : (countryData[currentCountry] ? countryData[currentCountry].name : "Unknown Country")}
                </motion.h3>
              </div>
              
              {/* Cities Section Header */}
              <div className="flex items-center justify-between mb-3">
                <h4 className={`text-base font-semibold text-white/80 ${exo2.className}`} style={{ fontFamily: 'Exo 2, sans-serif' }}>
                  {visitedCountries[currentCountry] ? "Cities Visited" : "Not Visited Yet"}
                </h4>
                {visitedCountries[currentCountry] && (
                  <button
                    onClick={() => setIsCitiesExpanded(!isCitiesExpanded)}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    <motion.div
                      animate={{ rotate: isCitiesExpanded ? 0 : -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </button>
                )}
              </div>
              
              {/* Cities or Not Visited Message */}
              <AnimatePresence>
                {visitedCountries[currentCountry] ? (
                  isCitiesExpanded && (
                    <motion.div
                      key={currentCountry}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="space-y-4 overflow-hidden"
                    >
                      {Object.entries(visitedCountries[currentCountry].cities).map(([cityName, dates], cityIndex) => (
                        <motion.div
                          key={cityIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: cityIndex * 0.2,
                            ease: "easeOut"
                          }}
                          className="space-y-2"
                        >
                          {/* City Name */}
                          <div className={`text-base font-semibold text-white ${exo2.className}`} style={{ fontFamily: 'Exo 2, sans-serif' }}>
                            {cityName}
                          </div>
                          
                          {/* Dates */}
                          <div className="ml-4 space-y-1">
                            {dates.map((date, dateIndex) => (
                              <motion.div
                                key={dateIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  duration: 0.3, 
                                  delay: cityIndex * 0.2 + (dateIndex + 1) * 0.1,
                                  ease: "easeOut"
                                }}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1.5 h-1.5 bg-white/60 rounded-full flex-shrink-0"></div>
                                <span className={`text-sm text-white/70 ${exo2.className}`} style={{ fontFamily: 'Exo 2, sans-serif' }}>
                                  {date.month} {date.year}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex items-center gap-2"
                  >
                    
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-row gap-4 order-2 lg:order-2 w-full"
          >
            {/* Countries Stat Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                height: isCitiesExpanded ? "320px" : "140px"
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.8, ease: "easeOut" },
                x: { duration: 0.6, delay: 0.8, ease: "easeOut" },
                height: { duration: 0.3, ease: "easeOut" }
              }}
              className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg rounded-2xl p-6 flex-1"
            >
                              <div className="text-center flex flex-col justify-center items-center h-full">
                  <AnimatedCounter 
                    value={Object.keys(visitedCountries).length}
                    color="#0266B1"
                    className={`text-7xl font-bold mb-4 ${exo2.className}`}
                  />
                  <div className={`text-white/70 text-2xl ${exo2.className}`} style={{ fontFamily: 'Exo 2, sans-serif' }}>Countries</div>
                </div>
            </motion.div>

            {/* Trips Stat Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                height: isCitiesExpanded ? "320px" : "140px"
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.9, ease: "easeOut" },
                x: { duration: 0.6, delay: 0.9, ease: "easeOut" },
                height: { duration: 0.3, ease: "easeOut" }
              }}
              className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg rounded-2xl p-6 flex-1"
            >
                              <div className="text-center flex flex-col justify-center items-center h-full">
                  <AnimatedCounter 
                    value={Object.values(visitedCountries).reduce((total, country) => 
                      total + Object.values(country.cities).reduce((cityTotal, dates) => cityTotal + dates.length, 0), 0
                    )}
                    color="#033E7A"
                    className={`text-7xl font-bold mb-4 ${exo2.className}`}
                  />
                  <div className={`text-white/70 text-2xl ${exo2.className}`} style={{ fontFamily: 'Exo 2, sans-serif' }}>Trips</div>
                </div>
            </motion.div>

            {/* Continents Stat Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                height: isCitiesExpanded ? "320px" : "140px"
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 1.0, ease: "easeOut" },
                x: { duration: 0.6, delay: 1.0, ease: "easeOut" },
                height: { duration: 0.3, ease: "easeOut" }
              }}
              className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg rounded-2xl p-6 flex-1"
            >
                              <div className="text-center flex flex-col justify-center items-center h-full">
                  <AnimatedCounter 
                    value={2}
                    color="#E22716"
                    className={`text-7xl font-bold mb-4 ${exo2.className}`}
                  />
                  <div className={`text-white/70 text-2xl ${exo2.className}`} style={{ fontFamily: 'Exo 2, sans-serif' }}>Continents</div>
                </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}       