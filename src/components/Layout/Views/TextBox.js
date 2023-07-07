import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function TextBox(props) {
    const handleChange = (value) => {
        props.onChange(value,props.Label);
    }
    
    return (
        <Form.Group as={Row} className="mb-3" style={props.style}>
            <Form.Label style={props.style} column sm="3">
                {props.Label}
            </Form.Label>
            <Col sm="7">
                <Form.Control required={props.r} type={props.type} placeholder={props.placeholder} value={props.current} disabled={props.disabled} onChange={(e)=>handleChange(e.target.value)}/>
                <Form.Control.Feedback type="invalid">
                    Please enter a {props.Label}
                </Form.Control.Feedback>
            </Col>
        </Form.Group>
    )
}

export default TextBox;