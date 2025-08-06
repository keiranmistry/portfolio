// Travel data structure for the travel map component
export const travelData = {
  "USA": {
    name: "United States",
    flag: "US",
    cities: {
      "New York": [
        { month: "Present", year: "2024" }
      ],
      "Los Angeles": [
        { month: "Dec", year: "2023" }
      ],
      "San Francisco": [
        { month: "Nov", year: "2023" }
      ]
    }
  },
  "FRA": {
    name: "France",
    flag: "FR",
    cities: {
      "Paris": [
        { month: "Present", year: "2024" }
      ],
      "Lyon": [
        { month: "Oct", year: "2023" }
      ],
      "Marseille": [
        { month: "Sep", year: "2023" }
      ]
    }
  },
  "CAN": {
    name: "Canada",
    flag: "CA",
    cities: {
      "Toronto": [
        { month: "Present", year: "2024" },
        { month: "Dec", year: "2023" }
      ],
      "Vancouver": [
        { month: "Present", year: "2024" },
        { month: "Aug", year: "2023" }
      ],
      "Calgary": [
        { month: "Present", year: "2024" },
        { month: "Jun", year: "2023" }
      ],
      "Edmonton": [
        { month: "Present", year: "2024" },
        { month: "Apr", year: "2023" }
      ],
      "Montreal": [
        { month: "Present", year: "2024" },
        { month: "Mar", year: "2023" }
      ],
      "Ottawa": [
        { month: "Feb", year: "2023" }
      ],
      "Quebec City": [
        { month: "Jan", year: "2023" }
      ],
      "Halifax": [
        { month: "Dec", year: "2022" }
      ],
      "Winnipeg": [
        { month: "Nov", year: "2022" }
      ],
      "Saskatoon": [
        { month: "Oct", year: "2022" }
      ],
      "Victoria": [
        { month: "Sep", year: "2022" }
      ],
      "St. John's": [
        { month: "Aug", year: "2022" }
      ]
    }
  },
  "NZL": {
    name: "New Zealand",
    flag: "NZ",
    cities: {
      "Auckland": [
        { month: "Jan", year: "2023" },
        { month: "Dec", year: "2022" }
      ],
      "Wellington": [
        { month: "Jan", year: "2023" },
        { month: "Nov", year: "2022" }
      ],
      "Queenstown": [
        { month: "Jan", year: "2023" },
        { month: "Oct", year: "2022" }
      ],
      "Christchurch": [
        { month: "Dec", year: "2022" }
      ],
      "Rotorua": [
        { month: "Nov", year: "2022" }
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
  }
};

// Color options for country highlighting
export const colorOptions = ["#0266B1", "#033E7A", "#E22716"];

// Function to get random color for country highlighting
export const getRandomColor = () => {
  return colorOptions[Math.floor(Math.random() * colorOptions.length)];
};

// Function to get total number of countries visited
export const getTotalCountries = () => {
  return Object.keys(travelData).length;
};

// Function to get total number of trips
export const getTotalTrips = () => {
  return Object.values(travelData).reduce((total, country) => 
    total + Object.values(country.cities).reduce((cityTotal, dates) => cityTotal + dates.length, 0), 0
  );
};

// Function to get total number of continents visited
export const getTotalContinents = () => {
  // This is a simplified calculation - you might want to add continent data
  return 2; // North America and Oceania based on current data
};

// Function to get countries with cities (visited countries)
export const getVisitedCountries = () => {
  const visited = {};
  Object.keys(travelData).forEach(countryCode => {
    if (Object.keys(travelData[countryCode].cities).length > 0) {
      visited[countryCode] = {
        ...travelData[countryCode],
        color: getRandomColor()
      };
    }
  });
  return visited;
};

// Function to get all countries with random colors
export const getAllCountriesWithColors = () => {
  const countriesWithColors = {};
  Object.keys(travelData).forEach(countryCode => {
    countriesWithColors[countryCode] = {
      ...travelData[countryCode],
      color: getRandomColor()
    };
  });
  return countriesWithColors;
}; 