import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import XLSX from "xlsx/dist/xlsx.full.min";


import { Container, Row, Col } from "react-bootstrap";
import TextBox from "../../Layout/Views/TextBox";
import PostResponses from "./PostResponses";
import ViewPostHeading from "../../Layout/Views/ViewPostHeading";
import Cordion_Two from "../../Layout/Views/Cordion_Two";
import authHeader from "../../../services/auth-header";

const API_BASE_URL = "http://13.239.114.14:3002";
const API_ENDPOINT = "/api/post/job/";

function Post_Job(props) {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const [postResponseData, setPostResponseData] = useState([]);
    const {
        message,
        type,
        location,
        destination,
        dropoffTime,
        price,
        payout,
        responses,
        status,
        createdAt,
        scheduledfor,
        pickupTime,
        riders,
        model,
        region,
        pollId
    } = postData || "";

    useEffect(() => {
        fetchPostData(id);
        fetchPollData(pollId)
    }, [id, pollId]);

    const fetchPostData = (postId) => {
        const endpoint = `${API_BASE_URL}${API_ENDPOINT}${postId}`;
        axios
            .get(endpoint, { headers: authHeader() })
            .then((response) => {
                setPostData(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    const fetchPollData = async (pollId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/postresponses/jobpost/${pollId}`, { headers: authHeader() });
            setPostResponseData(response.data.data); // an array
        } catch (error) {
            console.error("Error fetching poll data:", error);
        }
    };


    const convertToSingaporeTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        if (isNaN(dateTime)) {
            return "";
        }
        return dateTime.toLocaleString("en-SG", { timeZone: "Asia/Singapore" });
    };

    const handleGenerateExcel = (postData, postResponseData = null) => {
        let postResponsesString = ""; // Initialize postResponsesString as an empty string

        if (postResponseData !== null) {
            const postResponseCSV = postResponseData.map((responseReceived, index) => {
                const { name, response, responseTime } = responseReceived;
                const sgtDateTime = convertToSingaporeTime(responseTime);
                return `Order:${index + 1}\nName:${name}\nResponse Type:${response}\nDate and Time Responded:${sgtDateTime}`;
            });
            postResponsesString = postResponseCSV.join("\n\n");
        }

        const excelData = [
            [
                "Message",
                "Type",
                "Location",
                "Destination",
                "Pickup Date and Time",
                "Drop-off Date and Time",
                "Price",
                "Payout",
                "Status",
                "Created Date and Time",
                "Post Responses",
            ],
            [
                postData.message || "",
                postData.type || "",
                postData.location || "",
                postData.destination || "",
                convertToSingaporeTime(postData.pickupTime) || "",
                convertToSingaporeTime(postData.dropoffTime) || "",
                postData.price ? "$" + postData.price : "",
                postData.payout ? "$" + postData.payout : "",
                postData.status || "",
                convertToSingaporeTime(postData.createdAt) || "",
                postResponsesString || "",
            ],
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, {
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "post_job_data.xlsx");
    };

    const handleGenerateCSV = (postData, postResponseData = null) => {
        // The rest of your existing code for generating CSV goes here
        // To generate Excel instead of CSV, just call handleGenerateExcel
        handleGenerateExcel(postData, postResponseData);
    };



    if (!postData) {
        return <div>Loading...</div>;
    }






    return (
        <Container>
            <Row>
                <ViewPostHeading
                    type={type}
                    handleGenerateCSV={handleGenerateCSV}
                    postData={postData}
                    postResponseData={postResponseData}
                    status={status}
                    page="Post"
                    b_name="Back"
                    b_name_two="Generate CSV"
                />
                <Col lg={6} md={6} xs={12}>
                    <TextBox
                        Label="Pickup Date/Time"
                        disabled={true}
                        pholder="PickupDateTime"
                        value={convertToSingaporeTime(pickupTime)}
                    />
                    <TextBox
                        Label="Dropoff Time"
                        disabled={true}
                        pholder="dropofftime Date"
                        value={convertToSingaporeTime(dropoffTime)}
                    />
                    <TextBox
                        Label="Location"
                        disabled={true}
                        pholder="ABC Street"
                        value={location}
                    />
                    <TextBox
                        Label="Destination"
                        disabled={true}
                        pholder="DEF Road"
                        value={destination}
                    />
                    <TextBox
                        Label="Region"
                        disabled={true}
                        pholder="North"
                        value={region}
                    />
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <TextBox
                        Label="Posted D/T"
                        disabled={true}
                        pholder=""
                        value={convertToSingaporeTime(createdAt)}
                    />
                    <TextBox
                        Label="Price"
                        disabled={true}
                        pholder="$20"
                        value={"$" + price}
                    />
                    <TextBox
                        Label="Payout"
                        disabled={true}
                        pholder="$15"
                        value={"$" + payout}
                    />
                    <TextBox
                        Label="Riders"
                        disabled={true}
                        pholder="5"
                        value={riders}
                    />
                    <TextBox
                        Label="Model"
                        disabled={true}
                        pholder="Toyota"
                        value={model}
                    />
                </Col>
                <hr />
                <Cordion_Two
                    header_1="Message"
                    header_2="Response Order"
                    r_order={<PostResponses field="job" pollId={pollId} />}
                    message={message}
                />
            </Row>
        </Container>
    );
}

export default Post_Job;
