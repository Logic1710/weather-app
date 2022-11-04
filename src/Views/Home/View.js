import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './index.css';
import useFetchWeather from "../../Hooks/useFetchWeather";
import {Box, Button, Container, Snackbar, TextField} from "@mui/material";
import CityCardList from "./components/CityCardList";
import {validateIfCityExist} from "./helper/ValidateIfCityExist";
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const View = ()=>{
  const navigate = useNavigate();
  const [citiesArray, setCitiesArray] = useState(
      [

      ]);

  // Hooks call
  const [ fetchWeatherDataCallback, weatherData, error, isLoading] = useFetchWeather();
  const [cityInput, setCityInput] = useState("");
  const [shouldSnackbarOpen, setShouldSnackbarOpen] = useState(false);

  // For snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShouldSnackbarOpen(false);
  };

  useEffect(()=>{
    var localSearches = JSON.parse(localStorage.getItem('searches'))
    if(localSearches == null){
      return;
    } else{
      for (let index = (localSearches.length - 1); index >= 0; --index) {
        const element = localSearches[index];
        setCitiesArray(citiesArray => [...citiesArray, {cityName: element}]);
      }
    }
  }, [])


  return (
      <div className="container">
        <div className="search">
          <div className="form1">
            <TextField placeholder={"Search..."} variant="outlined" onChange={(event)=>{
              setCityInput(event.target.value)
            }} />
            <br/>
            <span className="error_message">{(error!==null) && error.message}</span>
            <br/>
            <Container maxWidth="sm">
              &nbsp;
              <Button variant="contained" onClick={async()=>{
                try {
                  const validationResult = await validateIfCityExist(cityInput)
                  if (validationResult === true){
                    var searches = JSON.parse(localStorage.getItem("searches"));
                    if(searches == null) searches = [];

                    var cek = true;
                    for (let index = 0; index < searches.length; ++index) {
                      const element = searches[index];
                      if(element == cityInput){
                        delete searches[index]
                        searches.shift();
                        cek = false;
                      }
                    }
                    if(cek == true){
                      searches.push(cityInput);
                      localStorage.setItem("searches", JSON.stringify(searches));
                    }
                    localStorage.setItem('city', cityInput);
                    navigate('/detail')
                  }else{
                    setShouldSnackbarOpen( true);
                  }
                }catch(e){
                  console.error(e)
                  setShouldSnackbarOpen(true);
                }
              }}>
                <SearchIcon></SearchIcon>
              </Button>
              &nbsp;
              <Button variant="contained" onClick={()=>{
                navigate('/cities')
              }}>
                <BookmarkIcon></BookmarkIcon>
              </Button>
            </Container>
          </div>
        </div>
        <div className="recentsearch">
          Recent Search  |
          <IconButton color="primary" onClick={() => {
            localStorage.removeItem("searches");
            window.location.reload(false);
          }}>
          <DeleteIcon/>
          </IconButton>
          &nbsp;
          <CityCardList
              cityArray={citiesArray}
          />
          <Snackbar
              open={shouldSnackbarOpen}
              autoHideDuration={6000}
              onClose={handleClose}
              message="City not found"
          />
        </div>
      </div>

  );
}

export default View;