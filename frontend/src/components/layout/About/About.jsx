import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedinIcon from "@mui/icons-material/LinkedIn";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/rahulsingh.jsx";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Rahul Singh</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample ecommerce wesbite made for learning purpose. 
              All the copyright of images taken belongs to their respective owners.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Social Handles</Typography>

            <a href="https://linkedin.com/in/rahuldevs706" target="blank">
              <LinkedinIcon className="linkedinIcon" />
            </a>

            <a href="https://github.com/RahulDevs706" target="blank">
              <YouTubeIcon className="githubIcon" />
            </a>

            <a href="https://instagram.com/rahulsingh.jsx" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;