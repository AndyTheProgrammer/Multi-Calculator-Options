import React from 'react'
import { Button, withStyles, } from '@material-ui/core'
import { green, purple } from '@material-ui/core/colors';

import { BUTTONS, COLORS } from '../../common/shared'

const ColorButton = withStyles((theme) => ({
  root: {
    color: COLORS.background,
    backgroundColor: COLORS.gradient,
    '&:hover': {
      backgroundColor: green[400],
    },
  },
}))((props: any) => <Button {...props} />);

const CustomBtn = (props: any) => {
  return (
    <div className="form d-grid gap-2 d-md-flex justify-content-md-start">
      <ColorButton
        size="small"
        variant="contained"
        color="primary"
        type="submit"
        className="btn btn-primary"
        {...props}
      >
        {BUTTONS.calculate}
      </ColorButton>
    </div>
  )
}

export default CustomBtn
