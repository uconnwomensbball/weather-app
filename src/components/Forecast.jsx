import { useEffect, useState } from "react"
import { fetchWeatherApi } from "openmeteo";

export default function Forecast(){
    const [weatherData, getWeatherData] = useState([])



        async function getWeather(){
            console.log("getting weather!")
            const params = {
            latitude: 52.52,
            longitude: 13.41,
            hourly: "temperature_2m"}

        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        console.log("responses", responses[0])
            }
     
    
    return (
        <>
            <div className = "flex flex-row">
                <img src="/icon-search.svg"/>
                <input className="cursor-pointer" placeholder="Search for a place..."/>
                <button className="cursor-pointer" onClick={getWeather}>Search</button>
            </div>

            <div className="bg-hero bg-cover">
                <p>Berlin, Germany</p>
            </div>

            <div className="flex flex-row gap-3">
                <div>
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