import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import DropDownList from '../Layout/Views/Dropdown';
import Textarea from '../Layout/Views/Textarea';
import BModal from '../Layout/Views/BModal';
import Heading_Schedule from '../Layout/Views/Heading_Schedule';
import TextBox from '../Layout/Views/TextBox';

function CreatePostEvent() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [postTime, setPostTime] = useState('');
  const [postDate, setPostDate] = useState('');

    
  const handleValueChange = (value, label) => {
    console.log(label);
    if (label === "Date") {
        setPostDate(value)
    } else if (label === "Time") {
        setPostTime(value);
    }
    
  };

    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Heading_Schedule page="Create Post" b_name="Post" b_name_two="Schedule" />
            {/* <Row>
              <Col lg={6} md={10} xs={12}>
                  <DropDownList Label="Job Type" post="2"/>
                  <TextBox r="required" style={{ fontWeight: 'bold' }} Label="Post Date*" value={postDate} onChange={handleValueChange} placeholder="Please schedule (Top Right)" />
                  <TextBox r="required" style={{ fontWeight: 'bold' }} Label="Post Time*" value={postTime} onChange={handleValueChange} placeholder="Please schedule (Top Right)" />
              </Col>
            </Row> */}

            <Col lg={6} md={10} xs={12}>
              <Textarea r="true" rows={13} Label="Message"/>
            </Col>

            <Col lg={6} md={12} xs={12}>
              <BModal source="https://picsum.photos/625/325" header="Attach Image" Label="Attach Image" />
            </Col>
            
          </Row>
        </Container>
      </Form>
    );
  }

export default CreatePostEvent;
