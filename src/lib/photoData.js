// Add trips here
export const photoData = {
  "GBR-LONDON-2025": {
    tripInfo: {
      country: "United Kingdom",
      city: "London",
      year: "2025"
    },
    photos: [
      { id: 1, filename: "london2025/20250214_223143653_iOS.jpg", description: "London Night" },
      { id: 2, filename: "london2025/20250215_122033336_iOS.jpg", description: "London Sight" },
      { id: 3, filename: "london2025/20250215_124714861_iOS 1.jpg", description: "London Moment" },
      { id: 4, filename: "london2025/20250215_130539998_iOS 1.jpg", description: "London Scene" },
      { id: 5, filename: "london2025/20250215_140441639_iOS.jpg", description: "London View" },
      { id: 6, filename: "london2025/20250215_141957808_iOS.jpg", description: "London Street" },
      { id: 7, filename: "london2025/20250215_144018486_iOS 1.jpg", description: "London Architecture" },
      { id: 8, filename: "london2025/20250215_144256773_iOS 1.jpg", description: "London Landmark" },
      { id: 9, filename: "london2025/20250219_173616200_iOS.jpg", description: "London Moment" },
      { id: 10, filename: "london2025/20250219_174404950_iOS.jpg", description: "London View" },
      { id: 11, filename: "london2025/20250219_174549988_iOS.jpg", description: "London Scene" },
      { id: 12, filename: "london2025/20250219_175332010_iOS.jpg", description: "London Afternoon" },
      { id: 13, filename: "london2025/20250219_191359932_iOS.jpg", description: "London Evening" },
      { id: 14, filename: "london2025/20250220_121133872_iOS.jpg", description: "London Street" },
      { id: 15, filename: "london2025/20250220_132005056_iOS.jpg", description: "London View" },
      { id: 16, filename: "london2025/20250220_132053141_iOS.jpg", description: "London Sight" },
      { id: 17, filename: "london2025/20250220_133552895_iOS.jpg", description: "London Moment" },
      { id: 18, filename: "london2025/20250220_135514624_iOS.jpg", description: "London Scene" },
      { id: 19, filename: "london2025/20250220_144240868_iOS.jpg", description: "London Street" },
      { id: 20, filename: "london2025/20250220_144530520_iOS.jpg", description: "London View" },
      { id: 21, filename: "london2025/20250220_144555762_iOS.jpg", description: "London Landmark" },
      { id: 22, filename: "london2025/20250220_144616419_iOS.jpg", description: "London Cityscape" },
      { id: 23, filename: "london2025/20250220_144628053_iOS.jpg", description: "London Architecture" },
      { id: 24, filename: "london2025/20250220_155640331_iOS.jpg", description: "London Street Scene" }
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