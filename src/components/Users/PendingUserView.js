import React, { useEffect, useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import AESCipher from "../../services/encryption.js";



import TextBox from "../Layout/Views/TextBox";
import PendingUserHeading from "../Layout/Views/PendingUserHeading";
import Cordion from "../Layout/Views/Cordion";
import authHeader from "../../services/auth-header";

const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINT = "/api/user/profile/";

function PendingUserView(props) {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData(id);
    }, [id]);

    const fetchUserData = (userId) => {
        const endpoint = `${API_BASE_URL}${API_ENDPOINT}${userId}`;
        axios.get(endpoint, { headers: authHeader() })
            .then((response) => {
                const pendingUserData = response.data.data;
                console.log("Pending User Data:", pendingUserData);

                if (pendingUserData.nric_front || pendingUserData.nric_back) {
                    

                    try {
                        // const decryptedNricFront = aesCipher.decrypt(pendingUserData.nric_front);
                        // console.log("Decrypted NRIC Front:", decryptedNricFront);

                        // const decryptedNricBack = aesCipher.decrypt(pendingUserData.nric_back);
                        // console.log("Decrypted NRIC Back:", decryptedNricBack);

                        setUserData({
                            ...pendingUserData,
                            decryptedNricFront,
                            decryptedNricBack
                        });
                    } catch (error) {
                        console.log("Decryption error:", error);
                        setUserData(pendingUserData);
                    }
                } else {
                    setUserData(pendingUserData);
                }
            })
            .catch((error) => {
                console.log("API Error:", error);
            });
    };

    const { name, nricId, address, car_model, car_capacity, region, contact, telehandle, affiliation, car_plate, decryptedNricFront, decryptedNricBack, certificate } = userData || {};

    const displayImage = (data) => {

        if (!data) return null;
        const blob = new Blob([data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        return <img src={imageUrl} alt="Decrypted NRIC" />;
    };

    return (
        <Container>
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
                    {decryptedNricFront && <div>{displayImage(decryptedNricFront)}</div>}
                    {decryptedNricBack && <div>{displayImage(decryptedNricBack)}</div>}
                    <Cordion
                        source="https://picsum.photos/500/300"
                        front_license={decryptedNricFront}
                        back_license={decryptedNricBack}
                        certifications={certificate}
                        header_one="Driver's License"
                        header_two="NRIC"
                        disabled="true"
                    />
                    <hr />
                </Col>

            </Row>
        </Container>
    );
}

export default PendingUserView;
