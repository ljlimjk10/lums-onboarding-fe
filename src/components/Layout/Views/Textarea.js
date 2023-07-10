import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";

function Textarea(props) {
    const {value} = props;
    // console.log(props);

    return (
        <Form.Group className="mb-3">
            <Col sm="12">
                <Form.Label column>
                    {props.Label}
                </Form.Label>
                <Form.Control required={props.r} as="textarea" rows={props.rows} placeholder={props.pholder} disabled={props.dis} onChange={props.onChange} value={value}>
                    {value}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Please enter a message.
                </Form.Control.Feedback>
            </Col>
        </Form.Group>
    )
}

export default Textarea;