import React from 'react'
import { Box, Button, withStyles, } from '@material-ui/core'
import { green, purple } from '@material-ui/core/colors';
import form_btn from '../../common/assets/calc_btn.svg'
import { BUTTONS, COLORS } from '../../common/shared'
import { Font, FontProvider } from '../font'

const ColorButton = withStyles((theme) => ({
  root: {
    color: COLORS.background,
    height: 25,
    margin: theme.spacing(1),
    textTransform: 'none',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: COLORS.gradient,
    width: 100,
    '&:hover': {
      backgroundColor: green[400],
    },
    buttonImage: {
      width: 20
    }
  },
}))((props: any) => <Button {...props} />);


const CustomBtn = (props: any) => {
  return (
    <FontProvider fonts={[{ font: 'Roboto' }]}>
      <div className="form d-grid gap-2 d-md-flex justify-content-md-start">
        <ColorButton
          size="small"
          variant="contained"
          color="primary"
          type="submit"
          className="btn btn-primary"
          {...props}
        >
          <Font>{BUTTONS.calculate}</Font>
          <Box sx={{ width: 20 }}>
            <img style={{ width: '100%', height: '100%', }} alt="icon" src={form_btn} />
          </Box>

        </ColorButton>
      </div>
    </FontProvider>

  )
}

export default CustomBtn
