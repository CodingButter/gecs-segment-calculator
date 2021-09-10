import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    boxShadow:"none"
  },

  title: {
    fontSize: 14,
  },
  pos: {
    
  },
});

export default function SimpleCard({hours,segments}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
        <Typography className={classes.title} color="textSecondary" >
          Segments worked
        </Typography>
        <Typography variant="h5" component="h2">
          {segments}
        </Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography className={classes.title} color="textSecondary" >
          Hours worked
        </Typography>
        <Typography variant="h5" component="h2">
          {hours}
        </Typography>
        </Grid>
         </Grid>
          </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}