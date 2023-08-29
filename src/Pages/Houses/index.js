import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CardContainer from '../../Components/CardContainer'
import { locationFilter} from "../../Utils/staticData";
import "./style.css";

function SearchPage() {
  const [houses, setHouses] = useState([]);
  const [type, setType] = useState();
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [location, setLocation] = useState();
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [priceRange, setPriceRange] = useState();



  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleBathroomChange = (event) => {
    setBathroom(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  
  const handleBedroomsChange = (event) => {
    setBedrooms(event.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/sohaalakhras/mockread-api/houses")
      .then((response) => response.json())
      .then((data) => {
        setHouses(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredHouses = houses.filter((house) => 
    (!location || house.city.toLowerCase() === location.toLowerCase()) ||
    (bedrooms && house.bedroom === +bedrooms) ||
    (bathroom && house.bathroom === +bathroom) ||
    (priceRange && house.price >= priceRange[0] && house.price <= priceRange[1]) ||
    (type && house.description.toLowerCase().includes(type.toLowerCase().trim()))
  );
    setFilteredHouses(filteredHouses);
  };

  return (
    
    <Container className="ContainerSearch">
  <div className="herosearchpage">
        <form className="searchhh">
          
          <input
            className="hero-searchInput"
            type="search"
            placeholder="Search for what you want!"
          
            onChange={handleTypeChange}
          />
        </form>
        <div className="filter">
  
          <FormControl className="dropdown">
          <InputLabel  id="demo-simple-select-helper-label">
                City
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={location}
                label="Age"
                onChange={handleLocationChange}
              >
                {locationFilter.map((item) => (
                  <MenuItem value={item}>{item.toLocaleLowerCase()}</MenuItem>
                ))}
              </Select>

            <TextField   
              id="outlined-Bedroom-input"
              label="Bedroom"
              type="number"
              value={bedrooms}
              onChange={handleBedroomsChange}
              lang="en"
            />
                     <TextField  
              id="outlined-Bedroom-input"
              label="Bathroom "
              type="number"
              value={bathroom}
              onChange={handleBathroomChange}
              lang="en"
            />
            

            <div className="price">
            <h3>Price</h3>
            <Slider
              aria-label="Small"
              name="price"
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={100}
              max={500}
              variant="outlined"
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
          </div> 

          </FormControl>
          
          <button className="serach-btn " style={{ cursor: "pointer" }} onClick={handleSearch}>
            Search
          </button>
          
        </div>
      </div>

      <div className="container">
        <Typography  className="available-houses"
          variant="h5"
          component="h4"
          textAlign="center"
        >
           <span>  {filteredHouses.length} </span>
           <span className="available-houses1"> Available Houses</span>
           <span>{` `}</span>
        </Typography>
        <CardContainer houses={filteredHouses} />
      </div>
    </Container>
  );
}

export default SearchPage;
