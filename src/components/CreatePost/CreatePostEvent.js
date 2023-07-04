import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DropDownList from '../Layout/Views/Dropdown';
import Textarea from '../Layout/Views/Textarea';
import BModal from '../Layout/Views/BModal';
import Heading_Schedule from '../Layout/Views/Heading_Schedule';

function CreatePostEvent() {

    return (
        <Container>
            <Row>
                <Heading_Schedule page="Create Post" b_name="Post" b_name_two="Schedule" />
                <Col lg={6} md={10} xs={12}>
                    <DropDownList Label="Job Type" post="2"/>
                    <Textarea Label="Template" rows="13" />
                </Col>
                <Col lg={12} md={12} xs={12}>
                    <BModal source="https://picsum.photos/625/300" header="Attach Image" Label="Attach Image" />
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePostEvent;
