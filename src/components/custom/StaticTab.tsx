import React from 'react'
import { Typography, Box } from '@mui/material'
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@mui/material/IconButton';

import { Font, FontProvider } from '../font'
import { COLORS } from '../../common/shared';

function StaticTab(props: any) {
  const { className, label, dropDown, dOptions, openDrop } = props

  if (label) {
    return (
      <Box className={className}>
        <div>
          <FontProvider fonts={[{ font: 'Roboto, Helvetica' }]}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
              <Font>{label}</Font>
            </Typography>
          </FontProvider>
        </div>


        <div>
          {dropDown === true &&
            <IconButton sx={{ height: 18, width: 18, color: COLORS.text }} onClick={openDrop}>
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
