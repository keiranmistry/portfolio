"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { AnimatePresence, motion, animate } from "framer-motion";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { nameToCodeMap, idToCodeMap } from "@/lib/countryData";
import {
  travelData,
  getTripCount,
  getTotalCountries,
  getTotalTrips,
  getTotalContinents,
} from "@/lib/travelData";
import Flag from "react-flagkit";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;

function getCountryCode(geo) {
  const countryId = geo.id;
  const countryName =
    geo.properties.name || geo.properties.NAME || geo.properties.ADMIN || "Unknown";
  return nameToCodeMap[countryName] || idToCodeMap[countryId];
}

function ZoomButton({ onClick, label, children }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 450, damping: 22 }}
      className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card/80 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:text-foreground hover:shadow-[0_0_10px_-2px_var(--primary)]"
    >
      {children}
    </motion.button>
  );
}

export default function TravelMap() {
  const [selectedCode, setSelectedCode] = useState(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const didDrag = useRef(false);
  const positionRef = useRef(position);
  const zoomAnimation = useRef(null);
  positionRef.current = position;

  // Sequential single-hue ramp (brand primary) keyed by trip count — magnitude,
  // not identity, so the fill actually encodes something instead of cycling colors.
  const visitedCountries = useMemo(() => {
    const codes = Object.keys(travelData);
    const tripCounts = codes.map(getTripCount);
    const maxTrips = Math.max(...tripCounts, 1);
    return codes.reduce((acc, code, i) => {
      const trips = tripCounts[i];
      const intensity = maxTrips > 1 ? 0.35 + 0.65 * ((trips - 1) / (maxTrips - 1)) : 1;
      acc[code] = {
        ...travelData[code],
        trips,
        fill: `color-mix(in oklch, var(--primary) ${Math.round(intensity * 100)}%, var(--background))`,
      };
      return acc;
    }, {});
  }, []);

  const stats = useMemo(
    () => [
      { label: "Countries", value: getTotalCountries() },
      { label: "Trips", value: getTotalTrips() },
      { label: "Continents", value: getTotalContinents() },
    ],
    []
  );

  const handleCountryClick = useCallback((code) => {
    if (didDrag.current) return; // ignore the click that ends a pan drag
    if (!code || !travelData[code]) return;
    setSelectedCode((prev) => (prev === code ? null : code));
  }, []);

  // Smoothly tween zoom/center rather than snapping — the map's own gesture
  // handling (wheel/drag) stays instant; only these programmatic jumps ease.
  const animatePositionTo = useCallback((target) => {
    zoomAnimation.current?.stop();
    const start = positionRef.current;
    zoomAnimation.current = animate(0, 1, {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (t) => {
        setPosition({
          zoom: start.zoom + (target.zoom - start.zoom) * t,
          coordinates: [
            start.coordinates[0] + (target.coordinates[0] - start.coordinates[0]) * t,
            start.coordinates[1] + (target.coordinates[1] - start.coordinates[1]) * t,
          ],
        });
      },
    });
  }, []);

  const handleZoomIn = useCallback(() => {
    const pos = positionRef.current;
    animatePositionTo({ ...pos, zoom: Math.min(pos.zoom * 1.6, MAX_ZOOM) });
  }, [animatePositionTo]);

  const handleZoomOut = useCallback(() => {
    const pos = positionRef.current;
    animatePositionTo({ ...pos, zoom: Math.max(pos.zoom / 1.6, MIN_ZOOM) });
  }, [animatePositionTo]);

  const handleReset = useCallback(() => {
    animatePositionTo({ coordinates: [0, 0], zoom: 1 });
  }, [animatePositionTo]);

  const selected = selectedCode ? visitedCountries[selectedCode] : null;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <span className="font-mono text-primary/70">//</span> Places I&rsquo;ve Been
      </h2>

      <div
        className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-border"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklch, var(--foreground) 12%, transparent) 1px, transparent 1px), radial-gradient(650px circle at 50% 42%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%)",
          backgroundSize: "18px 18px, auto",
          backgroundPosition: "center, center",
          backgroundColor: "var(--secondary)",
        }}
      >
        <ComposableMap
          projectionConfig={{ scale: 155 }}
          width={980}
          height={551}
          style={{ width: "100%", height: "100%", cursor: "grab" }}
        >
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            minZoom={MIN_ZOOM}
            maxZoom={MAX_ZOOM}
            onMoveStart={() => {
              didDrag.current = false;
            }}
            onMove={() => {
              didDrag.current = true;
            }}
            onMoveEnd={(pos) => {
              setPosition(pos);
              // Let the click handler see the flag on this same tick, then clear it.
              setTimeout(() => {
                didDrag.current = false;
              }, 0);
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const code = getCountryCode(geo);
                  const isVisited = Boolean(visitedCountries[code]);
                  const isSelected = code === selectedCode;
                  const fill = isVisited ? visitedCountries[code].fill : "var(--muted)";
                  const transition =
                    "fill 0.25s ease-out, stroke 0.2s ease-out, stroke-width 0.2s ease-out, filter 0.2s ease-out";

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleCountryClick(code)}
                      tabIndex={isVisited ? 0 : -1}
                      role={isVisited ? "button" : undefined}
                      aria-label={isVisited ? visitedCountries[code].name : undefined}
                      style={{
                        default: {
                          fill,
                          outline: "none",
                          stroke: isSelected ? "var(--primary)" : "var(--border)",
                          strokeWidth: (isSelected ? 1.3 : isVisited ? 0.6 : 0.4) / position.zoom,
                          filter: isSelected ? "drop-shadow(0 0 5px var(--primary))" : "none",
                          animation: isSelected ? "map-pulse-glow 2s ease-in-out infinite" : "none",
                          transition,
                        },
                        hover: {
                          fill,
                          outline: "none",
                          cursor: isVisited ? "pointer" : "default",
                          stroke: isVisited ? "var(--primary)" : "var(--border)",
                          strokeWidth: (isVisited ? 1.3 : 0.4) / position.zoom,
                          filter: isVisited ? "drop-shadow(0 0 4px var(--primary))" : "none",
                          transition,
                        },
                        pressed: {
                          fill,
                          outline: "none",
                          transition,
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        <div className="absolute right-2 top-2 flex flex-col gap-1.5">
          <ZoomButton onClick={handleZoomIn} label="Zoom in">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </ZoomButton>
          <ZoomButton onClick={handleZoomOut} label="Zoom out">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12h15" />
            </svg>
          </ZoomButton>
          <ZoomButton onClick={handleReset} label="Reset view">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </ZoomButton>
        </div>

        <div className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-2.5 py-1 text-[10px] text-muted-foreground backdrop-blur-sm">
          <span>Fewer trips</span>
          <span className="flex h-2 w-10 overflow-hidden rounded-full">
            <span className="flex-1" style={{ background: "color-mix(in oklch, var(--primary) 35%, var(--background))" }} />
            <span className="flex-1" style={{ background: "color-mix(in oklch, var(--primary) 65%, var(--background))" }} />
            <span className="flex-1" style={{ background: "var(--primary)" }} />
          </span>
          <span>More</span>
        </div>
      </div>

      {/* Fixed-height, absolutely-positioned crossfade — the map above never
          resizes when switching between countries with different city counts. */}
      <div className="relative mt-3 h-[104px] flex-shrink-0">
        <AnimatePresence initial={false}>
          {selected ? (
            <motion.div
              key={selectedCode}
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-accent/50 to-secondary/40 p-3 shadow-[0_0_16px_-6px_var(--primary)]"
            >
              <div className="flex flex-shrink-0 items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <Flag country={selected.flag} size={20} />
                  <span className="truncate text-sm font-semibold text-foreground">
                    {selected.name}
                  </span>
                  <span className="flex-shrink-0 rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary">
                    {selected.trips} {selected.trips === 1 ? "trip" : "trips"}
                  </span>
                </div>
                <motion.button
                  onClick={() => setSelectedCode(null)}
                  aria-label="Close country details"
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 450, damping: 20 }}
                  className="flex-shrink-0 cursor-pointer text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              <div className="mt-2 flex min-h-0 flex-1 flex-wrap content-start gap-1.5 overflow-y-auto custom-scrollbar">
                {Object.entries(selected.cities).map(([city, visits]) => (
                  <span
                    key={city}
                    className="rounded-full bg-background px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {city} · {visits.map((v) => v.year).join(", ")}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 grid grid-cols-3 gap-2"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center rounded-xl border border-border bg-gradient-to-br from-accent/40 to-secondary/40 text-center transition-transform duration-200 hover:scale-[1.03]"
                >
                  <div className="font-mono text-xl font-bold text-primary">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
