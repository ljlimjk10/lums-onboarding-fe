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
import saveAs from "file-saver";

const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINT = "/api/post/event/";

function Post_Event(props) {
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
            "Date Time", 
            "Status",
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
            datetime || "",
            status || "",  
        ]);

        const csvString = csvData.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "post_event_data.csv");
    }


    if (!postData) {
        return <div>Loading...</div>;
    }

    const { message, type, status, datetime, scheduledfor } = postData || {};
    return (
        <Container>
            <Row>
                <ViewPostHeading type={type} handleGenerateCSV={handleGenerateCSV} postData={postData} status={status} page="Post" b_name="Back" b_name_two="Generate CSV" />
                {/* <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Creation D/T" disabled="true" pholder="" current={createdAt} />
                </Col> */}
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Posted D/T" disabled="true" pholder="" value={datetime} />
                </Col>
                <hr />
                <Cordion_Event header_1="Message" header_2="Image" header_3="Response Order" source="https://picsum.photos/200/300" r_order={<PostResponses />} message={message} />
            </Row>
        </Container>
    )
}

export default Post_Event;