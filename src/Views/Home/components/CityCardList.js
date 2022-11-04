import * as React from 'react';
import CityCards from "./CityCards";
import {Box} from "@mui/material";

const CityCardList = ({cityArray= []})=>{
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      minHeight="200"
    >
      {cityArray.map(city=>{
      return (
        <CityCards
          cityName={city?.cityName}
          countryCode={city?.countryCode}
        />
      );
    })}
    </Box>
  );
};
export default CityCardList;
