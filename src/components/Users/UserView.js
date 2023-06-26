import React from "react";
import Col from "react-bootstrap/Col";
import LabelText from "../Layout/Views/LabelText";
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';
import TextBox from "../Layout/Views/TextBox";
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

function UserView() {
    return (
        <div className="d-flex justify-content-center">
            <Container>
                <Row>
                    <Col style={{border:"1px solid red"}} lg={6} md={6} xs={12}>
                        <TextBox Label="Name" pholder="Gabriel Loh Yee Xun" disabled={true} style={{marginTop:"5%"}}/>
                        <TextBox Label="NRIC" pholder="S1234567G" disabled={true}/>
                        <TextBox Label="Address" pholder="123 ABC Street" disabled={true}/>
                        <TextBox Label="Contact" pholder="9123 4567" disabled={true}/>
                        <TextBox Label="Telegram" pholder="@tele_handle" disabled={true}/>
                        <TextBox Label="Affiliation" pholder="Lumens" disabled={true}/>
                    </Col>
                    <Col style={{border:"1px solid red"}} lg={6} md={6} xs={12}>
                        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100%' }}>
                            <Image src="https://picsum.photos/600/300" fluid/>
                        </div>
                    </Col>
                    <Col style={{border:"1px solid red"}} lg={6} md={6} xs={12}>
                        col
                    </Col>
                    <Col style={{border:"1px solid red"}} lg={6} md={6} xs={12}>
                        col
                    </Col>
                </Row>
            </Container>
        </div>        
    )
}

export default UserView;
