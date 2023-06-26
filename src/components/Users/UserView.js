
import React from "react";
import Col from "react-bootstrap/Col";
import LabelText from "../Layout/Views/LabelText";
import Row from "react-bootstrap/Row";
import Form from 'react-bootstrap/Form';
import TextBox from "../Layout/Views/TextBox";
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserView() {
    return (
        <React.Fragment>
            <Col>
                <div className="justify-content-center" style={{ marginLeft: "5%" }}>
                    <TextBox Label="Name" pholder="Jozef Rayhill" style={{marginTop:"100px"}} disabled={true}/>
                    <TextBox Label="NRIC" pholder="K8101852S" disabled={true}/>
                    <TextBox Label="Address" pholder="25 Dapin Center" disabled={true}/>
                    <TextBox Label="Contact" pholder="63837130" disabled={true}/>
                    <TextBox Label="Telegram" pholder="ulxymmp" disabled={true}/>
                    <TextBox Label="Affiliation" pholder="Lumens" disabled={true}/>

                    <div className="justify-content-center" style={{marginTop:"100px"}}>
                        <Row>
                            <Col>
                                <Image src="https://picsum.photos/200" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Image src="https://picsum.photos/200" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Image src="https://picsum.photos/200" />
                            </Col>
                        </Row>
                    </div>
                </div>

            </Col>
        </React.Fragment>            
    )
}

export default UserView;