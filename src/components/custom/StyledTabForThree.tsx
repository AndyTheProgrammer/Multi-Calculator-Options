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
      color: COLORS.text,
      background: theme.palette.background.paper,
      opacity: 1,
      padding: 4,
      height: 20,
      fontFamily: [
        'Roboto',
        '"Helvetica Neue"',
      ].join(','),
      '&:nth-child(1)': {
        borderRadius: 20,
        //borderTopLeftRadius: 20,
        //borderBottomRightRadius: 20,
      },
      '&:nth-child(2)': {
        borderRadius: 20,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
      },
      '&:nth-child(3)': {
        borderRadius: 20,
        // borderBottomLeftRadius: 20,
        // borderTopRightRadius: 20,
      },
    },
    selected: {
      color: 'white !important',
      background: COLORS.gradient,
    },
  }),
)((props: any) => <Tab disableRipple  {...props} />);

export default StyledTabForThree
