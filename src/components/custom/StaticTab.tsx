import React from 'react'
import { Typography, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';

import { Font, FontProvider } from '../font'
import { COLORS } from '../../common/shared';

function StaticTab(props: any) {
  const { className, label, dropDown, opened, openDrop } = props

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
            <IconButton
              sx={{
                height: 18,
                width: 18,
                color: COLORS.text,
              }}
              onClick={openDrop}
            >
              {opened ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
