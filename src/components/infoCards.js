import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 70,
    margin: 0,
    padding:0,
    textAlign: "center",
    align: "center",
    minHeight: 5,
    height: '100%'

  },

  title: {
    fontSize: 14,
    margin: 0,
    padding:0,
  },
  pos: {
    margin: 0,
    padding:0,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} >
          {props.cardName}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          {props.CardValue || 'N\A'}
        </Typography>
      </CardContent>
    </Card>
  );
}
