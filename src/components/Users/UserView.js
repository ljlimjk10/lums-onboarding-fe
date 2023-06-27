import React from "react";
import Col from "react-bootstrap/Col";
import LabelText from "../Layout/Views/LabelText";
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';
import TextBox from "../Layout/Views/TextBox";
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import "../../index.css";
import Heading from "../Layout/Views/Heading";


function UserView() {
    return (
        <Container fluid>
            <Row>
                <Heading status="Approved" page="User Information" vis="invisible" vistwo="invisible" />
                <Col style={{border:"1px solid red"}} lg={6} md={6} xs={12}>
                    Name
                    NRIC
                    Address
                </Col>
                <Col style={{border:"1px solid red"}} lg={6} md={6} xs={12}>
                    Contact
                    Telegram 
                    Entity
                </Col>
                <Col style={{border:"1px solid red"}} lg={12} md={12} xs={12}>
                    User Documents
                </Col>
            </Row>
        </Container>
    )
}

export default UserView;
