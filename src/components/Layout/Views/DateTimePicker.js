import React from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const DateTimePicker = () => {
  const defaultDate = moment().startOf('day'); // Get the current date

  const dateFormat = "YYYY/MM/DD";

  return (
    <div className="container">
      <div className="form-group">
        <DateTime
          inputProps={{ className: 'form-control' }}
          dateFormat={dateFormat}
          defaultValue={defaultDate} // Set the default value to the current date
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
