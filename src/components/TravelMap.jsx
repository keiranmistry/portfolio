"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoMercator, geoPath } from "d3-geo";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const visitedCountries = {
  "US": {
    name: "United States",
    flag: "🇺🇸",
    visits: [
      { month: "December", year: "2023" },
      { month: "July", year: "2022" }
    ]
  },
  "CA": {
    name: "Canada",
    flag: "🇨🇦",
    visits: [
      { month: "Present", year: "2024" }
    ]
  },
  "ES": {
    name: "Spain",
    flag: "🇪🇸",
    visits: [
      { month: "August", year: "2023" }
    ]
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
    // Try ISO_A2, then ISO_A3, then NAME
    return geo.properties.ISO_A2 || geo.properties.ISO_A3 || geo.properties.NAME;
  }

  function getCentroid(geo) {
    const path = geoPath().projection(projection);
    return path.centroid(geo);
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
            <button
              className="absolute z-20 top-4 right-4 bg-[#23272f] text-white px-3 py-1 rounded shadow hover:bg-[#2d3748] transition"
              onClick={() => { setZoom(1); setCenter([0, 0]); }}
              style={{ pointerEvents: 'auto' }}
            >
              Reset
            </button>
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
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const code = getCountryCode(geo);
                      const isVisited = visitedCountries.hasOwnProperty(code);
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
                              fill: isVisited ? "#A2D6F9" : "#23272f",
                              outline: "none",
                              stroke: "#222a36",
                              strokeWidth: 0.5,
                              transition: "fill 0.2s, transform 0.2s"
                            },
                            hover: {
                              fill: isVisited ? "#4FC3F7" : "#23272f",
                              outline: "none",
                              cursor: isVisited ? "pointer" : "default",
                              transform: isVisited ? "scale(1.08)" : undefined,
                              filter: isVisited ? "drop-shadow(0 0 8px #4FC3F7)" : undefined,
                              zIndex: 10
                            },
                            pressed: {
                              fill: isVisited ? "#4FC3F7" : "#23272f",
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
            {/* Tooltip (Speech Bubble) as SVG overlay */}
            <svg className="pointer-events-none absolute top-0 left-0 w-full h-full" width={1000} height={600} style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}>
              <AnimatePresence>
                {hoveredCountry && hoveredCentroid && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* SVG-native tooltip for compatibility */}
                    <g>
                      <rect x={hoveredCentroid[0] - 90} y={hoveredCentroid[1] - 80} width={180} height={60} rx={12} fill="#fff" stroke="#e5e7eb" strokeWidth={1} />
                      <text x={hoveredCentroid[0]} y={hoveredCentroid[1] - 60} textAnchor="middle" fontSize="22" fontFamily="sans-serif">
                        {visitedCountries[hoveredCountry].flag}
                      </text>
                      <text x={hoveredCentroid[0]} y={hoveredCentroid[1] - 38} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#222">
                        {visitedCountries[hoveredCountry].name}
                      </text>
                      {visitedCountries[hoveredCountry].visits.map((visit, i) => (
                        <text key={i} x={hoveredCentroid[0]} y={hoveredCentroid[1] - 18 + i * 16} textAnchor="middle" fontSize="13" fill="#555">
                          {visit.month} {visit.year}
                        </text>
                      ))}
                      {/* Speech bubble tail */}
                      <polygon points={
                        `${hoveredCentroid[0]},${hoveredCentroid[1]-20} ` +
                        `${hoveredCentroid[0]-10},${hoveredCentroid[1]-8} ` +
                        `${hoveredCentroid[0]+10},${hoveredCentroid[1]-8}`
                      } fill="#fff" stroke="#e5e7eb" strokeWidth={1} />
                    </g>
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
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
            <div className="text-4xl font-bold text-[#A2D6F9] mb-2">
              {Object.keys(visitedCountries).length}
            </div>
            <div className="text-gray-400">Countries Visited</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#A2D6F9] mb-2">
              {Object.values(visitedCountries).reduce((total, country) => total + country.visits.length, 0)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#A2D6F9] mb-2">
              3
            </div>
            <div className="text-gray-400">Continents Explored</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}       