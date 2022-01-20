import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import { Grid, Paper, Box, Typography } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Font, FontProvider } from '../font'
import { COLORS } from '../../common/shared';
import useStyles, { labelStyle, formCardStyle } from '../../styling/CustomStyles'

function StaticTab(props: any) {
  const { className, label, dropDown, opened, openDrop } = props

  return (

    <Typography sx={{ width: '50%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        className="form-card div-link"
      >
        {label}

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
    </Typography>

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