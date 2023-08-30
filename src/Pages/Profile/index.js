import React, { useContext, useState, useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import { Avatar, Box } from "@mui/material";
import image from "../../Utils/images/soha.jpg";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import PersonIcon from '@mui/icons-material/Person';


function Profile() {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [open, setOpen] = useState(false);
  const [openalert, setOpenalert] = useState(false);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenalert(false);
  };

  const handleUserName = (event) => {
    setUsername(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleMobile = (event) => {
    setMobile(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const user = { username, mobile, email };

      const response = await fetch(
        "https://my-json-server.typicode.com/sohaalakhras/mockread-api/users",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        setOpenalert(true);
      }
    } catch (err) {
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/sohaalakhras/mockread-api/users"
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data[0]);
        }
      } catch (error) {}
    })();
  }, [user]);

  return (
      <TableContainer component={Paper}>
        <Typography style={{marginTop:'120px', fontWeight:'600'}}
          variant="h6"
          textAlign="center"
          paddingTop="0.5em"
          paddingBottom="0.5em"
          color="#1e1e1e"
        >
          My Profile
        </Typography>
        <div className="userAvatar" >
           <PersonIcon   style={{
            width:'7%', 
            height:'7%',
             backgroundColor:'#7d7d7d',
              color:'white', 
              borderRadius:'70px',
              padding:'12px',
              marginLeft:'45%',
              marginBottom:'30px',
              }}/>  
        </div>
        <Table>
          <TableBody>
            <TableRow align="center">
              <FormControl defaultValue="" className="formlogin" required>
                <TextField style={{width:'30%', marginLeft:'35%'}}
                  id="outlined"
                  label="User Name"
                  defaultValue="Soha"
                  value={username}
                  onChange={handleUserName}
                />
                <br />
                
                <TextField style={{width:'30%', marginLeft:'35%'}}
                  id="outlined"
                  label="Email"
                  defaultValue="sohaalakhras57@gmail.com"
                  value={email}
                  onChange={handleEmail}
                />
                <br />
                
                <TextField style={{width:'30%', marginLeft:'35%'}}
                  id="outlined"
                  label="Mobile"
                  defaultValue="0597455146"
                  value={mobile}
                  onChange={handleMobile}
                />
                <Button style={{ marginLeft:'43%'}}
                 onClick={() => setOpen(true)}
                  className="btnadd"
                  sx={{
                    width:'200px',
                    marginTop: "2.5em",
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
                  Save
                </Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                  <DialogTitle>Confirm Updating</DialogTitle>
                  <DialogContent>
                    {" "}
                    Are you sure you want to update this personal?
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        handleSubmit();
                        setOpen(false);
                      }}
                      color="primary"
                    >
                      Update
                    </Button>
                  </DialogActions>
                </Dialog>
                <Snackbar
                  open={openalert}
                  autoHideDuration={8000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    User updated successfully
                  </Alert>
                </Snackbar>
              </FormControl>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
  );
}
export default Profile;


