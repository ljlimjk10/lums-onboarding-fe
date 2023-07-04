import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import TextBox from "../Layout/Views/TextBox";
import Heading_two from "../Layout/Views/Heading_two";
import Cordion from "../Layout/Views/Cordion";
import { data } from "./data"

function PendingUserView(props) {
    const id = props.userId;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData(id);
    }, [id]);

    const fetchUserData = (userId) => {
        const filteredData = data.filter((item) => item.id === userId);
        setUserData(filteredData[0]);
    };

    const { Name, NRIC, Address, Make_Model, Capacity, Region, Contact, Telegram, Entity, Carplate, "Identification Photo (Front)": IdentificationPhotoFront, "Identification Photo (Back)": IdentificationPhotoBack, Certifications, Status} = userData || {};

    return (
        <Container>
            <Row>
                <Heading_two status={Status} page="Pending User" b_name="Reject" b_name_two="Approve" />
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Name" disabled="true" current={Name} />
                    <TextBox Label="NRIC" disabled="true" current={NRIC} />
                    <TextBox Label="Address" disabled="true" current={Address} />
                    <TextBox Label="Make/Model" disabled="true" current={Make_Model} />
                    <TextBox Label="Capacity" disabled="true" current={Capacity} />
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Location" disabled="true" current={Region} />
                    <TextBox Label="Contact" disabled="true" current={Contact} />
                    <TextBox Label="Telegram" disabled="true" current={Telegram} />
                    <TextBox Label="Entity" disabled="true" current={Entity} />
                    <TextBox Label="Car plate" disabled="true" current={Carplate} />
                </Col>
                <Col lg={12} md={12} xs={12}>
                    <Cordion source="https://picsum.photos/500/300" front_license={IdentificationPhotoFront} back_license={IdentificationPhotoBack} certifications={Certifications} header_one="Driver's License" header_two="NRIC" />
                    <hr />
                </Col>
            </Row>
        </Container>
    );
}

export default PendingUserView;
