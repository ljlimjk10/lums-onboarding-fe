import React from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const TimePicker = (props) => {
  const defaultTime = moment().format('HH:mm'); // Get the current time

  return (

    <Form.Group as={Row} className="mb-3" style={props.style}>
      <Form.Label column sm="3">
          {props.Label}
      </Form.Label>
      <Col sm="7">
        <DateTime
            inputProps={{ className: 'form-control' }}
            dateFormat={false} // Remove the dateFormat prop to disable date selection
            timeFormat="HH:mm"
            defaultValue={defaultTime} // Set the default value to the current time
          />
      </Col>
    </Form.Group>
  );
};

export default TimePicker;
