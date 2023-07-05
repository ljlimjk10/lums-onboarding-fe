import React from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const DatePicker = (props) => {

  const handleChange = (momentObject) => {
    const formattedDate = moment(momentObject).format('DD-MM-YYYY');
    props.onChange(formattedDate,props.Label);
  }
  return (
        <Form.Group as={Row} className="mb-3" style={props.style}>
            <Form.Label column sm="3">
                {props.Label}
            </Form.Label>
            <Col sm="7">
              <DateTime value={props.value ? moment(props.value, 'DD-MM-YYYY') : null}
              inputProps={{ className: 'form-control' }}
              dateFormat="DD-MM-YYYY"
              timeFormat={false}
              defaultValue={moment().format('YYYY-MM-DD')} onChange={e=>handleChange(e._d)}
              />
            </Col>
        </Form.Group>
  );
};

export default DatePicker;
