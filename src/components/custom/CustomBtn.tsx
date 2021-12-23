import React from 'react'
import { Button, withStyles, } from '@material-ui/core'
import { green, purple } from '@material-ui/core/colors';

import { BUTTONS, COLORS } from '../../common/shared'
import { Font, FontProvider } from '../font'

const ColorButton = withStyles((theme) => ({
  root: {
    color: COLORS.background,
    height: 25,
    margin: theme.spacing(1),
    textTransform: 'none',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: COLORS.gradient,
    '&:hover': {
      backgroundColor: green[400],
    },
  },
}))((props: any) => <Button {...props} />);

const CustomBtn = (props: any) => {
  return (
    <FontProvider fonts={[{ font: 'Varela Round' }]}>
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
        </ColorButton>
      </div>
    </FontProvider>

  )
}

export default CustomBtn
