import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePickers(props) {
    // The first commit of Material-UI
    // const [selectedDate, setSelectedDate] = React.useState(new Date());
  
    // const handleDateChange = (date) => {
    //   setSelectedDate(date);
    // };
  
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          //margin="small"  
          id="date-picker-dialog"
          label="Select Date of count"
          format="MM/dd/yyyy"
          helperText=""
          value={props.selectedDate}
          onChange={props.onDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
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
        />

        </Grid>
      </MuiPickersUtilsProvider>
    );
  }

 