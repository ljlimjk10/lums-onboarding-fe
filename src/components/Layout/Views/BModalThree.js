import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Textarea from './Textarea';

function BModalTwo(props) {
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsEditMode(false);
  };

  const handleShow = () => setShow(true);

  const handleEdit = () => setIsEditMode(true);

  const handleSaveChanges = () => {
    // Handle saving changes logic here
    setIsEditMode(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.bname}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Textarea content={props.qn} dis={!isEditMode} rows="5"/>
          <Textarea content={props.ans} dis={!isEditMode} rows="5"/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isEditMode ? (
            <Button variant="success" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          ) : (
            <Button variant="danger" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BModalTwo;
