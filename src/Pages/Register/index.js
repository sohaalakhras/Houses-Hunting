import React, { useState } from "react";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import image from "../../Utils/images/login.png";
import validationRegister from '../../Utils/validations/register'

import './style.css';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState('');
  const validationErrors = {};
  const handleSignin = (event) => {
    navigate("/login");
  };
  const handleusername = (event) => {
    setUsername(event.target.value);
  };
  const handlepassword = (event) => {
    setPassword(event.target.value);
  };

  const handlemobile = (event) => {
    setMobile(event.target.value);
  };
  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      await validationRegister.validate({username, password, mobile}, { abortEarly: false });

      const userData = {
        username,
        password,
        mobile,
      };
      const response = await fetch(
        "https://my-json-server.typicode.com/sohaalakhras/mockread-api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
      
        navigate("/login");
      } 
    }  catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
      }
      setError(validationErrors);
    }
   }

  return (
<Container maxWidth="lg" className="divregister">
  <Grid container justify="center" alignItems="center" spacing={12} paddingTop='2em'>
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <CardMedia
      className="imgregister"
        component="img"
        image={image}
      />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <article className="article-register">
      <Typography  className="signUpTitel1"> Welcome to House Hunters..! </Typography>
      <Typography  className="signUpPara">Lorem Ipsum is simply dummy text of the printing
       and typesetting industry. </Typography>

        <Typography variant="h6" className="signUpTitel"> Sign Up</Typography>
              <FormControl defaultValue="" className="formregister" required  >
            <TextField
              id="outlined-basic"
              label="Enter your user name..."
              variant="outlined"
              value={username}
              onChange={handleusername}
            />
               {error && <Typography variant="p" className="error">{error.username}</Typography>}
               <br />
            <TextField
              type="password"
              id="outlined-basic"
              label="Enter your phone number..."
              variant="outlined"
              value={mobile}
              onChange={handlemobile}
            />
            {error && <Typography variant="p" className="error">{error.mobile}</Typography>}
               <br />
            <TextField
              type="password"
              id="outlined-basic"
              label="Enter your Password..."
              variant="outlined"
              value={password}
              onChange={handlepassword}
            />
             {error && <Typography variant="p" className="error">{error.password}</Typography>}
            <Button
               onClick={handleAddUser}
              sx={{
                marginTop:'1.5em',
                marginRight:'1.5em',
                color: "white",
                bgcolor: "#009688",
                fontSize:'20px',
                fontWeight: "300",
                width: "270px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
               "&:hover": {
                  backgroundColor: "#009688",
                 color: "white",
                 },
               }}
             >
              Sign up
            </Button>
            <Typography variant="p" className="Account">  Do You Account?<span onClick={handleSignin}> login here</span></Typography>
          </FormControl>
      </article>
    </Grid>
  </Grid>
</Container>
  );
}

export default Register;
