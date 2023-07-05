import Heading_Three from "../Layout/Views/Heading_Three";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import DropDownList from "../Layout/Views/Dropdown";
import CreatePostAdHoc from "./CreatePostAdHoc";
import CreatePostEvent from "./CreatePostEvent";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    return (
        <Container>
            <Row>
                <Heading_Three page="Create Post" b_name="Post" b_name_two="Schedule" vis="invisible"/>
                <Col lg={6} md={6} xs={12}>
                    <DropDownList Label="Job Type" />
                </Col>
            </Row>
        </Container>
    )   
}

export default CreatePost;