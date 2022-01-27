import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Font, FontProvider } from '../font'
import { COLORS, SIZES } from '../../common/shared';

function StaticTab(props: any) {
  const { className, label, dropDown, opened, openDrop } = props

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        //padding: 1,
      }}
      className="form-card div-link"
    >
      <Typography
        sx={{
          fontSize: SIZES.defaultFont
        }}
      >
        {label}
      </Typography>

      {dropDown === true &&
        <IconButton
          sx={{
            color: COLORS.text,
          }}
          onClick={openDrop}
        >
          {
            opened
              ?
              <ExpandLessIcon />
              :
              <ExpandMoreIcon />
          }
        </IconButton>
      }


    </Box>
  )
}

export default StaticTab


/* function StaticTab(props: any) {
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

} */