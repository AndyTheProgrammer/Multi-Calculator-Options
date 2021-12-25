import React from 'react'
import { Typography, Box } from '@mui/material'
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@mui/material/IconButton';

import { Font, FontProvider } from '../font'

function StaticTab(props: any) {
  const { className, label, dropDown, dOptions, openDrop } = props

  if (label) {
    return (
      <Box className={className} p={0.9} style={{ display: 'block' }}>
        <FontProvider fonts={[{ font: 'Varela Round' }]}>
          <Typography className="text-center" variant="subtitle2" style={{ fontSize: 12 }}>
            <Font>{label}</Font>
          </Typography>
        </FontProvider>

        {dropDown === true &&
          <IconButton size='small' style={{ height: 18, width: 18 }} onClick={openDrop}>
            <ExpandMore />
          </IconButton>
        }
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
