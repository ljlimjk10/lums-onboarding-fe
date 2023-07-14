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
      const currentTimeString = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
      const currentDateString = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
      const newData = {
        type: 'Announcement',
        message: sendMessage,
        datetime: new Date(`${currentDateString} ${currentTimeString}`),
        status: 'Posted',
      };
      setData(newData);
      console.log(newData);
      const response = await axios.post(`${API_BASE_URL}${API_ENDPOINT}`, newData, { headers: authHeader() });
      setSendMessage('');
      navigate('/posts');
    } catch (error) {
      console.error(error);
    }
    setValidated(false);
  };

  const handleImageUpload = (fieldName, file) => {
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setData((prevData) => ({
        ...prevData,
        [fieldName]: base64String,
      }));
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Heading_Schedule page="Create Post" b_name="Post" b_name_two="Schedule" />
          <Col lg={6} md={10} xs={12}>
            <DropDownList Label="Job Type" post="1" />
            <Textarea onChange={(e) => setSendMessage(e.target.value)} value={sendMessage} r="true" rows={13} Label="Message" />
            {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />}
          </Col>
          <Col lg={6} md={12} xs={12}>
            <BModal handleImageUpload={handleImageUpload} header="Attach Image" Label="Attach Image" />
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default CreatePostEvent;
