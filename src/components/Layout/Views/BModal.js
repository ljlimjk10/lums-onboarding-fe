import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function BModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Form.Group>
        <Col>
          <Form.Label column>
            {props.Label}
          </Form.Label>
        </Col>
        <Button variant="link" onClick={handleShow}>
          <Image src={props.source} rounded fluid  alt="No Image Atttached! Click here to upload!"/>
        </Button>
      </Form.Group>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Image src={props.source} rounded fluid />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary">
            Upload Image
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BModal;