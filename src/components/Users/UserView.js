import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

import TextBox from "../Layout/Views/TextBox";
import Heading from "../Layout/Views/Heading";
import Cordion from "../Layout/Views/Cordion";
import authHeader from "../../services/auth-header.js";
import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

function UserView(props) {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        fetchUserData(id);
    }, [id]);

    const fetchUserData = (userId) => {
        const endpoint = `${BASE_URL}/api/user/profile/${userId}`;

        axios
            .get(endpoint, { headers: authHeader() })
            .then((response) => {
                const userData = response.data.data;
                setUserData(userData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleInputChange = (fieldName, value) => {
        setUserData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const updateUser = async (id) => {
        try {
            
            const endpoint = `${BASE_URL}/api/user/update/${id}`;
            const response = await axios.post(endpoint, userData, {
                headers: authHeader(),
            });
            console.log(response);
            const updatedUser = response.data.user;
            setUserData(updatedUser);
            setIsEditMode(false);
            // Show success message or perform additional actions
        } catch (error) {
            console.error(error);
            // Show error message or handle the error
        }
    };

    const {
        name,
        nricId,
        address,
        car_model,
        car_capacity,
        region,
        contact,
        telehandle,
        affiliation,
        car_plate,
        nric_front,
        nric_back,
        certificate,
    } = userData || {};

    return (
        <Container>
            <Row>
                <Heading id={id} update={updateUser} onClick={props.handleGoBack} isEditMode={isEditMode} setIsEditMode={setIsEditMode} status="Approved" page="User Information" name="Edit Profile" />
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Name" disabled={!isEditMode} value={name} onChange={(value, label) => handleInputChange("name", value)} />
                    <TextBox Label="NRIC" disabled={!isEditMode} value={nricId} onChange={(value, label) => handleInputChange("nricId", value)} />
                    <TextBox Label="Address" disabled={!isEditMode} value={address} onChange={(value, label) => handleInputChange("address", value)} />
                    <TextBox Label="Make/Model" disabled={!isEditMode} value={car_model} onChange={(value, label) => handleInputChange("car_model", value)} />
                    <TextBox Label="Capacity" disabled={!isEditMode} value={car_capacity} onChange={(value, label) => handleInputChange("car_capacity", value)} />
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Location" disabled={!isEditMode} value={region} onChange={(value, label) => handleInputChange("region", value)} />
                    <TextBox Label="Contact" disabled={!isEditMode} value={contact} onChange={(value, label) => handleInputChange("contact", value)} />
                    <TextBox Label="Telegram" disabled={!isEditMode} value={telehandle} onChange={(value, label) => handleInputChange("telehandle", value)} />
                    <TextBox Label="Entity" disabled={!isEditMode} value={affiliation} onChange={(value, label) => handleInputChange("affiliation", value)} />
                    <TextBox Label="Car plate" disabled={!isEditMode} value={car_plate} onChange={(value, label) => handleInputChange("car_plate", value)} />
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