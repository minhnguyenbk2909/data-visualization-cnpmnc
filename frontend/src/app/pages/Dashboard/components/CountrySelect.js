import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const CountrySelect = ({ country, setCountry }) => {
  const [countryNames, setCountryNames] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/country-names');
      setCountryNames(response.data.countryNames);
    })();
  }, []);

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel>Country</InputLabel>
      <Select value={country} label='Country' onChange={handleChange}>
        {countryNames.map((countryName) => (
          <MenuItem value={countryName} key={countryName}>
            {countryName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
