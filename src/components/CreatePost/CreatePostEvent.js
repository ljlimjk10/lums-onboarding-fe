import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import Heading_two from "../Layout/Views/Heading_two";
import DropDownList from "../Layout/Views/Dropdown";
import Textarea from "../Layout/Views/Textarea";
import BModal from "../Layout/Views/BModal";
import Figure from 'react-bootstrap/Figure';

function CreatePostEvent(){
    return (
        <Container>
            <Row>
                <Heading_two page="Create Post" b_name="Post" b_name_two="Schedule"/>
                <Col lg={6} md={10} xs={12}>
                    <DropDownList Label="Job Type" />
                    <Textarea Label="Template" rows="13"/>
                </Col>
                <Col lg={12} md={12} xs={12}>
                    <BModal source="https://picsum.photos/625/300" header="Attach Image" Label="Attach Image" />
                </Col>
            </Row>
        </Container>
    )
}

export default CreatePostEvent;