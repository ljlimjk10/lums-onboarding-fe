import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function BModal_Edit(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant={props.var} onClick={handleShow}>
        {props.name}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>{props.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={props.onClick} variant="primary">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default BModal_Edit;
