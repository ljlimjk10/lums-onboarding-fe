import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";

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
    }, [id]);

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
            const response = await axios.get(`${API_BASE_URL}/api/postresponses/${pollId}`, { headers: authHeader() });
            console.log(response.data);
            setPostResponseData(response.data.data);
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

    const handleGenerateCSV = (postData, postResponseData = null) => {
        let postResponsesString;
        if (postResponseData === null) {

        } else {
            const postResponseCSV = postResponseData.map((responseReceived, index) => {
                const { name, response, responseTime } = responseReceived;
                const sgtDateTime = convertToSingaporeTime(responseTime);
                return `Order:${index + 1}\nName:${name}\nResponse Type:${response}\nTime Responded:${sgtDateTime}`;
            });
            postResponsesString = postResponseCSV.join("\n\n");
        }
        // Join postResponseCSV array elements into a single string

        const csvData = [];
        csvData.push([
            "Message",
            "Type",
            "Location",
            "Destination",
            "Pickup Date",
            "Pickup Time",
            "Drop-off Date",
            "Drop-off Time",
            "Price",
            "Payout",
            "Status",
            "Created Date",
            "Created Time",
            "Post Responses"
            // "Scheduled For"
        ]);
        const {
            message,
            type,
            location,
            destination,
            pickupTime,
            dropoffTime,
            price,
            payout,
            status,
            createdAt,
            // scheduledfor
        } = postData;
        const sanitizedMessage = message ? `"${message.replace(/"/g, '""')}"` : "";
        csvData.push([
            sanitizedMessage,
            type || "",
            location || "",
            destination || "",
            convertToSingaporeTime(pickupTime) || "",
            convertToSingaporeTime(dropoffTime) || "",
            price || "",
            payout || "",
            status || "",
            convertToSingaporeTime(createdAt) || "",
            postResponsesString || "",
            // scheduledfor || ""
        ]);

        const csvString = csvData.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "post_job_data.csv");
    }

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
                    r_order={<PostResponses pollId={pollId} />}
                    message={message}
                />
            </Row>
        </Container>
    );
}

export default Post_Job;
