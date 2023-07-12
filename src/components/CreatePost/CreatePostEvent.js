import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import axios from 'axios';

import DropDownList from '../Layout/Views/Dropdown';
import Textarea from '../Layout/Views/Textarea';
import BModal from '../Layout/Views/BModal';
import Heading_Schedule from '../Layout/Views/Heading_Schedule';
import TextBox from '../Layout/Views/TextBox';
import authHeader from '../../services/auth-header';

const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINT = "/api/post/eventcreate";

function CreatePostEvent() {
  const [validated, setValidated] = useState(false);
  // const [postTime, setPostTime] = useState('');
  // const [postDate, setPostDate] = useState('');
  const [sendMessage,setSendMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return
    }
    try {
      const currentDate = new Date();
      const currentTimeString = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
      const currentDateString = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
      const data = {
        type: 'Announcement',
        message:sendMessage,
        datetime: new Date(`${currentDateString} ${currentTimeString}`),
        status:'Posted',
      }
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINT}`,{data:data}, { headers: authHeader() });
      setSendMessage('');

    }catch (error){
      console.error(error);
    }
    setValidated(false);

  };

  // const handleValueChange = (value, label) => {
  //   console.log(label);
  //   if (label === "Date") {
  //     setPostDate(value)
  //   } else if (label === "Time") {
  //     setPostTime(value);
  //   }

  // };

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
            <Textarea onChange={(e)=>setSendMessage(e.target.value)} value={sendMessage} r="true" rows={13} Label="Message" />
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
