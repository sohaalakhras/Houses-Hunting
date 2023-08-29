import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import image from '../../Utils/images/about.png'
 import   './style.css';


function AboutUs() {
  return (
<Container maxWidth="lg" className="divabout">
  <Grid container justify="center" alignItems="center" spacing={5} paddingTop='2em' >
   
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <article>
        <Typography className="titleAbout" > About <span className="blueText">
              </span> Us</Typography>
        <Typography className="aboutPara" important>
          Provides up-to-date and reliable information that makes finding
          the property of your dreams easy and fast. It offers details about
          residential and commercial properties as well as rental properties
          all over Palestine. Whether you've just started your search or are
          ready to make a purchase, properties are updated daily to ensure
          access to the latest and most accurate listings.
        </Typography>
      </article>
    </Grid>

    <Grid item xs={12} sm={12} md={6} lg={6}>
      <CardMedia className="aboutImg"
        component="img"
       
        image={image}
      />
    </Grid>

  </Grid>
</Container>

  );
}

export default AboutUs;


