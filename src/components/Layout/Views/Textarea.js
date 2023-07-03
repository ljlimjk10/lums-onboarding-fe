import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";

function Textarea(props) {
    return (
        <Form.Group className="mb-3">
            <Col sm="12">
                <Form.Label column>
                    {props.Label}
                </Form.Label>
                <Form.Control as="textarea" rows={props.rows} placeholder={props.pholder} disabled={props.dis}>
                    {props.content}
                </Form.Control>
            </Col>
        </Form.Group>
    )
}

export default Textarea;