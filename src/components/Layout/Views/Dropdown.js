import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DropDownList(props) {
  return (
    
    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
            {props.Label}
        </Form.Label>
        <Col sm={7}>
            <Form.Select aria-label="Default select example" >
                <option>Select Job Type</option>
                <option value="1">Ad-Hoc Job</option>
                <option value="2">Post</option>
            </Form.Select>
        </Col>

    </Form.Group>

  );
}

export default DropDownList;