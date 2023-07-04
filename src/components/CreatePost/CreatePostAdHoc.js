import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DropDownList from '../Layout/Views/Dropdown';
import TextBox from '../Layout/Views/TextBox';
import Textarea from '../Layout/Views/Textarea';
import TimePicker from '../Layout/Views/TimePicker';
import DatePicker from '../Layout/Views/DatePicker';
import Heading_Schedule from '../Layout/Views/Heading_Schedule';

function CreatePostAdHoc() {

    return (
        <Container>
            <Row>
                <Heading_Schedule page="Create Post" b_name="Post" b_name_two="Schedule" />
                <Col lg={6} md={6} xs={12}>
                    <DropDownList Label="Job Type" adhoc="1" />
                    <TimePicker Label="Pickup Time"/>
                    <DatePicker Label="Pickup Date"/>
                    <TextBox Label="Location" />
                    <TextBox Label="Destination" />
                    <TimePicker Label="Drop-off Time"/>
                    <DatePicker Label="Drop-off Date" />
                    <TextBox Label="Price" />
                    <TextBox Label="Payout" />
                    
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <Textarea Label="Template" rows="13" />
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePostAdHoc;