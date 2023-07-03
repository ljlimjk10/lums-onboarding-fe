import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <DatePicker
              selected={selectedDateTime}
              onChange={handleDateTimeChange}
              showTimeSelect
              dateFormat="Pp"
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
