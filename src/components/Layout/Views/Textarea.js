import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Textarea(props) {
    return (
        <Form.Group as={Row} className="mb-3" style={props.style}>
            <Form.Label column sm="3">
                {props.Label}
            </Form.Label>
            <Col sm="7">
                <Form.Control as="textarea" rows={20} placeholder={props.pholder} disabled={props.disabled} />
            </Col>
        </Form.Group>
    )
}

export default Textarea;