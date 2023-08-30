import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { HOUSES } from '../../Utils/routes.constant';


function Favorite() {
  const navigate = useNavigate();
  const handleInfoIcon = () => {
    navigate("DetailsHouse");
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#DFDFDF",
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      color: "#1e1e1e",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [houses, setHouses] = useState([]);
  const [errorMsg, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [openalert, setOpenalert] = useState(false);
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenalert(false);
  };

  const deleteHouse = async (houseId) => {
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/sohaalakhras/mockread-api/houses${houseId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setOpenalert(true);
      }


      const updatedHouses = houses.filter((house) => house.id !== houseId);
      setHouses(updatedHouses);
    } catch (error) {
      console.error("Error deleting house:", error);
      setError("Failed to delete the house");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/sohaalakhras/mockread-api/houses"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHouses(data);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [refresh]);

  return (
    <>
      <Typography style={{marginTop:'120px',}}
        variant="h6"
        textAlign="center"
        paddingTop="0.5em"
        paddingBottom="0.5em"
        color="#1e1e1e"
      >
       My Favorites House  <span>(4 Items) </span>
      </Typography>
    
    <TableContainer component={Paper} style={{ width:'800px', borderRadius:'' ,marginLeft:'25%', marginBottom:'120px' }}  >
    
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead> 
          <TableRow>
            <StyledTableCell align="center" style= {{color:'#1e1e1e' , fontSize:'28px' , fontWeight:'600'}}>Title</StyledTableCell>
            <StyledTableCell align="center" style= {{color:'#1e1e1e' , fontSize:'28px' , fontWeight:'600'}}>Price</StyledTableCell>
            <StyledTableCell align="center" style= {{color:'#1e1e1e' , fontSize:'28px' , fontWeight:'600'}}>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {houses.slice(0, 4).map((house, idx) => (
            <>
              <StyledTableRow>
                
                <StyledTableCell align="center"  style= {{backgroundColor:'white'}}>{house.title}</StyledTableCell>
                <StyledTableCell align="center"  style= {{backgroundColor:'white'}}>{house.price}</StyledTableCell>
                <StyledTableCell align="center"  style= {{backgroundColor:'white'}}>
                  <Button
                    style={{ color: "red" }}
                    color="primary"
                    onClick={() => setOpen(true)}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button style={{ marginTop:'18px' }} >
                  <Link 
                   to={`${HOUSES}/${house.id}`}
                    style={{ color: "#009688" }}
                    color="primary"
                  >
                    <InfoIcon  />
                  </Link>
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                  {" "}
                  Are you sure you want to delete this house?
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      deleteHouse(house.id);
                      setOpen(false);
                    }}
                    color="primary"
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ))}
          <Snackbar open={openalert} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Deleted successfully
            </Alert>
          </Snackbar>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default Favorite;