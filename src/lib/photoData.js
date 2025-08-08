// Add trips here
export const photoData = {
  "GBR-LONDON-2025": {
    tripInfo: {
      country: "United Kingdom",
      city: "London",
      year: "2025"
    },
    photos: [
      { id: 1, filename: "test.png", description: "London" },
      { id: 2, filename: "alcatraz.jpg", description: "London" },
      { id: 3, filename: "fishermans-wharf.jpg", description: "London" },
      { id: 4, filename: "painted-ladies.jpg", description: "London" },
      { id: 5, filename: "chinatown.jpg", description: "London" },
      { id: 6, filename: "cable-car.jpg", description: "London" }
    ]
  },
  "USA-SAN_FRANCISCO-2024": {
    tripInfo: {
      country: "United States",
      city: "San Francisco",
      year: "2024"
    },
    photos: [
      { id: 1, filename: "test.png", description: "Golden Gate Bridge" },
      { id: 2, filename: "alcatraz.jpg", description: "Alcatraz Island" },
      { id: 3, filename: "fishermans-wharf.jpg", description: "Fisherman's Wharf" },
      { id: 4, filename: "painted-ladies.jpg", description: "Painted Ladies houses" },
      { id: 5, filename: "chinatown.jpg", description: "San Francisco Chinatown" },
      { id: 6, filename: "cable-car.jpg", description: "Cable car on Powell Street" }
    ]
  },

};

// Helper function to get trip identifier
export const getTripId = (countryCode, city, year) => {
  const cityKey = city.replace(/\s+/g, '_').toUpperCase();
  return `${countryCode}-${cityKey}-${year}`;
};

// Helper function to get photos for a specific trip
export const getTripPhotos = (countryCode, city, year) => {
  const tripId = getTripId(countryCode, city, year);
  return photoData[tripId] || null;
}; 