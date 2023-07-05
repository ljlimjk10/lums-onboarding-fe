import React from 'react';
import DateTime from 'react-datetime';
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const TimePicker = (props) => {
  const defaultTime = moment().format('HH:mm');
  const handleChange = (momentObject) => {
    const formattedTime = moment(momentObject).format('HH:mm');
    props.onChange(formattedTime, props.Label);
  };

  return (
    <Form.Group as={Row} className="mb-3" style={props.style}>
      <Form.Label column sm="3">
        {props.Label}
      </Form.Label>
      <Col sm="7">
        <DateTime
          value={props.value ? moment(props.value, 'HH:mm') : null}
          onChange={(e) => handleChange(e._d)}
          inputProps={{ className: 'form-control' }}
          dateFormat={false}
          timeFormat="HH:mm A"
          defaultValue={defaultTime}
        />
      </Col>
    </Form.Group>
  );
};

export default TimePicker;
