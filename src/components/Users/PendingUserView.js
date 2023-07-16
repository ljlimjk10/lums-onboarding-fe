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
    const [certData, setCertData] = useState(null);

    useEffect(() => {
        fetchUserData(id);
    }, [id]);
    // const fetchDocData = async (certInfo) => {
    //     await Promise.all(
    //         certInfo.map(async (doc) => {
    //             const curDocType = doc.type;
    //             const curId = doc.userId;
    //             const responseDisplay = await axios.get(`${API_BASE_URL}/api/document/display/certs/${curDocType}/${curId}`);
    //             // Rest of your code using the responseDisplay
    //         })
    //     );
    // };




    const fetchUserData = async (userId) => {
        // try {
        //     const docEndpoint = `${API_BASE_URL}/api/document/certs/${userId}`; // "data":[] if empty
        //     const responseCerts = await axios.get(docEndpoint, { headers: authHeader() });
        //     if (responseCerts.data !== []) {
        //         const certInfo = responseCerts.data; // array
        //         fetchDocData(certInfo);

        //     }

        // } catch (error) {

        // }

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
                    let NRICUrlArrays = [];
                    let LicenseUrlArrays = [];

                    if (pendingUserData.nric_front && pendingUserData.nric_back) {
                        const NRICUrlEndpoint = `${API_BASE_URL}/api/user/display/nric`;
                        const NRICUrlResponse = await axios.get(NRICUrlEndpoint, {
                            headers: { Authorization: `Bearer ${data_access}` },
                        });
                        NRICUrlArrays = NRICUrlResponse.data;
                    }

                    if (pendingUserData.license_front && pendingUserData.license_back) {
                        const LicenseUrlEndpoint = `${API_BASE_URL}/api/user/display/license`;
                        const LicenseUrlResponse = await axios.get(LicenseUrlEndpoint, {
                            headers: { Authorization: `Bearer ${data_access}` },
                        });
                        LicenseUrlArrays = LicenseUrlResponse.data;
                    }

                    setUserData({
                        ...pendingUserData,
                        display_nric_front: NRICUrlArrays[0] || "",
                        display_nric_back: NRICUrlArrays[1] || "",
                        display_license_front: LicenseUrlArrays[0] || "",
                        display_license_back: LicenseUrlArrays[1] || "",
                    });
                } catch (error) {
                    console.log("Decryption error:", error);
                    setUserData(pendingUserData);
                }
            } else {
                setUserData({
                    ...pendingUserData,
                    display_nric_front: "",
                    display_nric_back: "",
                    display_license_front: "",
                    display_license_back: "",
                });
            }
        } catch (error) {
            console.log("API Error:", error);
        } finally {
            setIsLoading(false); // Set loading state to false after the API request is completed
        }
    };

    const { name, nricId, address, car_model, car_capacity, region, contact, telehandle, affiliation, car_plate, license_front, license_back, nric_front, nric_back, display_license_front, display_license_back, display_nric_front, display_nric_back, certificate } = userData || {};
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
                            front_license={display_license_front}
                            back_license={display_license_back}
                            front_nric={display_nric_front}
                            back_nric={display_nric_back}
                            certifications={certificate}
                            header_one="Driver's License"
                            header_two="NRIC"
                            header_three="Certificates"
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
