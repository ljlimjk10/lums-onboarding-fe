import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';

function DropdownImg(props) {
  return (
    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
            {props.Label}
        </Form.Label>
        <Col sm={7}>
            <Form.Select aria-label="Images">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
        </Col>
    </Form.Group> 
  );
}

export default DropdownImg;