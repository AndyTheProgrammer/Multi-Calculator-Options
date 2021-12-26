import React from 'react'
import { Typography, Box } from '@mui/material'
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@mui/material/IconButton';

import { Font, FontProvider } from '../font'

function StaticTab(props: any) {
  const { className, label, dropDown, dOptions, openDrop } = props

  if (label) {
    return (
      <Box className={className} p={0.9}>
        <div>
          <FontProvider fonts={[{ font: 'Varela Round' }]}>
            <Typography variant="subtitle2">
              <Font>{label}</Font>
            </Typography>
          </FontProvider>
        </div>


        <div>
          {dropDown === true &&
            <IconButton onClick={openDrop}>
              <ExpandMore />
            </IconButton>
          }
        </div>
      </Box>
    )
  } else {
    return (
      <Box className={className} p={2.4}>
      </Box>
    )
  }

}

export default StaticTab
