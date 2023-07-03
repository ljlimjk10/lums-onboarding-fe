import Heading_two from "../../components/Layout/Views/Heading_two";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import DropDownList from "../Layout/Views/Dropdown";
import TextBox from "../Layout/Views/TextBox";
import Textarea from "../Layout/Views/Textarea";

function CreatePost() {
    return (
        <Container>
            <Row>
                <Heading_two page="Create Post" b_name="Post" b_name_two="Schedule" />
                <Col lg={6} md={6} xs={12}>
                    <DropDownList Label="Job Type" />
                    <TextBox Label="Pickup Time" />
                    <TextBox Label="Location" />
                    <TextBox Label="Destination" />
                    <TextBox Label="Price" />
                    <TextBox Label="Payout" />
                    <TextBox Label="Drop-off Time" />
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <Textarea Label="Template" rows="13"/>
                </Col>

            </Row>
        </Container>
    );
}

export default CreatePost;
