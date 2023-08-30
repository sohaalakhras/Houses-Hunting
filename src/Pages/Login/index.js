import React, { useContext, useState } from "react";
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
import AuthContext from "../../Components/Context/AuthContext";
import validationSchema from "../../Utils/validations/login"
import './style.css';

function Login() {
  const { isAuth, setIsAuth, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const validationErrors = {};

const handleSignup = (event) => {
  navigate("/register");
};

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      await validationSchema.validate({ username : name, password }, { abortEarly: false });

      const response = await fetch('https://my-json-server.typicode.com/sohaalakhras/mockread-api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });
      if (response.ok) {
        login({ name, password },  { accessToken: name, refreshToken: name })
        navigate("/");
      } else {
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
      }
      setError(validationErrors);
    }
  };

  return (
<Container maxWidth="lg" className="divlogin">
  <Grid container justify="center" alignItems="center" spacing={12} paddingTop='2em'>
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <CardMedia
      className="imglogin"
        component="img"
        image={image}
      />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <article>
      <Typography  className="logInTitel1"> Welcome to House Hunters..! </Typography>
      <Typography  className="logInPara">Lorem Ipsum is simply dummy text of the printing
       and typesetting industry. </Typography>
        <Typography variant="h6" className="logInTitel"> Login</Typography>
              <FormControl defaultValue="" className="formlogin" required  >
              {error && <Typography variant="p" className="error">{error.username}</Typography>}
            <TextField
            className="lablelogin"
              id="outlined-basic"
              label="Enter your name..."
              variant="outlined"
              onChange={handleName}
              value={name}
            />
            <br />
            {error && <Typography variant="p" className="error">{error.password}</Typography>}
            <TextField
             className="lablelogin"
              type="password"
              id="outlined-basic"
              label="Enter your Password..."
              variant="outlined"
              onChange={handlePassword}
              value={password}
            />
            <Button
             onClick={handleSubmit}
              sx={{
                marginTop:'1.5em',
                color: "white",
                bgcolor: "#009688",
                fontSize:'20px',
                fontWeight: "300",
                width:"270px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
               "&:hover": {
                  backgroundColor: "#009688",
                 color: "white",
                 },
               }}
             >
              Login
            </Button>
            <Typography variant="p" className="Account">  You don't have Account?<span onClick={handleSignup}> Signup here</span></Typography>
          </FormControl>
      </article>
    </Grid>
  </Grid>
</Container>
  );
}

export default Login;