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

const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINT = "/api/post/job/";

function Post_Job(props) {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        fetchPostData(id);
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
    const handleGenerateCSV = (postData) => {
        const csvData = [];
        csvData.push([
            "Message",
            "Image",
            "Type",
            "Location",
            "Destination",
            "Pickup Time",
            "Drop-off Time",
            "Price",
            "Payout",
            "Status",
            "Created At",
            // "Scheduled For"
        ]);
        const {
            message,
            image,
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
            image || "",
            type || "",
            location || "",
            destination || "",
            pickupTime || "",
            dropoffTime || "",
            price || "",
            payout || "",
            status || "",
            createdAt || ""
            // scheduledfor || ""
        ]);

        const csvString = csvData.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "post_job_data.csv");
    }

    if (!postData) {
        return <div>Loading...</div>;
    }

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
    } = postData;

    return (
        <Container>
            <Row>
                <ViewPostHeading
                    type={type}
                    handleGenerateCSV={handleGenerateCSV}
                    postData={postData}
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
                        value={pickupTime}
                    />
                    <TextBox
                        Label="Dropoff Time"
                        disabled={true}
                        pholder="dropofftime Date"
                        value={dropoffTime}
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
                        value={createdAt}
                    />
                    <TextBox
                        Label="Price"
                        disabled={true}
                        pholder="$20"
                        value={price}
                    />
                    <TextBox
                        Label="Payout"
                        disabled={true}
                        pholder="$15"
                        value={payout}
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
                    r_order={<PostResponses />}
                    message={message}
                />
            </Row>
        </Container>
    );
}

export default Post_Job;
