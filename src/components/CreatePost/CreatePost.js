import Heading_two from "../Layout/Views/Heading_two";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import DropDownList from "../Layout/Views/Dropdown";

function CreatePost() {
    return (
        <Container>
            <Row>
                <Heading_two page="Create Post" b_name="Post" b_name_two="Schedule"/>
                <Col lg={6} md={6} xs={12}>
                    <DropDownList Label="Job Type" />
                </Col>
            </Row>
        </Container>
    )   
}

export default CreatePost;