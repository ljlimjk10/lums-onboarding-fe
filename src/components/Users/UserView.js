import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

import TextBox from '../Layout/Views/TextBox';
import Heading from '../Layout/Views/Heading';
import Cordion from '../Layout/Views/Cordion';
import authHeader from '../../services/auth-header.js';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3001';
const API_ENDPOINT = '/api/user/profile/';

function UserView(props) {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUserData(id);
    }, [id]);

    const fetchUserData = async (userId) => {
        try {
            setIsLoading(true); // Set loading state to true before making the API request

            const endpoint = `${API_BASE_URL}${API_ENDPOINT}${userId}`;
            const response = await axios.get(endpoint, { headers: authHeader() });
            const pendingUserData = response.data.data;

            if (
                pendingUserData.nric_front ||
                pendingUserData.nric_back ||
                pendingUserData.license_front ||
                pendingUserData.license_back
            ) {
                try {
                    const telegramEndpoint = `${API_BASE_URL}/api/user/search/${pendingUserData.telehandle}`;
                    const telegramResponse = await axios.get(telegramEndpoint, {
                        headers: authHeader(),
                    });
                    const data_access = telegramResponse.data.access_token;
                    const NRICUrlEndpoint = `${API_BASE_URL}/api/user/display/nric`;
                    const NRICUrlResponse = await axios.get(NRICUrlEndpoint, {
                        headers: { Authorization: `Bearer ${data_access}` },
                    });
                    const NRICUrlArrays = NRICUrlResponse.data;
                    const LicenseUrlEndpoint = `${API_BASE_URL}/api/user/display/license`;
                    const LicenseUrlResponse = await axios.get(LicenseUrlEndpoint, {
                        headers: { Authorization: `Bearer ${data_access}` },
                    });
                    const LicenseUrlArrays = LicenseUrlResponse.data;
                    setUserData({
                        ...pendingUserData,
                        nric_front: NRICUrlArrays[0] || '',
                        nric_back: NRICUrlArrays[1] || '',
                        license_front: LicenseUrlArrays[0] || '',
                        license_back: LicenseUrlArrays[1] || '',
                    });
                } catch (error) {
                    console.log('Decryption error:', error);
                    setUserData(pendingUserData);
                }
            } else {
                setUserData(pendingUserData);
            }
        } catch (error) {
            console.log('API Error:', error);
        } finally {
            setIsLoading(false); // Set loading state to false after the API request is completed
        }
    };

    const handleInputChange = (fieldName, value) => {
        setUserData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleImageUpload = (fieldName, file) => {
        console.log(file);
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            setUserData((prevData) => ({
                ...prevData,
                [fieldName]: base64String,
            }));
        };
        reader.readAsDataURL(file);
    };

    const updateUser = async (id) => {
        try {
            const endpoint = `${API_BASE_URL}/api/user/update/${id}`;
            const response = await axios.post(endpoint, userData, {
                headers: authHeader(),
            });
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
        license_front,
        license_back,
        nric_front,
        nric_back,
        certificate,
    } = userData || {};

    return (
        <Container>
            {isLoading ? (
                <div className="text-center">Loading...</div> // Render loading indicator while loading
            ) : (
                <Row>
                    <Heading
                        id={id}
                        update={updateUser}
                        onClick={props.handleGoBack}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                        status="Approved"
                        page="User Information"
                        name="Edit Profile"
                    />
                    <Col lg={6} md={6} xs={12}>
                        <TextBox
                            Label="Name"
                            disabled={!isEditMode}
                            value={name}
                            onChange={(value, label) => handleInputChange('name', value)}
                        />
                        <TextBox
                            Label="NRIC"
                            disabled={!isEditMode}
                            value={nricId}
                            onChange={(value, label) => handleInputChange('nricId', value)}
                        />
                        <TextBox
                            Label="Address"
                            disabled={!isEditMode}
                            value={address}
                            onChange={(value, label) => handleInputChange('address', value)}
                        />
                        <TextBox
                            Label="Make/Model"
                            disabled={!isEditMode}
                            value={car_model}
                            onChange={(value, label) => handleInputChange('car_model', value)}
                        />
                        <TextBox
                            Label="Capacity"
                            disabled={!isEditMode}
                            value={car_capacity}
                            onChange={(value, label) => handleInputChange('car_capacity', value)}
                        />
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <TextBox
                            Label="Location"
                            disabled={!isEditMode}
                            value={region}
                            onChange={(value, label) => handleInputChange('region', value)}
                        />
                        <TextBox
                            Label="Contact"
                            disabled={!isEditMode}
                            value={contact}
                            onChange={(value, label) => handleInputChange('contact', value)}
                        />
                        <TextBox
                            Label="Telegram"
                            disabled={!isEditMode}
                            value={telehandle}
                            onChange={(value, label) => handleInputChange('telehandle', value)}
                        />
                        <TextBox
                            Label="Entity"
                            disabled={!isEditMode}
                            value={affiliation}
                            onChange={(value, label) => handleInputChange('affiliation', value)}
                        />
                        <TextBox
                            Label="Car plate"
                            disabled={!isEditMode}
                            value={car_plate}
                            onChange={(value, label) => handleInputChange('car_plate', value)}
                        />
                    </Col>
                    <Col lg={12} md={12} xs={12}>
                        <Cordion
                            front_license={license_front}
                            back_license={license_back}
                            front_nric={nric_front}
                            back_nric={nric_back}
                            certifications={certificate}
                            header_one="Driver's License"
                            header_two="NRIC"
                            disabled={!isEditMode}
                            handleImageUpload={handleImageUpload}
                        />
                        <hr />
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default UserView;
