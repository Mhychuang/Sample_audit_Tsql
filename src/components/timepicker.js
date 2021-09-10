import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { parseISO } from 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { convertToLocalTime } from 'date-fns-timezone';





export default function DatePickers(props) {

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          //margin="small"  
          id="date-picker-dialog"
          label="Select Date of count"
          format="MM/dd/yyyy"
          value={props.selectedDate}
          onChange={props.onDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          error ={props.formValidation.DateOfCount}
          helperText = { props.formValidation.DateOfCount ?'Required':''}
        />
        <KeyboardTimePicker
          //margin="normal"
          id="time-picker"
          label="Select Time of count"
          value={props.selectedTime}
          onChange={props.onTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          error ={props.formValidation.TimeOfCount}
          helperText = { props.formValidation.TimeOfCount ?'Required':''}
        />

        </Grid>
      </MuiPickersUtilsProvider>
    );
  }

 