import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Textarea(props) {
    return (
        <Form.Group className="mb-3">
            <Col sm="12">
                <Form.Control as="textarea" rows={5} placeholder={props.pholder} />
            </Col>
        </Form.Group>
    )
}

export default Textarea;