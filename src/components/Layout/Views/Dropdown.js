import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DropDownList(props) {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (props.adhoc) {
      setSelectedValue('1');
      navigate('/new-post/adhoc');
    } else if (props.post) {
      setSelectedValue('2');
      navigate('/new-post/event');
    }
  }, [props.adhoc, props.post, navigate]);

  const handleSelectionChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    if (value === '1') {
      navigate('/new-post/adhoc');
    } else if (value === '2') {
      navigate('/new-post/event');
    }
  };

  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="3">
        {props.Label}
      </Form.Label>
      <Col sm={7}>
        <Form.Select
          aria-label="Default select example"
          value={selectedValue}
          onChange={handleSelectionChange}
        >
          <option disabled value="">
            Select Job Type
          </option>
          <option value="1">Ad-Hoc Job</option>
          <option value="2">Announcement</option>
        </Form.Select>
      </Col>
    </Form.Group>
  );
}

export default DropDownList;