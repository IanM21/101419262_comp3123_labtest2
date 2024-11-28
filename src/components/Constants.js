export const API_KEY = process.env.REACT_APP_API_KEY;

// Function to generate icon URL
export const getIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Function to generate API URL
export const getWeatherUrl = (city) => {
    return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
};

