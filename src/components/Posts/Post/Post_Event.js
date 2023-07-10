import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import TextBox from "../../Layout/Views/TextBox";
import PostResponses from "./PostResponses";
import { postdata } from "./postdata";
import { useState, useEffect } from "react";
import ViewPostHeading from "../../Layout/Views/ViewPostHeading";
import Cordion_Event from "../../Layout/Views/Cordion_Event";


function Post_Event(props) {
    const {onClick:handleGoBack,postId,handleGenerateCSV} = props;
    
    const [postData, setPostData] = useState(null);
    useEffect(() => {
        fetchPostData(postId);
    }, [postId]);
    const fetchPostData = (postId) => {
        const filteredData = postdata.filter((post) => post.id === postId)
        setPostData(filteredData[0]);
    }

    const { message, type, status, createdAt, scheduledfor} = postData || {};
    return (
        <Container>
            <Row>
                <ViewPostHeading type={type} handleGenerateCSV={handleGenerateCSV} onClick={handleGoBack} postData={postData} status={status} page="Post" b_name="Back" b_name_two="Generate CSV" />
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Creation D/T" disabled="true" pholder="" current={createdAt} />
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Posted D/T" disabled="true" pholder="" current={scheduledfor} />
                </Col>

                <hr/>
                <Cordion_Event header_1="Message" header_2="Image" header_3="Response Order" source="https://picsum.photos/200/300" r_order={<PostResponses />} message={message} />
            </Row>
        </Container>
    )
}

export default Post_Event;