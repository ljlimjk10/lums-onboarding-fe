import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Heading_two from "../../Layout/Views/Heading_two";
import TextBox from "../../Layout/Views/TextBox";
import Textarea from "../../Layout/Views/Textarea";
import PostResponses from "./PostResponses";

import ContentCard from "../../Layout/Views/ContentCard";

import Cordion_Two from "../../Layout/Views/Cordion_Two";

function Post_two() {
    return (
        <Container>
            <Row>
                <Heading_two status="Approved" page="Post" b_name="Back" b_name_two="Generate CSV"/>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Type" disabled="true" pholder="Job Post"/>
                    <TextBox Label="Creation D/T" disabled="true" pholder=""/>
                    <TextBox Label="Posted D/T" disabled="true" pholder=""/>
                    <TextBox Label="Location" disabled="true" pholder="ABC Street"/>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Destination" disabled="true" pholder="DEF Road"/>
                    <TextBox Label="Price" disabled="true" pholder="$20"/>
                    <TextBox Label="Payout" disabled="true" pholder="$15"/>
                    <TextBox Label="Drop Off Time" disabled="true" pholder=""/>
                </Col>
                
                <hr/>
                <Cordion_Two header_1="Message" header_2="Response Order" r_order={<PostResponses/>} message="****Message / Announcement text****" />
                
            </Row>

        </Container>
    )
}

export default Post_two;