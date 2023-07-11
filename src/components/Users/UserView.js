import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import axios from "axios";

import TextBox from "../Layout/Views/TextBox";
import 'bootstrap/dist/css/bootstrap.min.css';

// import Container from 'react-bootstrap/Container';

import "../../index.css";
import Heading from "../Layout/Views/Heading";
import Cordion from "../Layout/Views/Cordion";
import authHeader from "../../services/auth-header.js";
import { useParams } from "react-router-dom";


function UserView(props) {
    // console.log(data);
    const {id} = useParams();
    const [userData, setUserData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const BASE_URL = "http://localhost:3001"

    useEffect(() => {
        fetchUserData(id);
    }, [id]);
    // const { Name = '', NRIC = '', Address = '', Model = '', Capacity = '', Location = '', Contact = '', Telegram = '', Entity = '', Carplate = '' } = userData || {};

    const fetchUserData = (userId) => { // async
        const endpoint = `${BASE_URL}/api/user/profile/${userId}`;

        axios.get(endpoint,{headers:authHeader()})
            .then((response) => {
                const userData = response.data.data;
                setUserData(userData);
            })
            .catch((error) => {
                console.error(error);
            });
        // const filteredData = data.filter((item) => item.id === userId)
        // console.log(filteredData);
        // setUserData(filteredData[0]);
        // console.log(userData);
    }
    const [formData, setFormData] = useState({});
    const handleInputChange = (fieldName, value) => {
        setFormData(prevData => ({
            ...prevData,
            [fieldName]: value
        }));
    };

    const onChange = () =>{

    }


    const { name, nricId, address, car_model, car_capacity, region, contact, telehandle, affiliation, car_plate, nric_front, nric_back, certificate } = userData || {};

    return (
        <Container>
            <Row>
                <Heading id={id} onClick={props.handleGoBack} isEditMode={isEditMode} setIsEditMode={setIsEditMode} status="Approved" page="User Information" name="Edit Profile" />
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Name" disabled={!isEditMode} current={name} />
                    <TextBox Label="NRIC" disabled={!isEditMode} current={nricId} />
                    <TextBox Label="Address" disabled={!isEditMode} current={address} />
                    <TextBox Label="Make/Model" disabled={!isEditMode} current={car_model} />
                    <TextBox Label="Capacity" disabled={!isEditMode} current={car_capacity} />
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Location" disabled={!isEditMode} current={region} />
                    <TextBox Label="Contact" disabled={!isEditMode} current={contact} />
                    <TextBox Label="Telegram" disabled={!isEditMode} current={telehandle} />
                    <TextBox Label="Entity" disabled={!isEditMode} current={affiliation} />
                    <TextBox Label="Car plate" disabled={!isEditMode} current={car_plate} />
                </Col>
                <Col lg={12} md={12} xs={12}>
                    <Cordion source="https://picsum.photos/500/300" front_license={nric_front} back_license={nric_back} certifications={certificate} header_one="Driver's License" header_two="NRIC" disabled={!isEditMode} />
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default UserView;
