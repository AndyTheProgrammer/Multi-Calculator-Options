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
      <Container className={classes.container}>
        <Grid>{children}</Grid>
      </Container>
    </div>
  );
}

export default NoIndexTabPanel
