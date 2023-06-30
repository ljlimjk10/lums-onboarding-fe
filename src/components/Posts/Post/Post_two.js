import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Heading_two from "../../Layout/Views/Heading_two";

function Post_two() {
    return (
        <Container>
            <Row>
                <Heading_two status="Approved" page="Post" b_name="Back" b_name_two="Generate CSV"/>
            </Row>

        </Container>
    )
}

export default Post_two;