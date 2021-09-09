import React, { useReducer } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MuiPickersUtilsProvider,TimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { createTheme, ThemeProvider,makeStyles } from '@material-ui/core/styles';
import {AppBar,Button,CssBaseline,Grid,Paper, Typography } from "@material-ui/core"
import {LocalAtm} from '@material-ui/icons';
import TimeCard from "./TimeCard"

const breakTime = 20;
const actions = {
  SET_START_TIME:"set_start_time",
  SET_END_TIME:"set_end_time"
}

const timeReducer = (state,action)=>{
  switch(action.type){
    case actions.SET_START_TIME:
        return {start:action.payload,end:state.end}
    case actions.SET_END_TIME:
        return {start:state.start,end:action.payload}
     default:
       return state
  }
}

function App() {

  const [state,dispatch] = useReducer(timeReducer,{start:Date.now(),end:Date.now()})
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  var millsWorked = 0;
  if(state.start.from && state.end.from) {
    millsWorked = state.end.diff(state.start) 
  }else{
    millsWorked = state.end - state.start;
  }
  const hoursWorked = Math.max(0,(Math.round(100 *(millsWorked/ 1000 / 60 -  breakTime )/ 60)/100))
  const segmentsWorked = hoursWorked * 4;
  const theme = React.useMemo(
    () =>
      createTheme({
      
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      
      }),
    [prefersDarkMode],
  );


//Style our App

const useStyles = makeStyles(myStyles)

const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
      <CssBaseline/>
      <Grid container className={classes.root}>
      <AppBar position="sticky">
        <Grid container justifyContent="center" xs={12}>
          <Grid className={classes.leftLogo} alignItems="center" xs={2} item>
            <LocalAtm  className={classes.logoAtmIcon}/>
            </Grid>
            <Grid justifyContent="center" alignItems="center" className={classes.appTitle} xs={9} item>
              <Typography className={classes.titleText}>GECS</Typography >
            </Grid>
        </Grid>
        </AppBar>
        <Grid className={classes.appBody} spacing={24} container item xs={12}>
          <Grid className={classes.pickerGrid} xs={12} sm={6}   item>
          <Paper className={classes.timerPickerPaper}>
            <TimePicker
            className={classes}
            displayStaticWrapperAs="mobile"
            label="Start Time"
              value={state.start}
               onChange={ (value)=>{
                dispatch({type:actions.SET_START_TIME,payload:value})
            }} />
        </Paper>
        </Grid>
      <Grid className={classes.pickerGrid} xs={12} sm={6}  item>
        <Paper className={classes.timerPickerPaper}>
            <TimePicker
            className={classes}
            displayStaticWrapperAs="mobile"
            label="End Time"
              value={state.end}
               onChange={ (value)=>{
                dispatch({type:actions.SET_END_TIME,payload:value})
            }} />
        </Paper>
        </Grid>
        <Grid className={classes.pickerGrid} xs={12}   item>
          <TimeCard  segments={segmentsWorked} hours={hoursWorked}/>
        </Grid>
        </Grid>
        </Grid>
        </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;

const myStyles = (theme)=>({
  root:{
    flexGrow:1,
    '&$focused': {
      color: '#000',
    },
  },
  focused:{},
  leftLogo:{
    padding:theme.spacing(1)
  },
  logoAtmIcon:{
    fontSize:"40px"
  },
  appTitle:{
    textAlign:"center"
  },
  titleText:{
    fontSize:"30px",
    verticalAlign:"center",
    margin:"auto"
  },
  appBody:{
    padding:theme.spacing(3)
  },
  timerPickerPaper:{
    padding:theme.spacing(3),
    margin:theme.spacing(3)
  },
  pickerGrid:{
  }
})
