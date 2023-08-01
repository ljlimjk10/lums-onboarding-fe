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
import {saveAs} from "file-saver";

const API_BASE_URL = "http://13.239.114.14:3002";
const API_ENDPOINT = "/api/post/event/";

function Post_Event(props) {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const [imageArray, setImageArray] = useState([]);
    const [postResponseData, setPostResponseData] = useState([]);
    const { message, type, status, datetime,pollId } = postData || {};

    useEffect(() => {
        fetchPostData(id);
        fetchImageArray(id);
        fetchPollData(pollId)
    }, [id,pollId]);


    const fetchPollData = async (pollId) => {
		try {
			const response = await axios.get(`${API_BASE_URL}/api/postresponses/event/${pollId}`,{headers:authHeader()});
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

    const handleGenerateCSV = (postData) => {
        let postResponsesString = ""; // Initialize postResponsesString as an empty string

        if (postResponseData !== null) {
            const postResponseCSV = postResponseData.map((responseReceived, index) => {
                const { name, response, responseTime } = responseReceived;
                const sgtDateTime = convertToSingaporeTime(responseTime);
                return `Order:${index + 1}\nName:${name}\nResponse Type:${response}\nDate and Time Responded:${sgtDateTime}`;
            });
            postResponsesString = postResponseCSV.join("\n\n");
        }
        const csvData = [];
        csvData.push([
            "Message",
            "Image",
            "Type",
            "Date Posted",
            "Time Posted",
            "Status",
            "Post Responses"
        ]);
        const {
            message,
            image,
            type,
            datetime,
            status,

        } = postData;
        const sanitizedMessage = message ? `"${message.replace(/"/g, '""')}"` : "";
        csvData.push([
            sanitizedMessage,
            image || "",
            type || "",
            convertToSingaporeTime(datetime) || "",
            status || "",
            `"${postResponsesString.replace(/"/g, '""')}"`, 
        ]);

        const csvString = csvData.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "post_event_data.csv");
    }

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
