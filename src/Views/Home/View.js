import {useCallback, useEffect, useState} from "react";
import './index.css';
import axios from "axios";
import useFetchWeather from "../../Hooks/useFetchWeather";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";

const View = ()=>{
  // Hooks call
  const [ fetchWeatherDataCallback, weatherData, error, isLoading] = useFetchWeather();

  const [cityInput, setCityInput] = useState("");

  useEffect(()=>{
    fetchWeatherDataCallback("Jakarta");
  }, [fetchWeatherDataCallback])

  useEffect(()=>{
    console.log(weatherData)
  }, [weatherData])

  return (
    <div className="container">
      <div className="form">
        <p className="text-3xl">Enter City Name</p>
        <TextField id="outlined-basic" label="Location" variant="outlined" onChange={(event)=>{
          setCityInput(event.target.value)
        }} /><br/><br/>
        <span className="error_message">{(error!==null) && error.message}<br/></span>
        <Button variant="contained" onClick={()=>{
          fetchWeatherDataCallback(cityInput)
        }}>
          Fetch Data
        </Button>
      </div>
      <div className="weather-info">
        <table align={"center"}>
          <tr>
            <th>City</th><td>{weatherData?.city}</td>
          </tr>
          <tr>
            <th>Temperature</th><td>{weatherData?.temp}°C</td>
          </tr>
          <tr>
            <th>Humidity</th><td>{weatherData?.humidity}%</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default View;
