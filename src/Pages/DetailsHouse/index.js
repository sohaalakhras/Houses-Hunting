import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from '@mui/icons-material/Mail';
import Snackbar from "@mui/material/Snackbar";
import Alert  from "@mui/material/Alert";
import PhoneRoundedIcon from "@mui/icons-material/LocalPhone";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import BathroomIcon from "@mui/icons-material/Bathroom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { fakeImage } from "../../Utils/staticData";
import Loading from "../../Components/Loading";
import "./style.css";

function DetailsHouse() {
  const { id } = useParams();
  const [house, setHouse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    async function fetchHouse() {
      try {
        const response = await fetch(
          `https://my-json-server.typicode.com/sohaalakhras/mockread-api/houses/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const houseData = await response.json();
        setHouse(houseData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchHouse();
  }, [id]);

  const [isFavorite, setIsFavorite] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const addToFavorite = async (id) => {
    const response = await fetch(
      `https://my-json-server.typicode.com/sohaalakhras/mockread-api/houses/${id}`
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
          setIsFavorite(true);
          setOpenSnackbar(true);
        } else {
        }
      })
      .catch((error) => {
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" className="root">
      { loading ? (
        <Loading />
      ) : (
        <Grid container>
          {console.log(house)}
          <Grid xs="12" sm="12" md="12" lg="12" className="imgSection">
            <div className="video">
              <iframe
                width="1150"
                height="500"
                src="https://www.youtube.com/embed/H51qfk9ikTM"
                title="YouTube Video"
                allowFullScreen
              ></iframe>
            </div>
          </Grid>
          <Grid xs="12" sm="12" md="12" lg="8">
            <Typography   style={{fontWeight:600, fontSize:"30px"}} className="title">
              {house.title}
            </Typography>
            <Typography style={{fontWeight:200, fontSize:"30px"}} className="priceDetails">
              <span>${house.price}/ week</span>
            </Typography>

            <div className="loaction">
              <LocationOnRoundedIcon className="icon" />
              <Typography style={{fontWeight:200, fontSize:"30px"}} className="city">
                {house.city}
              </Typography>
            </div>

            <div className="room">
              <div className="bedroom">
                <LocalHotelIcon className="icon" />
                <Typography variant="p" className="num">
                  bd{house.bedroom}
                </Typography>
              </div>
              <div className="bedroom">
                <BathroomIcon className="icon" />
                <Typography variant="p" className="num">
                  ba{house.bathroom}
                </Typography>
              </div>
            </div>
           
         
            <Typography  style={{fontWeight:50, fontSize:"20px"}}   className="descDetails">{house.description}  
            
            </Typography>

            <div className="descBtn">
              <Button
                className="btn"
                sx={{
                  marginRight: 2,
                  color: "white",
                  bgcolor: "#F8C405",
                  fontWeight: "500",
                  "&:hover": {
                    backgroundColor: "#F8C405",
                    color: "white",
                  },
                }}
              >
                         {isFavorite ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteIcon style={{ color: "white" }} className="favorite" onClick={() => addToFavorite(id)} />
            )} add to Favorite
              </Button>

              <Button
              onClick= {handleBack}
                className="btn"
                
                sx={{
                  marginRight: 2,
                  color: "#009688",
                  bgcolor: "white",
                  border:" #009688 solid 1px",
                  
                  "&:hover": {
                    backgroundColor: "#009688",
                    color: "white",
                  },
                }}
              >
                Back To Home             
               </Button>
             

            </div>
          </Grid>
          <Grid xs="12" sm="12" md="12" lg="4">
           
            <div className="descAddress">
              <div className="name">
                <Typography>
                  <AccountCircleIcon style={{ fontSize:"40px"}} />
                </Typography>
                <Typography style={{ fontSize:"17px"}}>
                  Name:
                  <br />
                  Soha Al-akhras
                </Typography>
              </div>
              <div className="name">
                <Typography>
                  <PhoneRoundedIcon style={{ fontSize:"40px"}} />
                </Typography>
                <Typography style={{ fontSize:"17px"}}>
                  phone:
                  <br />
                  +972597455146
                </Typography>
              </div>
              <div className="name">
                <Typography>
                  <MailIcon style={{ fontSize:"40px"}} />
                </Typography>
                <Typography style={{ fontSize:"17px"}}>
                  Email:
                  <br />
                  sohaalakhras57@gmail.com
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          House added to favorites successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default DetailsHouse;
