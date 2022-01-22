import { Typography } from '@material-ui/core'
import { Box, List, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { COLORS } from '../../common/shared'
import { setSelectedCalculator, useAppDispatch } from '../../redux'
import useStyles from '../../styling/CustomStyles'
import { FontProvider, Font } from '../font'

interface Props {
  calculators: string[] | undefined
  func: any
}

const DropDown = (props: Props) => {
  const { calculators } = props
  const theme = useTheme();
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState<string>()
  props.func(selected)
  const { dropDownOptions } = useStyles()
  var classNames = require('classnames');

  return (
    <Box sx={{
      position:'absolute',    
      width:'210px',
      // height: '140px',
      backgroundColor: 'white',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      borderRadius: 2.5,
      marginLeft: 1,
      paddingLeft: 1,
      paddingRight: 1,
      paddingTop: 1,
      zIndex: 50,
      top: 55
    }}
      className='text-center'
    >
      {calculators?.map((item: any, index) => {
        return (
          <Box className={classNames({
            'form-card': true,
            'div-link': true
        })}>
          <Typography
          onClick={() => {
            dispatch(setSelectedCalculator(item))
          }}
          className={dropDownOptions}
          >
            {item}
          </Typography>
          </Box>
          
        )
      })}
      {/* <List
        className='text-center'
        sx={{
          color: COLORS.light_text_color,
        }}
      >
        {calculators?.map((item: any, index) => (
          <ListItem
            onClick={() => {
              // setSelected(item)
              dispatch(setSelectedCalculator(item))

            }}
            key={index}
            sx={{
              paddingBottom: 0.5,
              paddingTop: 0.5,
            }}
          >
            <FontProvider fonts={[{ font: 'Roboto' }]}>
              <ListItemButton
                sx={{
                  fontSize: 5,
                  background: COLORS.gradient,
                  padding: theme.spacing(0.5),
                  borderRadius: '20px !important',
                  marginBottom: 0,
                  marginTop: 0,
                }}
              >
                <Font>
                  <ListItemText
                    primary={item}
                  />
                </Font>
              </ListItemButton>
            </FontProvider>
          </ListItem>
        ))}
      </List> */}
    </Box>
  )
}
export default DropDown