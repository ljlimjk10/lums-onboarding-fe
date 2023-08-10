import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import TextBox from "../../Layout/Views/TextBox";
import PostResponses from "./PostResponses";
import { useState, useEffect } from "react";
import ViewPostHeading from "../../Layout/Views/ViewPostHeading";
import Cordion_Event from "../../Layout/Views/Cordion_Event";

import axios from "axios";
import authHeader from "../../../services/auth-header";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import XLSX from "xlsx/dist/xlsx.full.min";


const API_BASE_URL = "http://13.215.50.140:3002";
const API_ENDPOINT = "/api/post/event/";

function Post_Event(props) {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const [imageArray, setImageArray] = useState([]);
    const [postResponseData, setPostResponseData] = useState([]);
    const { message, type, status, datetime, pollId } = postData || {};

    useEffect(() => {
        fetchPostData(id);
        fetchImageArray(id);
        fetchPollData(pollId)
    }, [id, pollId]);


    const fetchPollData = async (pollId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/postresponses/event/${pollId}`, { headers: authHeader() });
            console.log(response);
            setPostResponseData(response.data.data);
        } catch (error) {
            console.error("Error fetching poll data:", error);
            setPostResponseData([]); // Set an empty array on error to avoid the slice error
        }
    };

    const fetchPostData = async (postId) => {
        const endpoint = `${API_BASE_URL}${API_ENDPOINT}${postId}`;
        try {
            const response = await axios.get(endpoint, { headers: authHeader() });
            setPostData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchImageArray = async (postId) => {
        const imageEndpoint = `${API_BASE_URL}/api/post/display/images/${postId}`;
        try {
            const response = await axios.get(imageEndpoint, { headers: authHeader() });
            setImageArray(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const convertToSingaporeTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        if (isNaN(dateTime)) {
            return "";
        }
        return dateTime.toLocaleString("en-SG", { timeZone: "Asia/Singapore" });
    };

    const handleGenerateExcel = (postData) => {
        let postResponsesString = ""; // Initialize postResponsesString as an empty string

        if (postResponseData !== null) {
            const postResponseCSV = postResponseData.map((responseReceived, index) => {
                const { name, response, responseTime,mobile } = responseReceived;
                const sgtDateTime = convertToSingaporeTime(responseTime);
                return `Order:${index + 1}\nName:${name}\nResponse Type:${response}\nDate and Time Responded:${sgtDateTime}\nContact:${mobile}`;
            });
            postResponsesString = postResponseCSV.join("\n\n");
        }

        const excelData = [
            [
                "Message",
                "Image",
                "Type",
                "Date and Time Posted",
                "Status",
                "Post Responses",
            ],
            [
                postData.message || "",
                postData.image || "",
                postData.type || "",
                convertToSingaporeTime(postData.datetime) || "",
                postData.status || "",
                postResponsesString || "",
            ],
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, { type: "array" });

        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "post_event_data.xlsx");
    };

    // Inside your component

    const handleGenerateCSV = (postData) => {
        // The rest of your existing code for generating CSV goes here

        // To generate Excel instead of CSV, just call handleGenerateExcel
        handleGenerateExcel(postData);
    };


    if (!postData) {
        return <div>Loading...</div>;
    }


    return (
        <Container>
            <Row>
                <ViewPostHeading type={type} handleGenerateCSV={handleGenerateCSV} postData={postData} status={status} page="Post" b_name="Back" b_name_two="Generate CSV" />
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Posted D/T" disabled="true" pholder="" value={convertToSingaporeTime(datetime)} />
                </Col>
                <hr />
                <Cordion_Event header_1="Message" header_2="Image" header_3="Response Order" source={imageArray[0]} r_order={<PostResponses field="event" pollId={pollId} />} message={message} />
            </Row>
        </Container>
    );
}

export default Post_Event;
