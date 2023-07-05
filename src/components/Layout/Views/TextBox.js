import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from 'react';


function TextBox(props) {
    const handleChange = (value) => {
        props.onChange(value,props.Label);
    }
    
    return (
        <Form.Group as={Row} className="mb-3" style={props.style}>
            <Form.Label column sm="3">
                {props.Label}
            </Form.Label>
            <Col sm="7">
                <Form.Control value={props.current} disabled={props.disabled} onChange={(e)=>handleChange(e.target.value)}/>
            </Col>
        </Form.Group>
    )
}

export default TextBox;