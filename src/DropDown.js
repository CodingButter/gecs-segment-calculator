import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft:"auto"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DropDown({state,dispatch}) {
  const classes = useStyles();

  const handleChange = (event) => {
    dispatch(event.target.value)
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Break Time</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={state}
          onChange={handleChange}
        >
          <MenuItem value={state}>
          </MenuItem>
          {["None","Five","Ten","Fifteen","Twenty","Twenty-Five","Thirty"].map((minutes,index)=><MenuItem key={index} value={index*5}>{minutes}</MenuItem>)}
        </Select>
        <FormHelperText>How Long was your break?</FormHelperText>
    </FormControl>
  );
}