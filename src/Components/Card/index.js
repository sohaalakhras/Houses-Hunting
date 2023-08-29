import React, { useState } from "react";

import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import {Box} from '@mui/material';
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BdsIcon from '@mui/icons-material/Hotel';
import BathIcon from '@mui/icons-material/Bathtub';
import PlaceIcon from '@mui/icons-material/Place';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { HOUSES } from '../../Utils/routes.constant';
import "./style.css";


export default function CardComponent({ house }) {
  const {
    id,
    image,
    title,
    description,
    city,
    price,
    bedroom,
    bathroom,
  } = house;

  const [isFavorite, setIsFavorite] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const addToFavorite = async (id) => {
    const response = await fetch(
      `https://my-json-server.typicode.com/sohaalakhras/mockread-api/houses${id}`
    );
    const item = await response.json();
    fetch(
      "https://my-json-server.typicode.com/sohaalakhras/mockread-api/favorites",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("House added to favorites");
          setIsFavorite(true);
          setOpenSnackbar(true);
        } else {
          console.error("Failed to add to favorites");
        }
      })
      .catch((error) => {
        console.error("Error adding to favorites:", error);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Card sx={{height:'67vh', borderRadius: '10px'}} className="card">
    <CardMedia
      sx={{ height: 210 }}
      image={image}
      title="Image House"
    />
    <CardContent className='CardContent'>
      <Box className="CardContentTitle">
        <Typography gutterBottom variant="h6" component="h2" style={{fontWeight:600, fontSize:"22px"}}>
        {title.split("").splice(0, 16).join("")}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2" style={{fontWeight:600, fontSize:"22px"}}>
          ${price}
        </Typography>
      </Box>
     
      
      <Box className='detailsCardBox'>
        
        <Typography variant="body2" color="text.secondary" className='detailsCard'>
          <BdsIcon style={{fontSize: "18", marginRight:'5px'}}/> 
          {bedroom}bd
        </Typography>

        <Typography variant="body2" color="text.secondary" className='detailsCard'>
          <BathIcon style={{fontSize: "18", marginRight:'5px'}}/>
          {bathroom}ba
        </Typography>

        <Typography variant="body2" color="text.secondary" className='detailsCard'>
          <PlaceIcon style={{fontSize: "18", marginRight:'5px'}}/>
          {city} 
        </Typography>
      </Box>
      
      <Typography variant="body2" color="text.secondary">
      {description.split("").splice(0, 55).join("")}
      </Typography>
    </CardContent>
    <CardActions className="cardaction" >
      <Link to={`${HOUSES}/${id}`} sx={{ bgcolor: 'red',color:"white",fontWeight:'500' }} className="detailsLink">
          more details
        </Link>
        <>
          <Button style={{color:'#1e1e1e'}}>
            {isFavorite ? (
              <FavoriteIcon style={{ color: "#F8C405" }} />
            ) : (
              <FavoriteBorderIcon className="favorite" onClick={() => addToFavorite(id)} />
            )}
          </Button>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          House added to favorites successfully!
        </Alert>
      </Snackbar>
        </>
      </CardActions>
   
  </Card>
  );
}


