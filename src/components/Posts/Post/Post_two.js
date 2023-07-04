import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Heading_two from "../../Layout/Views/Heading_two";
import TextBox from "../../Layout/Views/TextBox";
import Textarea from "../../Layout/Views/Textarea";
import PostResponses from "./PostResponses";
import { postdata } from "./postdata";
import ContentCard from "../../Layout/Views/ContentCard";
import { useState, useEffect } from "react";

import Cordion_Two from "../../Layout/Views/Cordion_Two";

function Post_two(props) {
    const postId = props.postId;
    const [postData, setPostData] = useState(null);
    useEffect(() => {
        fetchPostData(postId);
    }, [postId]);
    const fetchPostData = (postId) => {
        const filteredData = postdata.filter((post) => post.id === postId)
        setPostData(filteredData[0]);

    }

    const { message, image, type, location, destination, pickupTime, dropofftime, price, payout, responses, status, createdAt, scheduledfor } = postData || {};
    return (
        <Container>
            <Row>
                <Heading_two postData={postData} status="Approved" page="Post" b_name="Back" b_name_two="Generate CSV" />
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Type" disabled="true" pholder="Job Post" current={type} />
                    <TextBox Label="Creation D/T" disabled="true" pholder="" current={createdAt} />
                    <TextBox Label="Posted D/T" disabled="true" pholder="" current={scheduledfor} />
                    <TextBox Label="Location" disabled="true" pholder="ABC Street" current={location} />
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Destination" disabled="true" pholder="DEF Road" current={destination} />
                    <TextBox Label="Price" disabled="true" pholder="$20" current={price} />
                    <TextBox Label="Payout" disabled="true" pholder="$15" current={payout} />
                    <TextBox Label="Drop Off Time" disabled="true" pholder="" current={dropofftime} />
                </Col>
                <hr />
                <Cordion_Two header_1="Message" header_2="Response Order" r_order={<PostResponses />} message={message} />

            </Row>

        </Container>
    )
}

export default Post_two;