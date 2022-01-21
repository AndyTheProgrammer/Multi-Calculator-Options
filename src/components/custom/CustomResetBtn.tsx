import React from 'react'
import { Button, withStyles, } from '@material-ui/core'
import { red } from '@material-ui/core/colors';

import { BUTTONS, COLORS } from '../../common/shared'
import { Font, FontProvider } from '../font'

const ColorButton = withStyles((theme) => ({
  root: {
    color: COLORS.light_text_color,
    height: 25,
    margin: theme.spacing(1),
    textTransform: 'none',
    width: 100,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: COLORS.gradient,
    '&:hover': {
      backgroundColor: red[400],
    },
  },
}))(Button);

const CustomResetBtn = (props: any) => {
  const { onHandleClick } = props
  return (
    <FontProvider fonts={[{ font: 'Roboto' }]}>
      <div className="form d-grid gap-2 d-md-flex justify-content-md-end">
        <ColorButton
          size="small"
          variant="contained"
          color="primary"
          className="btn btn-primary"
          onClick={onHandleClick}
        >
          <Font>{BUTTONS.clear}</Font>
        </ColorButton>
      </div>
    </FontProvider>

  )
}

export default CustomResetBtn
