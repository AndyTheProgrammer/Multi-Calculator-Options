import React from 'react'
import { Button, withStyles, } from '@material-ui/core'
import { red } from '@material-ui/core/colors';

import { BUTTONS, COLORS } from '../../common/shared'

const ColorButton = withStyles((theme) => ({
  root: {
    color: COLORS.light_text_color,
    backgroundColor: COLORS.gradient,
    '&:hover': {
      backgroundColor: red[400],
    },
  },
}))(Button);

const CustomResetBtn = (props: any) => {
  const { onHandleClick } = props
  return (
    <div className="form d-grid gap-2 d-md-flex justify-content-md-end">
      <ColorButton
        size="small"
        variant="contained"
        color="primary"
        className="btn btn-primary"
        onClick={onHandleClick}
      >
        {BUTTONS.clear}
      </ColorButton>
    </div>
  )
}

export default CustomResetBtn
