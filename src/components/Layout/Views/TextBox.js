import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function TextBox(props) {
    return (
        <Form.Group as={Row} className="mb-3" style={props.style}>
            <Form.Label column sm="2">
                {props.Label}
            </Form.Label>
            <Col sm="6">
                <Form.Control placeholder={props.pholder} disabled={props.disabled} />
            </Col>
        </Form.Group>
    )
}

export default TextBox;