import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import { locationFilter, categorFilter } from "../../Utils/staticData";

import "./style.css";

function AddHouse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setLocation] = useState();
  const [category, setCategory] = useState("");
  const [bedroom, setRooms] = useState();
  const [bathroom, setBathRooms] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleRooms = (event) => {
    setRooms(event.target.value);
  };

  const handleBathrooms = (event) => {
    setBathRooms(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userDate = {
        id: "2",
        title,
        description,
        city,
        category,
        bedroom,
        bathroom,
        price,
        image,
      };
      useEffect(() => {
        fetch("https://my-json-server.typicode.com/SajaRa20/newapi/houses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDate[0]),
        })
          .then((response) => response.json())
          .then((data) => {
            setOpen(true);
            navigate("/profile");
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              setError(error.response.data.message);
            } else {
              setError("An unknown error occurred.");
            }
          });
      }, []);
    } catch (err) {
      setOpen(true);
      navigate("/profile");
    }
  };

  return (
    <>
    <Typography style={{marginTop:'120px', fontWeight:'600'}}
        variant="h6"
        textAlign="center"
        paddingTop="0.5em"
        paddingBottom="0.5em"
        color="#1e1e1e"
      >
        Add New House
      </Typography>

     <TableContainer component={Paper}  >
    
      <Table>
        <TableBody>
          <TableRow align="center">
            <FormControl defaultValue="" className="formlogin" required>
            <TextField style={{width:'30%', marginLeft:'35%'}}
                variant="outlined"
                placeholder="Enter the url image"
                type="file"
                name="image"
                required
                value={image}
                onChange={handleImage}
              />
              <br />
              <TextField style={{width:'30%', marginLeft:'35%'}}
                id="outlined-basic"
                label="Title"
                placeholder="Enter the Title"
                variant="outlined"
                required
                onChange={handleTitle}
                value={title}
              />
              <br />
              <TextField  style={{width:'30%', marginLeft:'35%'}}
                  placeholder="Choose the location"
                  className="location"
                  id="filled-select-location"
                  select
                  required
                  label="city"
                  variant="outlined"
                  name="location"
                  value={city}
                  onChange={handleLocation}
                >
                  {locationFilter.map((item) => (
                    <MenuItem value={item}>{item.toLocaleLowerCase()}</MenuItem>
                  ))}
                </TextField>
              <br />
              <TextField style={{width:'30%', marginLeft:'35%'}}
                  variant="outlined"
                  type="number"
                  placeholder="Enter the Price"
                  label="Price $"
                  name="price"
                  required
                  onChange={handlePrice}
                  value={price}
                />
              <br />
              <TextField  style={{width:'30%', marginLeft:'35%'}}
                  variant="outlined"
                  type="number"
                  placeholder="Enter the Bathrooms"
                  label="Bathrooms"
                  name="bathrooms"
                  required
                  onChange={handleBathrooms}
                  value={bathroom}
                />
               <br />
               <TextField  style={{width:'30%', marginLeft:'35%'}}
                  variant="outlined"
                  placeholder="Enter the Room"
                  type="number"
                  label="Rooms"
                  name="rooms"
                  required
                  onChange={handleRooms}
                  value={bedroom}
                />
               <br />
              < TextField  style={{marginLeft:'35%'}}
                id="outlined-textarea"
                label="Description"
                placeholder="Enter the Description"
                onChange={handleDescription}
                value={description}
                multiline
                maxRows={4}
              />
              <br />
          
              <Button style={{ marginLeft:'43%'}}
                 onClick={() => setOpen(true)}
                  className="btnadd"
                  sx={{
                    width:'200px',
                    marginTop: "1em",
                    marginBottom: "2.5em",
                    color: "white",
                    bgcolor: "#009688",
                    fontSize: "20px",
                    fontWeight: "300",
                    borderRadius :'30px',
                    "&:hover": {
                      backgroundColor: "#009688",
                      color: "white",
                    },
                  }}
                >
                  Add
                </Button>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  Added successfully
                </Alert>
              </Snackbar>
            </FormControl>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
    
  );
}

export default AddHouse;