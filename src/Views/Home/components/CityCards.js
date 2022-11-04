import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const CityCards = ({
  cityName = "",
  countryCode= "",
 })=>{
    const navigate = useNavigate();
  return (
    <div className="mt-1 mb-1">
        <Card sx={{ maxWidth: 345, minWidth: 200 }}>
        <CardActionArea onClick={()=>{

            localStorage.setItem('city', cityName)
            navigate('/detail')
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {cityName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {countryCode}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>);
}

export default CityCards;
