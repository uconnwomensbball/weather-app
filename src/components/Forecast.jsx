import { useEffect, useState } from "react"
import { fetchWeatherApi } from "openmeteo";

export default function Forecast(){
    const [weatherData, setWeatherData] = useState([])
    
//https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json
    async function getWeather(){

        const params = {
            latitude: 52.52,
            longitude: 13.41,
            daily: ["temperature_2m_max", "temperature_2m_min"],
            hourly: "temperature_2m",
            current: "temperature_2m",
    }
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const current = response.current();
const hourly = response.hourly();
const daily = response.daily();

// Note: The order of weather variables in the URL query and the indices below need to match!
const ApiWeatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature_2m: current.variables(0).value(),
	},
	hourly: {
		time: Array.from(
			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0).valuesArray(),
	},
	daily: {
		time: Array.from(
			{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m_max: daily.variables(0).valuesArray(),
		temperature_2m_min: daily.variables(1).valuesArray(),
	},
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log(
	"Current temp:", ApiWeatherData.current,
);
console.log("\nHourly data:\n", ApiWeatherData.hourly)
console.log("\nDaily data:\n", ApiWeatherData.daily)


  const days = Array.from(daily.time()).map((t, i) => {
  const date = new Date((t + utcOffsetSeconds) * 1000);

  return {
    day: date.toLocaleDateString("en-US", { weekday: "long" }),
    maxTemp: daily.variables(0).valuesArray()[i],
  };
});

console.log("days", days);
setWeatherData(ApiWeatherData)

    }
        useEffect(()=>{
            getWeather()
      
        }, [])      
  
    
    return (
        <>
             {/* Search bar */}
            <div className = "flex flex-row">
                <img src="/icon-search.svg"/>
                <input className="cursor-pointer" placeholder="Search for a place..."/>
                <button className="cursor-pointer" onClick={getWeather}>Search</button>
            </div>

            {/* Hero forecast container */}
            <div className="bg-hero bg-cover">
                {Object.keys(weatherData.current || {}).length > 0? (
                <div>
                    <h1>{weatherData.current.temperature_2m}</h1>
                    <p>{weatherData.current.time.toLocaleString()}</p>
                </div>): "no location entered"}
            </div>
   
            <div className="flex flex-row gap-3">
                <div className="bg-neutral-700">
                    <p>Feels Like</p>
                </div>
                <div>
                    <p>Humidity</p>
                </div>
                <div>
                    <p>Wind</p>
                </div>
                <div>
                    <p>Precipitation</p>
                </div>
            </div>

            {/* Daily forecast container */}
            <div>
                <h4>Daily forecast</h4>
                    {weatherData.daily?.temperature_2m_max?.length > 0? (
                        <div className="flex flex-row">
                            <p>{weatherData.daily.temperature_2m_max.map(temp=> Math.floor(temp))}</p>
                            <p>{weatherData.daily.temperature_2m_min.map(temp=> Math.floor(temp))}</p>
                        </div>
                ): "no location entered"}
            </div>

            {/* Hourly forecast container */}
            <div>
                <h4>Hourly forecast</h4>
                <select className="cursor-pointer">
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                </select>
            </div>
        </>
    )
}