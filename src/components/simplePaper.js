import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    width: '100%'
  },
  title:{
    fontSize: 20,
    margin: 1,
    marginTop:10,
    padding:1,
    textAlign: "center",

  },
  text:{
    margin: 10

  }
}));

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Paper elevation={1}>
      <Typography className={classes.title} >
          Please Filled Out Following Form 
        </Typography>
        <Grid item className={classes.text}>
        Remember that the sample audit count is a test to show that the election equipment worked properly. If the hand count is different than the machine count, that difference must be explained. However, a difference in the count does NOT change election results.
        </Grid>
      </Paper>
    </div>
  );
}
