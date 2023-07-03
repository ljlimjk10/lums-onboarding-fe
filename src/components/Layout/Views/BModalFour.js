import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function BModalFour(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Form.Group>
        <Button variant="primary" onClick={handleShow}>
          {props.b_name}
        </Button>
      </Form.Group>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BModalFour;