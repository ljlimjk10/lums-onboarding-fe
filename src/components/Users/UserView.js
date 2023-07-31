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
    const [updatedFields, setUpdatedFields] = useState([]);
    const [certData, setCertData] = useState(null);
    const [medicalEmpty, setMedicalEmpty] = useState(true);
    const [childSafetyEmpty, setChildSafetyEmpty] = useState(false);


    useEffect(() => {
        fetchUserData(id);
    }, [id]);

    const fetchDocData = async (certInfo) => {
        if (!Array.isArray(certInfo)) {
            console.error('certInfo is not an array.');
            return;
        }

        const resultArray = {};

        await Promise.all(
            certInfo.map(async (doc) => {
                const curDocType = doc.type;
                const curId = doc.userId;
                const responseDisplay = await axios.get(`${API_BASE_URL}/api/document/display/certs/${curDocType}/${curId}`, { headers: authHeader() });

                // Rest of your code using the responseDisplay
                // If you want to update the resultArray with the fetched data:
                resultArray[`display_${curDocType}`] = responseDisplay.data[0];
            })
        );

        // After all the promises are resolved, you can use the resultArray here if needed
        if (!resultArray.hasOwnProperty("display_medical")) {
            resultArray["display_medical"] = "";
            setMedicalEmpty(true);
        }

        // Check if "child_safety" key is present, if not assign it to an empty string
        if (!resultArray.hasOwnProperty("display_child_safety")) {
            resultArray["display_child_safety"] = "";
            setChildSafetyEmpty(true);
        }

        // After all the promises are resolved, you can use the resultArray here if needed
        setCertData(resultArray);
    };


    const fetchUserData = async (userId) => {
        try {
            setIsLoading(true);

            const docEndpoint = `${API_BASE_URL}/api/document/certs/${userId}`;
            const responseCerts = await axios.get(docEndpoint, { headers: authHeader() });

            if (responseCerts.data.data.length > 0) {
                const certInfo = responseCerts.data.data;
                await fetchDocData(certInfo);
            } else {
                setCertData({ "display_medical": "", "display_child_safety": "" })
                setChildSafetyEmpty(true);
                setMedicalEmpty(true);
            }

        } catch (error) {
            console.log(error);
        }
        try {
            const endpoint = `${API_BASE_URL}${API_ENDPOINT}${userId}`;
            const response = await axios.get(endpoint, { headers: authHeader() });
            const pendingUserData = response.data.data;

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
                display_nric_front: pendingUserData.nric_front ? NRICUrlArrays[0] : "",
                display_nric_back: pendingUserData.nric_back ? NRICUrlArrays[1] : "",
                display_license_front: pendingUserData.license_front ? LicenseUrlArrays[0] : "",
                display_license_back: pendingUserData.license_back ? LicenseUrlArrays[1] : "",
            });


        } catch (error) {
            console.log("API Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (fieldName, value) => {
        setUserData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));

        if (!updatedFields.includes(fieldName)) {
            setUpdatedFields((prevFields) => [...prevFields, fieldName]);
        }
    };


    const handleImageUpload = async (fieldName, file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result;
            const base64Data = base64String.split(',')[1];

            setUserData((prevData) => ({
                ...prevData,
                [`display_${fieldName}`]: base64Data,
                [fieldName]: file, // medical, child_safety
            }));

            if (!updatedFields.includes(fieldName)) {
                setUpdatedFields((prevFields) => [...prevFields, fieldName]);
            }

            // Check if "medical" and "child_safety" are available and update the state
            if (fieldName === "medical" && base64Data) {
                setCertData((prevData) => ({ ...prevData, [`display_medical`]: base64Data }));
            }
            if (fieldName === "child_safety" && base64Data) {
                setCertData((prevData) => ({ ...prevData, [`display_child_safety`]: base64Data }));
            }
        };
        reader.readAsDataURL(file);
    };

    const updateUser = async (id) => {
        try {
            const endpoint = `${API_BASE_URL}/api/user/admin/update/${id}`;
            const formData = new FormData();
            const formDataUpload = new FormData();
            const formDataUpdate = new FormData();
            // Append non-file fields to formData if they are in updatedFields
            for (const field of updatedFields) {
                if (!(userData[field] instanceof File)) {
                    formData.append(field, userData[field]);
                }
            }

            // Append file fields to formData separately
            for (const field of updatedFields) {
                const file = userData[field];
                if (file instanceof File) {
                    if ((medicalEmpty && field === "medical") || (childSafetyEmpty && field === "child_safety")) {
                        const certUploadEndpoint = `${API_BASE_URL}/api/document/admin/upload/certs/${field}/${id}`;
                        formDataUpload.append(field, file);
                        // Make the axios.post request for upload
                        axios.post(certUploadEndpoint, formDataUpload, {
                            headers: {
                                ...authHeader(),
                                'Content-Type': 'multipart/form-data',
                            },
                        }).then((response) => {
                            // Handle the response as needed
                            console.log("Upload success:", response.data);
                        }).catch((error) => {
                            // Handle errors
                            console.error("Upload error:", error);
                        });
                    } else if ((!medicalEmpty && field === "medical") || (!childSafetyEmpty && field === "child_safety")) {
                        const certUpdateEndpoint = `${API_BASE_URL}/api/document/admin/update/certs/${field}/${id}`;
                        formDataUpdate.append(field, file);

                        // Make the axios.put request for update
                        axios.put(certUpdateEndpoint, formDataUpdate, {
                            headers: {
                                ...authHeader(),
                                'Content-Type': 'multipart/form-data',
                            },
                        }).then((response) => {
                            // Handle the response as needed
                            console.log("Update success:", response.data);
                        }).catch((error) => {
                            // Handle errors
                            console.error("Update error:", error);
                        });
                    }
                    else {
                        formData.append(field, file);
                    }
                }
            }

            const response = await axios.post(endpoint, formData, {
                headers: {
                    ...authHeader(),
                    'Content-Type': 'multipart/form-data',
                },
            });

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
        display_license_front,
        display_license_back,
        display_nric_front,
        display_nric_back,
        certificate,
        display_medical,
        display_child_safety
    } = userData || {};

    return (
        <Container>
            {isLoading ? (
                <div className="text-center">Loading...</div>
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
                            front_license={display_license_front}
                            back_license={display_license_back}
                            front_nric={display_nric_front}
                            back_nric={display_nric_back}
                            certifications={certData}
                            header_one="Driver's License"
                            header_two="NRIC"
                            header_three="Certificates"
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
