import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // flexWrap: 'wrap',
    // '& > *': {
    //   margin: 1,
      
    //   padding: 5,
    //   width: theme.spacing(100),
    //   height: theme.spacing(15),
    // },
    width: '100%'
  },
  title:{
    fontSize: 20,
    margin: 2,
    marginTop:10,
    padding:0,
    textAlign: "center",

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
        Remember that the sample audit count is a test to show that the election equipment worked properly. If the hand count is different than the machine count, that difference must be explained. However, a difference in the count does NOT change election results.
      </Paper>
    </div>
  );
}
