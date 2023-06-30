import Heading_two from "../../components/Layout/Views/Heading_two";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

function CreatePost() {
    return (
        <Container>
            <Row>
                <Heading_two page="Create Post" b_name="Post" b_name_two="Schedule"/>

            </Row>
        </Container>
        
    )
}

export default CreatePost;