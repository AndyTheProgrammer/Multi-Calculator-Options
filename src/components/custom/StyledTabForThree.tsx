import React from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tab from '@mui/material/Tab';

import { COLORS } from '../../common/shared'
import { fontSize } from '@mui/system';

interface StyledTabProps {
  label: string;
}

const StyledTabForThree = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: COLORS.light_text_color,
      background: COLORS.gradient,
      opacity: 1,
      padding: 4,
      fontFamily: [
        'Varela Round',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:nth-child(1)': {
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      '&:nth-child(2)': {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      '&:nth-child(3)': {
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
      },
    },
    selected: {
      color: COLORS.text,
      background: theme.palette.background.paper,
    },

  }),
)((props: any) => <Tab disableRipple  {...props} />);

export default StyledTabForThree
