import React from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles((theme: Theme) => ({
  root: {
    height: 20
  },
  indicator: {
    display: 'block',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
    },

  },
}))((props: any) => <Tabs variant="fullWidth" {...props} TabIndicatorProps={{ children: <span /> }} />);

export default StyledTabs
