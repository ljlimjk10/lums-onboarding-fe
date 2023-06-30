import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextBox from "../Layout/Views/TextBox";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import "../../index.css";
import Heading from "../Layout/Views/Heading";
import Cordion from "../Layout/Views/Cordion";


function UserView(props) {
    return (
        <Container>
            <Row>
                <Heading status="Approved" page="User Information" b_name="Edit Profile"/>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Name" disabled="true" pholder="Gabriel Loh Yee Xun"/>
                    <TextBox Label="NRIC" disabled="true" pholder="S1234567G"/>
                    <TextBox Label="Address" disabled="true" pholder="123456"/>
                    <TextBox Label="Make/Model" disabled="true" pholder="Toyota xxx"/>
                    <TextBox Label="Capacity" disabled="true" pholder="4"/>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Location" disabled="true" pholder="West"/>
                    <TextBox Label="Contact" disabled="true" pholder="9123 4567"/>
                    <TextBox Label="Telegram" disabled="true" pholder="@telehandle"/>
                    <TextBox Label="Entity" disabled="true" pholder="Lumens"/>
                    <TextBox Label="Car plate" disabled="true" pholder="S123ABC"/>
                </Col>
                <Col lg={12} md={12} xs={12}>
                    <Cordion source="https://picsum.photos/500/300" header_one="Driver's License" header_two="NRIC"/>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default UserView;
