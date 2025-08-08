// Travel data structure for the travel map component
export const travelData = {
  "ABW": {
    name: "Aruba",
    flag: "AW",
    cities: {
      "Oranjestad": [
        { year: "2023" }
      ]
    }
  },
  "CAN": {
    name: "Canada",
    flag: "CA",
    cities: {
      "Calgary": [
        { year: "2017" },
        { year: "2023" },
        { year: "2024" }
      ],
      "Montreal": [
        { year: "2011" }
      ],
      "Toronto": [
        { year: "2008" }
      ],
      "Vancouver": [
        { year: "2019" },
        { year: "2023" }
      ]
    }
  },
  "CYP": {
    name: "Cyprus",
    flag: "CY",
    cities: {
      "Paphos": [
        { year: "2008" }
      ]
    }
  },
  "CUW": {
    name: "Curaçao",
    flag: "CW",
    cities: {
      "Willemstad": [
        { year: "2023" }
      ]
    }
  },
  "DOM": {
    name: "Dominican Republic",
    flag: "DO",
    cities: {
      "Santa Domingo": [
        { year: "2016" }
      ]
    }
  },
  "ESP": {
    name: "Spain",
    flag: "ES",
    cities: {
      "Alicante": [
        { year: "2008" }
      ],
      "Lanzarote": [
        { year: "2007" }
      ],
      "Malaga": [
        { year: "2014" }
      ],
      "Marbella": [
        { year: "2014" }
      ]
    }
  },
  "FRA": {
    name: "France",
    flag: "FR",
    cities: {
      "Paris": [
        { year: "2009" },
        { year: "2022" }
      ]
    }
  },
  "GBR": {
    name: "United Kingdom",
    flag: "GB",
    cities: {
      "London": [
        { year: "2012" },
        { year: "2014" },
        { year: "2016" },
        { year: "2022" },
        { year: "2025" }
      ],
      "Manchester": [
        { year: "2010" }
      ]
    }
  },
  "HTI": {
    name: "Haiti",
    flag: "HT",
    cities: {
      "Labadee": [
        { year: "2023" }
      ]
    }
  },
  "JAM": {
    name: "Jamaica",
    flag: "JM",
    cities: {
      "Montego Bay": [
        { year: "2013" }
      ]
    }
  },
  "MEX": {
    name: "Mexico",
    flag: "MX",
    cities: {
      "Cancun": [
        { year: "2024" }
      ],
      "Cozumel": [
        { year: "2014" }
      ]
    }
  },
  "NZL": {
    name: "New Zealand",
    flag: "NZ",
    cities: {
      "Auckland": [
        { year: "2019" }
      ]
    }
  },
  "PRI": {
    name: "Puerto Rico",
    flag: "PR",
    cities: {
      "San Juan": [
        { year: "2017" }
      ]
    }
  },
  "TCA": {
    name: "Turks and Caicos",
    flag: "TC",
    cities: {
      "Grand Turks": [
        { year: "2017" }
      ]
    }
  },
  "USA": {
    name: "United States",
    flag: "US",
    cities: {
      "Atlanta": [
        { year: "2023" }
      ],
      "Charlotte": [
        { year: "2023" }
      ],
      "Chicago": [
        { year: "2019" }
      ],
      "New York": [
        { year: "2012" },
        { year: "2013" },
        { year: "2023" }
      ],
      "Orlando": [
        { year: "2014" },
        { year: "2018" },
        { year: "2022" },
        { year: "2023" }
      ],
      "Philadelphia": [
        { year: "2012" }
      ],
      "San Francisco": [
        { year: "2024" }
      ]
    }
  },
  "VGB": {
    name: "US Virgin Islands",
    flag: "VG",
    cities: {
      "St Thomas": [
        { year: "2017" }
      ]
    }
  },
  "ARE": {
    name: "United Arab Emirates",
    flag: "AE",
    cities: {
      "Dubai": [
        { year: "2009" }
      ]
    }
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
  // Based on the countries visited: North America, Europe, Asia, Oceania
  return 4;
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