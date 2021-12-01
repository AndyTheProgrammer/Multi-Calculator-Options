import React from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

import { COLORS } from './../../common/shared'

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: COLORS.primary,
      height: '10%',
      background: theme.palette.background.paper,
      '&:focus': {
        opacity: 1,
      },
      '&:nth-child(1)': {
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      '&:nth-child(2)': {
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
      },
      '&:nth-child(3)': {
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
      },
    },
    selected: {
      color: COLORS.light_text_color,
      background: COLORS.gradient,
    },
  }),
)((props: StyledTabProps) => <Tab disableRipple  {...props} />);

export default StyledTab
