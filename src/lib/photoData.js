// Photo data organized by trip identifiers
export const photoData = {
  // USA Trips
  "USA-NEW_YORK-2024-PRESENT": {
    tripInfo: {
      country: "United States",
      city: "New York",
      month: "Present",
      year: "2024"
    },
    photos: [
      { id: 1, filename: "nyc-skyline.jpg", description: "Manhattan skyline from Brooklyn Bridge" },
      { id: 2, filename: "times-square.jpg", description: "Times Square at night" },
      { id: 3, filename: "central-park.jpg", description: "Central Park autumn colors" },
      { id: 4, filename: "statue-liberty.jpg", description: "Statue of Liberty" },
      { id: 5, filename: "brooklyn-bridge.jpg", description: "Walking across Brooklyn Bridge" },
      { id: 6, filename: "empire-state.jpg", description: "Empire State Building view" }
    ]
  },
  "USA-LOS_ANGELES-2023-DEC": {
    tripInfo: {
      country: "United States",
      city: "Los Angeles",
      month: "Dec",
      year: "2023"
    },
    photos: [
      { id: 1, filename: "hollywood-sign.jpg", description: "Hollywood sign from Griffith Observatory" },
      { id: 2, filename: "venice-beach.jpg", description: "Venice Beach boardwalk" },
      { id: 3, filename: "santa-monica.jpg", description: "Santa Monica Pier sunset" },
      { id: 4, filename: "downtown-la.jpg", description: "Downtown LA skyline" },
      { id: 5, filename: "getty-center.jpg", description: "Getty Center architecture" },
      { id: 6, filename: "malibu-coast.jpg", description: "Malibu coastline" }
    ]
  },
  "USA-SAN_FRANCISCO-2023-NOV": {
    tripInfo: {
      country: "United States",
      city: "San Francisco",
      month: "Nov",
      year: "2023"
    },
    photos: [
      { id: 1, filename: "golden-gate.jpg", description: "Golden Gate Bridge" },
      { id: 2, filename: "alcatraz.jpg", description: "Alcatraz Island" },
      { id: 3, filename: "fishermans-wharf.jpg", description: "Fisherman's Wharf" },
      { id: 4, filename: "painted-ladies.jpg", description: "Painted Ladies houses" },
      { id: 5, filename: "chinatown.jpg", description: "San Francisco Chinatown" },
      { id: 6, filename: "cable-car.jpg", description: "Cable car on Powell Street" }
    ]
  },
};

// Helper function to get trip identifier
export const getTripId = (countryCode, city, month, year) => {
  const cityKey = city.replace(/\s+/g, '_').toUpperCase();
  const monthKey = month === "Present" ? "PRESENT" : month.toUpperCase();
  return `${countryCode}-${cityKey}-${year}-${monthKey}`;
};

// Helper function to get photos for a specific trip
export const getTripPhotos = (countryCode, city, month, year) => {
  const tripId = getTripId(countryCode, city, month, year);
  return photoData[tripId] || null;
}; 