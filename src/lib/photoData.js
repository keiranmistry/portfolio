// Add trips here
export const photoData = {
  "USA-SAN_FRANCISCO-2023-NOV": {
    tripInfo: {
      country: "United States",
      city: "San Francisco",
      month: "Nov",
      year: "2023"
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