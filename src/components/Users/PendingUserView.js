import React, { useEffect, useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from "react-router-dom";

import TextBox from "../Layout/Views/TextBox";
import PendingUserHeading from "../Layout/Views/PendingUserHeading";
import Cordion from "../Layout/Views/Cordion";
import authHeader from "../../services/auth-header";

const API_BASE_URL= "http://localhost:3001";
const API_ENDPOINT= "/api/user/profile/";


function PendingUserView(props) {
    const {id} = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData(id);
    }, [id]);

    const fetchUserData = (userId) => {
        const endpoint = `${API_BASE_URL}${API_ENDPOINT}${userId}`;
        axios.get(endpoint,{headers:authHeader()})
        .then((response)=>{
            const pendingUserData = response.data.data;
            setUserData(pendingUserData);
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    const { name, nricId, address, car_model, car_capacity, region, contact, telehandle, affiliation, car_plate, nric_front, nric_back, certificate } = userData || {};

    return (
        <Container>
            <Row>
                <PendingUserHeading id={id}  page="Pending User" b_name="Reject" b_name_two="Approve" onClick={props.onClick} />
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Name" disabled="true" current={name} />
                    <TextBox Label="NRIC" disabled="true" current={nricId} />
                    <TextBox Label="Address" disabled="true" current={address} />
                    <TextBox Label="Make/Model" disabled="true" current={car_model} />
                    <TextBox Label="Capacity" disabled="true" current={car_capacity} />
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Location" disabled="true" current={region} />
                    <TextBox Label="Contact" disabled="true" current={contact} />
                    <TextBox Label="Telegram" disabled="true" current={telehandle} />
                    <TextBox Label="Entity" disabled="true" current={affiliation} />
                    <TextBox Label="Car plate" disabled="true" current={car_plate} />
                </Col>
                <Col lg={12} md={12} xs={12}>
                    <Cordion source="https://picsum.photos/500/300" front_license={nric_front} back_license={nric_back} certifications={certificate} header_one="Driver's License" header_two="NRIC" disabled="true" />
                    <hr />
                </Col>
            </Row>
        </Container>
    );
}

export default PendingUserView;
