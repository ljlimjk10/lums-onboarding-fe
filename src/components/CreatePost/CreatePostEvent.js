import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [data, setData] = useState({});
  const [sendMessage, setSendMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    try {
      const currentDate = new Date();
      const currentDateString = currentDate.toISOString().split('T')[0];
      const currentTimeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',timeZone:'Asia/Singapore' });
      const datetimeString = `${currentDateString} ${currentTimeString}`;
      const newData = {
        type: 'Announcement',
        message: sendMessage,
        datetime: new Date(datetimeString),
        status: 'Posted',
      };

      const formData = new FormData();
      formData.append('type', newData.type);
      formData.append('message', newData.message);
      formData.append('datetime', newData.datetime);
      formData.append('status', newData.status);

      if (data.event_image instanceof File) {
        formData.append('event_image', data.event_image);
      }
      console.log(newData);
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINT}`, formData, { headers: authHeader() });
      setSendMessage('');
      navigate('/posts');
    } catch (error) {
      console.error(error);
    }
    setValidated(false);
  };




  const handleImageUpload = (fieldName, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      setData((prevData) => ({
        ...prevData,
        [`display_${fieldName}`]: reader.result,
        [fieldName]: file,
        ["source"]:base64Data,
      }));
      setUploadedImage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const {display_event_image,source} = data || {}
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Heading_Schedule page="Create Post" b_name="Post" b_name_two="Schedule" />
          <Col lg={6} md={10} xs={12}>
            <DropDownList Label="Job Type" post="1" />
            <Textarea onChange={(e) => setSendMessage(e.target.value)} value={sendMessage} r="true" rows={13} Label="Message" />
            <Form.Group className="mb-3">
              <Form.Check label="Include Poll" />
            </Form.Group>
          </Col>
          <Col lg={6} md={12} xs={12}>
            <BModal handleImageUpload={handleImageUpload} header="Attach Image" Label="Attach Image" fieldName="event_image" source={source}/>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default CreatePostEvent;
