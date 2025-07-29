"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoMercator, geoPath } from "d3-geo";
import { Barlow, Exo_2 } from 'next/font/google';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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
  }
};

export default function TravelMap() {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredCentroid, setHoveredCentroid] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 0]);
  const mapContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });

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
    
    // Map numeric IDs to our country codes
    const idToCodeMap = {
      "840": "USA", // United States
      "124": "CAN", // Canada  
      "554": "NZL"  // New Zealand
    };
    
    const finalCode = idToCodeMap[countryId];
    
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
    const tooltipWidth = 280;
    const tooltipHeight = 120;
    
    // Adjust for zoom level - tooltip should scale with zoom
    const zoomFactor = Math.max(0.5, Math.min(2, 1 / currentZoom));
    const adjustedTooltipWidth = tooltipWidth * zoomFactor;
    const adjustedTooltipHeight = tooltipHeight * zoomFactor;
    
    // Calculate available space considering zoom and pan
    const spaceOnRight = x + adjustedTooltipWidth / 2 < mapWidth;
    const spaceOnLeft = x - adjustedTooltipWidth / 2 > 0;
    const spaceAbove = y - adjustedTooltipHeight / 2 > 0;
    const spaceBelow = y + adjustedTooltipHeight / 2 < mapHeight;
    
    let translateX = '-50%';
    let translateY = '-50%';
    
    // Always prefer side positioning to avoid covering the country
    if (spaceOnRight) {
      // Position to the right of the country
      translateX = `${30 * zoomFactor}px`;
      translateY = '-50%';
    } else if (spaceOnLeft) {
      // Position to the left of the country
      translateX = `-${adjustedTooltipWidth + 10 * zoomFactor}px`;
      translateY = '-50%';
    } else if (spaceAbove) {
      // Position above the country
      translateX = '-50%';
      translateY = `-${adjustedTooltipHeight + 10 * zoomFactor}px`;
    } else if (spaceBelow) {
      // Position below the country
      translateX = '-50%';
      translateY = `${30 * zoomFactor}px`;
    } else {
      // Fallback to center if no space available
      translateX = '-50%';
      translateY = '-50%';
    }
    
    return `translate(${translateX}, ${translateY})`;
  }

  function getArrowPosition(x, y, currentZoom) {
    const mapWidth = 1000;
    const tooltipWidth = 280;
    
    // Adjust for zoom level
    const zoomFactor = Math.max(0.5, Math.min(2, 1 / currentZoom));
    const adjustedTooltipWidth = tooltipWidth * zoomFactor;
    
    // Determine arrow position based on tooltip placement
    const spaceOnRight = x + adjustedTooltipWidth / 2 < mapWidth;
    const spaceOnLeft = x - adjustedTooltipWidth / 2 > 0;
    
    if (spaceOnRight) {
      // Tooltip is to the right, arrow points left
      return {
        top: '50%',
        left: '-8px',
        transform: 'translateY(-50%)',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'rgba(255,255,255,0.95)',
        borderRightColor: 'transparent',
        borderBottomWidth: '0px',
        borderTopWidth: '0px',
        borderLeftWidth: '8px',
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
        borderRightWidth: '8px'
      };
    } else {
      // Tooltip is above/below, arrow points up/down
      const isAbove = getTooltipTransform(x, y).includes('-100%');
      return {
        top: isAbove ? '100%' : '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderTopColor: isAbove ? 'transparent' : 'rgba(255,255,255,0.95)',
        borderBottomColor: isAbove ? 'rgba(255,255,255,0.95)' : 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomWidth: isAbove ? '8px' : '0px',
        borderTopWidth: isAbove ? '0px' : '8px',
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
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Exploring the world, one country at a time
          </p>
        </div>
        <div className="relative">
          <div className="w-full h-[600px] rounded-lg border border-gray-700 overflow-hidden bg-[#181e2a] relative">
            <div className="absolute z-20 top-4 right-4 flex flex-col gap-2">
              <button
                className="bg-[#23272f] text-white w-8 h-8 rounded shadow hover:bg-[#2d3748] transition-all duration-300 ease-out flex items-center justify-center"
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
                className="bg-[#23272f] text-white w-8 h-8 rounded shadow hover:bg-[#2d3748] transition-all duration-300 ease-out flex items-center justify-center"
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
                className="bg-[#23272f] text-white px-3 py-1 rounded shadow hover:bg-[#2d3748] transition-all duration-300 ease-out text-xs"
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
              style={{ width: "100%", height: "100%" }}
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
                style={{
                  transition: 'transform 0.3s ease-out'
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
                              cursor: isVisited ? "pointer" : "default",
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
            {/* Modern Tooltip */}
            <AnimatePresence>
              {hoveredCountry && hoveredCentroid && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ 
                    duration: 0.2,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }}
                  className="absolute pointer-events-none z-50"
                  style={{
                    left: hoveredCentroid[0],
                    top: hoveredCentroid[1],
                    transform: getTooltipTransform(hoveredCentroid[0], hoveredCentroid[1], zoom, center)
                  }}
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 p-4 min-w-[280px]">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{visitedCountries[hoveredCountry].flag}</span>
                      <h3 className={`text-lg font-bold text-gray-900 ${barlow.className}`} style={{ fontFamily: 'Barlow, sans-serif' }}>
                        {visitedCountries[hoveredCountry].name}
                      </h3>
                    </div>
                    
                    {/* Cities */}
                    <div className="space-y-3">
                      {Object.entries(visitedCountries[hoveredCountry].cities).map(([cityName, dates], cityIndex) => (
                        <motion.div
                          key={cityIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: cityIndex * 0.3,
                            ease: "easeOut"
                          }}
                          className="space-y-1"
                        >
                          {/* City Name */}
                          <div className={`text-sm font-semibold text-gray-800 ${exo2.className}`} style={{ fontFamily: 'Exo 2, sans-serif' }}>
                            {cityName}
                          </div>
                          
                          {/* Dates */}
                          <div className="ml-3 space-y-1">
                            {dates.map((date, dateIndex) => (
                              <motion.div
                                key={dateIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  duration: 0.3, 
                                  delay: cityIndex * 0.3 + (dateIndex + 1) * 0.1,
                                  ease: "easeOut"
                                }}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></div>
                                <span className={`text-xs text-gray-600 ${exo2.className}`} style={{ fontFamily: 'Exo 2, sans-serif' }}>
                                  {date.month} {date.year}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Dynamic Arrow */}
                    <div 
                      className="absolute"
                      style={{
                        top: getArrowPosition(hoveredCentroid[0], hoveredCentroid[1], zoom).top,
                        left: getArrowPosition(hoveredCentroid[0], hoveredCentroid[1], zoom).left,
                        transform: getArrowPosition(hoveredCentroid[0], hoveredCentroid[1], zoom).transform
                      }}
                    >
                      <div 
                        className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent"
                        style={{
                          borderTopColor: getArrowPosition(hoveredCentroid[0], hoveredCentroid[1], zoom).borderTopColor,
                          borderBottomColor: getArrowPosition(hoveredCentroid[0], hoveredCentroid[1], zoom).borderBottomColor,
                          borderLeftColor: getArrowPosition(hoveredCentroid[0], hoveredCentroid[1], zoom).borderLeftColor,
                          borderRightColor: getArrowPosition(hoveredCentroid[0], hoveredCentroid[1], zoom).borderRightColor,
                          borderBottomWidth: getArrowPosition(hoveredCentroid[0], hoveredCentroid[1], zoom).borderBottomWidth,
                          borderTopWidth: getArrowPosition(hoveredCentroid[0], hoveredCentroid[1], zoom).borderTopWidth,
                          borderLeftWidth: getArrowPosition(hoveredCentroid[0], hoveredCentroid[1], zoom).borderLeftWidth,
                          borderRightWidth: getArrowPosition(hoveredCentroid[0], hoveredCentroid[1], zoom).borderRightWidth
                        }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-[#3B82F6] mb-2">
              {Object.keys(visitedCountries).length}
            </div>
            <div className="text-gray-400">Countries Visited</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#3B82F6] mb-2">
              {Object.values(visitedCountries).reduce((total, country) => 
                total + Object.values(country.cities).reduce((cityTotal, dates) => cityTotal + dates.length, 0), 0
              )}
            </div>
            <div className="text-gray-400">Total Visits</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#3B82F6] mb-2">
              2
            </div>
            <div className="text-gray-400">Continents Explored</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}       