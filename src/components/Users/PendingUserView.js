import React, { useEffect, useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

import TextBox from "../Layout/Views/TextBox";
import PendingUserHeading from "../Layout/Views/PendingUserHeading";
import Cordion from "../Layout/Views/Cordion";
import authHeader from "../../services/auth-header";

const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINT = "/api/user/profile/";

function PendingUserView(props) {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // New state variable for loading indicator

    useEffect(() => {
        fetchUserData(id);
    }, [id]);

    const fetchUserData = async (userId) => {
        try {
            setIsLoading(true); // Set loading state to true before making the API request

            const endpoint = `${API_BASE_URL}${API_ENDPOINT}${userId}`;
            const response = await axios.get(endpoint, { headers: authHeader() });
            const pendingUserData = response.data.data;
            console.log("Pending User Data:", pendingUserData);

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
                    const encodedNRICUrlEndpoint = `${API_BASE_URL}/api/user/display/nric`;
                    const encodedNRICUrlResponse = await axios.get(encodedNRICUrlEndpoint, {
                        headers: { Authorization: `Bearer ${data_access}` },
                    });
                    const encodedNRICUrlArrays = encodedNRICUrlResponse.data;
                    const encodedLicenseUrlEndpoint = `${API_BASE_URL}/api/user/display/license`;
                    const encodedLicenseUrlResponse = await axios.get(
                        encodedLicenseUrlEndpoint,
                        { headers: { Authorization: `Bearer ${data_access}` } }
                    );
                    const encodedLicenseUrlArrays = encodedLicenseUrlResponse.data;
                    setUserData({
                        ...pendingUserData,
                        encodedNricFront: encodedNRICUrlArrays[0] || "",
                        encodedNricBack: encodedNRICUrlArrays[1] || "",
                        encodedLicenseFront: encodedLicenseUrlArrays[0] || "",
                        encodedLicenseBack: encodedLicenseUrlArrays[1] || "",
                    });
                } catch (error) {
                    console.log("Decryption error:", error);
                    setUserData(pendingUserData);
                }
            } else {
                setUserData(pendingUserData);
            }
        } catch (error) {
            console.log("API Error:", error);
        } finally {
            setIsLoading(false); // Set loading state to false after the API request is completed
        }
    };

    const { name, nricId, address, car_model, car_capacity, region, contact, telehandle, affiliation, car_plate, encodedLicenseFront, encodedLicenseBack, encodedNricFront, encodedNricBack, certificate } = userData || {};

    return (
        <Container>
            {isLoading ? (
                <div className="text-center">Loading...</div> // Render loading indicator while loading
            ) : (
                <Row>
                    <PendingUserHeading id={id} page="Pending User" b_name="Reject" b_name_two="Approve" />
                    <Col lg={6} md={6} xs={12}>
                        <TextBox Label="Name" disabled="true" value={name} />
                        <TextBox Label="NRIC" disabled="true" value={nricId} />
                        <TextBox Label="Address" disabled="true" value={address} />
                        <TextBox Label="Make/Model" disabled="true" value={car_model} />
                        <TextBox Label="Capacity" disabled="true" value={car_capacity} />
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <TextBox Label="Location" disabled="true" value={region} />
                        <TextBox Label="Contact" disabled="true" value={contact} />
                        <TextBox Label="Telegram" disabled="true" value={telehandle} />
                        <TextBox Label="Entity" disabled="true" value={affiliation} />
                        <TextBox Label="Car plate" disabled="true" value={car_plate} />
                    </Col>
                    <Col lg={12} md={12} xs={12}>
                        <Cordion
                            front_license={encodedLicenseFront}
                            back_license={encodedLicenseBack}
                            front_nric={encodedNricFront}
                            back_nric={encodedNricBack}
                            certifications={certificate}
                            header_one="Driver's License"
                            header_two="NRIC"
                            disabled="true"
                        />
                        <hr />
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default PendingUserView;
