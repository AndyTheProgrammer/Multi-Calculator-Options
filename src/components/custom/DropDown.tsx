import { Box, List, ListItem, ListItemButton, ListItemText, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { COLORS } from '../../common/shared'
import { setSelectedCalculator, useAppDispatch } from '../../redux'
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

  return (
    <Box sx={{
      zIndex: 1,
      position: 'absolute',
      width: 300,
      top: 55,
      left: 10,
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      borderRadius: 2.5,
      marginLeft: 2.5,
    }}
      className='text-center'
    >
      <List
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
      </List>
    </Box>
  )
}
export default DropDown