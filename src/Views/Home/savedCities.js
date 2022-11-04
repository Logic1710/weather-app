import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './savedcity.css';
import useFetchWeather from "../../Hooks/useFetchWeather";
import {Box, Button, Container, Snackbar, TextField} from "@mui/material";
import CityCardList from "./components/CityCardList";

const View = ()=>{
    const navigate = useNavigate();
    const [citiesArray, setCitiesArray] = useState(
        [

        ]);
    const [cityInput, setCityInput] = useState("");

    useEffect(()=>{
        var citiesSaved = JSON.parse(localStorage.getItem('savedCities'))
        if(citiesSaved == null){
            return;
        } else {
            for (let index = (citiesSaved.length - 1); index >= 0; --index) {
                const element = citiesSaved[index];
                setCitiesArray(citiesArray => [...citiesArray, {cityName: element}]);
            }
        }
    }, [])

    return (
        <div className="container">
            <div className="savedcity">
                <div className="form">
                    <p className="decoration-wavy">Saved Cities</p>
                    <br/>
                </div>
                <CityCardList
                    cityArray={citiesArray}
                />
                <br/>
                <Button variant="contained" onClick={()=>{
                    navigate('/')
                }}>
                    Back
                </Button>
            </div>
        </div>

    );
}

export default View;