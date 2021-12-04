import React from 'react'
import { Grid, Typography, Box, Container } from '@mui/material'

import { useHistory } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import iconImage from '../../common/assets/icon.svg';
import iconLine from '../../common/assets/line.svg';

const CategoryBar = () => {
  const boxStyle = {
    marginBottom: 2,
    backgroundColor: 'transparent',
    maxWidth: 270,
    height: 250,
    borderRadius: 3,
    paddingTop: 1,
    paddingLeft: 3,
    paddingBottom: 0.5,
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <Box sx={{ ...boxStyle }}>
      < Box
        sx={{
          paddingLeft: 2,
          width: 270,
          backgroundColor: 'white',
          borderRadius: 5,
          boxShadow: ' 0 4px 8px 0px rgba(0, 0, 0, 0.2)',
        }}
      >
        < Box
          sx={{
            width: 230,
            color: '#8591B0',
            paddingBottom: 0.5,
            fontSize: 16,
            overflow: 'hidden', whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
        >
        </Box >
      </Box >


      <Box className="general-text-box" sx={{ paddingLeft: 2 }}>
        <Box
          className="div-link"
          onClick={() => console.log("Name : ")}
          sx={{
            width: 230,
            paddingBottom: 0.5,
            fontSize: 16,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
        >
        </Box>);
      </Box>
    </Box >
  )
}

export default CategoryBar
