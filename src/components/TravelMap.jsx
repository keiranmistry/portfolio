"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { Barlow, Exo_2 } from 'next/font/google';
import { countryData, nameToCodeMap, idToCodeMap } from '../lib/countryData';
import Flag from 'react-flagkit';

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
const AnimatedCounter = ({ value, color, className, isVisible }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const duration = 2000;
    
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
    }, 800);
    
    return () => clearTimeout(timer);
  }, [value, isVisible]);

  return (
    <motion.div 
      className={className} 
      style={{ color }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.7, delay: isVisible ? 0.8 : 0 }}
    >
      {displayValue}
    </motion.div>
  );
};

const baseCountries = {
  "USA": {
    name: "United States",
    flag: "US",
    cities: {}
  },
  "FRA": {
    name: "France",
    flag: "FR",
    cities: {}
  },
  "CAN": {
    name: "Canada",
    flag: "CA",
    cities: {
      "Toronto": [
        { month: "Present", year: "2024" }
      ],
      "Vancouver": [
        { month: "Present", year: "2024" }
      ],
      "Calgary": [
        { month: "Present", year: "2024" }
      ],
      "Edmonton": [
        { month: "Present", year: "2024" }
      ],
      "Montreal": [
        { month: "Present", year: "2024" }
      ]
    }
  },
  "NZL": {
    name: "New Zealand",
    flag: "NZ",
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
  "MEX": {
    name: "Mexico",
    flag: "MX",
    cities: {}
  },
  "CUW": {
    name: "Curaçao",
    flag: "CW",
    cities: {}
  },
  "ABW": {
    name: "Aruba",
    flag: "AW",
    cities: {}
  },
  "DOM": {
    name: "Dominican Republic",
    flag: "DO",
    cities: {}
  },
  "PRI": {
    name: "Puerto Rico",
    flag: "PR",
    cities: {}
  },
  "JAM": {
    name: "Jamaica",
    flag: "JM",
    cities: {}
  },
  "GBR": {
    name: "United Kingdom",
    flag: "GB",
    cities: {}
  },
  "ESP": {
    name: "Spain",
    flag: "ES",
    cities: {}
  },
  "DEU": {
    name: "Germany",
    flag: "DE",
    cities: {}
  },
  "ARE": {
    name: "United Arab Emirates",
    flag: "AE",
    cities: {}
  },
  "HTI": {
    name: "Haiti",
    flag: "HT",
    cities: {}
  },
};

// Color options
const colorOptions = ["#0266B1", "#033E7A", "#E22716"];

// Function to get random color
const getRandomColor = () => {
  return colorOptions[Math.floor(Math.random() * colorOptions.length)];
};

// Custom Map Component
const CustomMap = ({ 
  visitedCountries, 
  hoveredCountry, 
  setHoveredCountry, 
  setHoveredCentroid, 
  handleCountryClick,
  zoom,
  center,
  projection,
  getCountryCode,
  getCentroid 
}) => {
  const [geographies, setGeographies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(geoUrl)
      .then(res => res.json())
      .then(geoData => {
        setGeographies(geoData.features || []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading map data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !geographies.length) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#181e2a]">
        <div className="text-white text-lg">Loading map...</div>
      </div>
    );
  }

  return (
    <svg
      width={1000}
      height={600}
      viewBox="0 0 1000 600"
      style={{ 
        width: "100%", 
        height: "100%"
      }}
    >
      <g transform={`translate(${center[0]}, ${center[1]}) scale(${zoom})`}>
        {geographies.map((geo) => {
          const code = getCountryCode(geo);
          const isVisited = visitedCountries.hasOwnProperty(code);
          
          return (
            <path
              key={geo.id}
              d={geoPath().projection(projection)(geo)}
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
                fill: isVisited ? visitedCountries[code].color : "#1F2937",
                stroke: "#374151",
                strokeWidth: 0.5,
                cursor: isVisited ? "pointer" : "default",
                transition: "fill 0.2s ease-out, stroke 0.2s ease-out"
              }}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default function TravelMap() {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [hoveredCentroid, setHoveredCentroid] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([500, 300]);
  const [isCitiesExpanded, setIsCitiesExpanded] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState("CAN");
  const [highlightedCountries, setHighlightedCountries] = useState(new Set());
  const mapContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [visitedCountries, setVisitedCountries] = useState({});
  const [isZooming, setIsZooming] = useState(false);

  // Initialize visited countries with random colors
  useEffect(() => {
    const countriesWithColors = {};
    Object.keys(baseCountries).forEach(countryCode => {
      countriesWithColors[countryCode] = {
        ...baseCountries[countryCode],
        color: getRandomColor()
      };
    });
    setVisitedCountries(countriesWithColors);
  }, []);

  // Intersection Observer for smooth animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
          controls.start('visible');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -200px 0px'
      }
    );

    const titleRef = document.querySelector('#travel-title');
    if (titleRef) {
      observer.observe(titleRef);
    }

    return () => {
      if (titleRef) {
        observer.unobserve(titleRef);
      }
    };
  }, [controls, hasAnimated]);

  // Set a random default country after visitedCountries is initialized
  useEffect(() => {
    if (Object.keys(visitedCountries).length > 0) {
      const countryCodes = Object.keys(visitedCountries);
      const randomCountry = countryCodes[Math.floor(Math.random() * countryCodes.length)];
      setDefaultCountry(randomCountry);
    }
  }, [visitedCountries]);

  // Use the default country when no country is hovered
  const currentCountry = hoveredCountry || defaultCountry;

  // Handle country click to set as default
  const handleCountryClick = (countryCode) => {
    setDefaultCountry(countryCode);
  };

  // Optimized zoom handlers with debouncing
  const handleZoomIn = () => {
    setIsZooming(true);
    const newZoom = Math.min(zoom * 1.5, 8);
    setZoom(newZoom);
    setTimeout(() => setIsZooming(false), 300);
  };

  const handleZoomOut = () => {
    setIsZooming(true);
    const newZoom = Math.max(zoom / 1.5, 1);
    setZoom(newZoom);
    setTimeout(() => setIsZooming(false), 300);
  };

  const handleReset = () => {
    setIsZooming(true);
    setZoom(1);
    setCenter([500, 300]);
    setTimeout(() => setIsZooming(false), 300);
  };

  // Animate countries in random order when component comes into view
  useEffect(() => {
    if (!isInView) return;
    
    const countryCodes = Object.keys(visitedCountries);
    const shuffledCountries = [...countryCodes].sort(() => Math.random() - 0.5);
    
    setHighlightedCountries(new Set());
    
    setTimeout(() => {
      shuffledCountries.forEach((countryCode, index) => {
        setTimeout(() => {
          setHighlightedCountries(prev => new Set([...prev, countryCode]));
        }, index * 150);
      });
    }, 600);
  }, [isInView]);

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
    const countryId = geo.id;
    const countryName = geo.properties.name || geo.properties.NAME || geo.properties.ADMIN || geo.properties.ADMIN0 || 'Unknown';
    
    let finalCode = nameToCodeMap[countryName];
    
    if (!finalCode) {
      finalCode = idToCodeMap[countryId];
    }
    
    return finalCode;
  }

  function getCentroid(geo) {
    const path = geoPath().projection(projection);
    return path.centroid(geo);
  }

  return (
    <section ref={sectionRef} id="travel" className="py-20 bg-gradient-to-b from-[#191A1A] to-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            id="travel-title"
            className="text-6xl sm:text-8xl font-bold italic mb-4" 
            style={{ color: '#fff' }}
            initial={{ x: -1000, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { x: 0, opacity: 1 }
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.1
            }}
          >
            <em>travel</em>
          </motion.h2>
        </div>
        <div className="relative">
          <motion.div 
            className="w-full h-[600px] rounded-lg border border-gray-700 overflow-hidden bg-[#181e2a] relative"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ 
              duration: 0.7, 
              ease: "easeOut",
              delay: 0.25
            }}
          >
            <div className="absolute z-20 top-4 right-2 flex flex-col gap-2">
              <button
                className={`text-white px-3 py-1 rounded shadow transition-all duration-300 ease-out flex items-center justify-center ${
                  isZooming ? 'bg-[#1a1a1a]' : 'bg-[#23272f] hover:bg-[#2d3748]'
                }`}
                onClick={handleZoomIn}
                style={{ pointerEvents: 'auto' }}
                title="Zoom In"
                disabled={isZooming}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                className={`text-white px-3 py-1 rounded shadow transition-all duration-300 ease-out flex items-center justify-center ${
                  isZooming ? 'bg-[#1a1a1a]' : 'bg-[#23272f] hover:bg-[#2d3748]'
                }`}
                onClick={handleZoomOut}
                style={{ pointerEvents: 'auto' }}
                title="Zoom Out"
                disabled={isZooming}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button
                className={`text-white px-3 py-1 rounded shadow transition-all duration-300 ease-out text-xs ${exo2.className} ${
                  isZooming ? 'bg-[#1a1a1a]' : 'bg-[#23272f] hover:bg-[#2d3748]'
                }`}
                onClick={handleReset}
                style={{ pointerEvents: 'auto' }}
                title="Reset View"
                disabled={isZooming}
              >
                Reset
              </button>
            </div>
            
            <div ref={mapContainerRef} className="w-full h-full">
              <CustomMap
                visitedCountries={visitedCountries}
                hoveredCountry={hoveredCountry}
                setHoveredCountry={setHoveredCountry}
                setHoveredCentroid={setHoveredCentroid}
                handleCountryClick={handleCountryClick}
                zoom={zoom}
                center={center}
                projection={projection}
                getCountryCode={getCountryCode}
                getCentroid={getCentroid}
              />
            </div>

          </motion.div>
        </div>
        {/* Stats and Tooltip Section */}
        <motion.div 
          className="mt-12 flex flex-col lg:flex-row gap-8 items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ 
            duration: 0.7, 
            ease: "easeOut",
            delay: 0.4
          }}
        >
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
            <div className="bg-white/10 border border-white/30 shadow-lg rounded-2xl p-6 h-[140px] flex flex-col justify-center">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  key={`flag-${currentCountry}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-3xl"
                >
                  {visitedCountries[currentCountry] ? (
                    <Flag country={visitedCountries[currentCountry].flag} size={32} />
                  ) : (
                    countryData[currentCountry] ? (
                      <Flag country={countryData[currentCountry].flag} size={32} />
                    ) : (
                      <span className="text-3xl">🏳️</span>
                    )
                  )}
                </motion.div>
                <motion.h3
                  key={`name-${currentCountry}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
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
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="space-y-4 overflow-hidden max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                    >
                      {Object.entries(visitedCountries[currentCountry].cities).map(([cityName, dates], cityIndex) => (
                        <motion.div
                          key={cityIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: cityIndex * 0.3,
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
                                  duration: 0.6, 
                                  delay: cityIndex * 0.3 + (dateIndex + 1) * 0.15,
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
                height: "140px"
              }}
              transition={{ 
                opacity: { duration: 0.7, delay: 0.6, ease: "easeOut" },
                x: { duration: 0.7, delay: 0.6, ease: "easeOut" }
              }}
              className="bg-white/10 border border-white/30 shadow-lg rounded-2xl p-6 flex-1"
            >
              <div className="text-center flex flex-col justify-center items-center h-full">
                <AnimatedCounter 
                  value={Object.keys(visitedCountries).length}
                  color="#0266B1"
                  className={`text-7xl font-bold mb-4 ${exo2.className}`}
                  isVisible={isInView}
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
                height: "140px"
              }}
              transition={{ 
                opacity: { duration: 0.7, delay: 0.7, ease: "easeOut" },
                x: { duration: 0.7, delay: 0.7, ease: "easeOut" }
              }}
              className="bg-white/10 border border-white/30 shadow-lg rounded-2xl p-6 flex-1"
            >
              <div className="text-center flex flex-col justify-center items-center h-full">
                <AnimatedCounter 
                  value={Object.values(visitedCountries).reduce((total, country) => 
                    total + Object.values(country.cities).reduce((cityTotal, dates) => cityTotal + dates.length, 0), 0
                  )}
                  color="#033E7A"
                  className={`text-7xl font-bold mb-4 ${exo2.className}`}
                  isVisible={isInView}
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
                height: "140px"
              }}
              transition={{ 
                opacity: { duration: 0.7, delay: 0.8, ease: "easeOut" },
                x: { duration: 0.7, delay: 0.8, ease: "easeOut" }
              }}
              className="bg-white/10 border border-white/30 shadow-lg rounded-2xl p-6 flex-1"
            >
              <div className="text-center flex flex-col justify-center items-center h-full">
                <AnimatedCounter 
                  value={2}
                  color="#E22716"
                  className={`text-7xl font-bold mb-4 ${exo2.className}`}
                  isVisible={isInView}
                />
                <div className={`text-white/70 text-2xl ${exo2.className}`} style={{ fontFamily: 'Exo 2, sans-serif' }}>Continents</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}       