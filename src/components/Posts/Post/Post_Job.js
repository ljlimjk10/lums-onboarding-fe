import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import TextBox from "../../Layout/Views/TextBox";
import PostResponses from "./PostResponses";
import { postdata } from "./postdata";
import { useState, useEffect } from "react";
import ViewPostHeading from "../../Layout/Views/ViewPostHeading";

import Cordion_Two from "../../Layout/Views/Cordion_Two";

function Post_Job(props) {
    const {onClick:handleGoBack,postId,handleGenerateCSV} = props;
    
    const [postData, setPostData] = useState(null);
    useEffect(() => {
        fetchPostData(postId);
    }, [postId]);
    const fetchPostData = (postId) => {
        const filteredData = postdata.filter((post) => post.id === postId)
        setPostData(filteredData[0]);
    }

    const { message, type, location, destination, dropofftime, price, payout, responses, status, createdAt, scheduledfor, pickupDateTime, riders, model, region} = postData || {};
    return (
        <Container>
            <Row>
                <ViewPostHeading type={type} handleGenerateCSV={handleGenerateCSV} onClick={handleGoBack} postData={postData} status={status} page="Post" b_name="Back" b_name_two="Generate CSV" />
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Pickup Date/Time" disabled="true" pholder="PickupDateTime" current={pickupDateTime} />
                    <TextBox Label="Dropoff Time" disabled="true" pholder="dropofftime Date" current={dropofftime} />
                    <TextBox Label="Location" disabled="true" pholder="ABC Street" current={location} />
                    <TextBox Label="Destination" disabled="true" pholder="DEF Road" current={destination} />
                    <TextBox Label="Region" disabled="true" pholder="North" current={region} />
                    
                </Col>
                <Col lg={6} md={6} xs={12}>
                    {/* <TextBox Label="Creation D/T" disabled="true" pholder="" current={createdAt} /> */}
                    <TextBox Label="Posted D/T" disabled="true" pholder="" current={scheduledfor} />
                    <TextBox Label="Price" disabled="true" pholder="$20" current={price} />
                    <TextBox Label="Payout" disabled="true" pholder="$15" current={payout} />
                    <TextBox Label="Riders" disabled="true" pholder="5" current={riders} />
                    <TextBox Label="Model" disabled="true" pholder="Toyota" current={model} />
                </Col>
                <hr/>
                <Cordion_Two header_1="Message" header_2="Response Order" r_order={<PostResponses />} message={message} />
            </Row>
        </Container>
    )
}

export default Post_Job;