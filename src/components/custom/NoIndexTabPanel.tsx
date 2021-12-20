import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

interface TabPanelProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
  }
}))

const NoIndexTabPanel = (props: TabPanelProps) => {
  const { children, ...other } = props;
  const classes = useStyles()

  return (
    <div
      role="tabpanel"
      {...other}
    >
      <Box
        p={5}
      // className={classes.container}
      >
        <Grid>{children}</Grid>
      </Box>
    </div>
  );
}

export default NoIndexTabPanel
