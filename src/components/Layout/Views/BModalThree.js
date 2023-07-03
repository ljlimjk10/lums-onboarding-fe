import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Textarea from './Textarea';
import axios from 'axios';

function BModalThree(props) {
  const id = props.id;
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [question,setQuestion] = useState(props.qn);
  const [answer,setAnswer] = useState(props.ans);

  const handleClose = () => {
    setShow(false);
    setIsEditMode(false);
  };

  const handleShow = () => setShow(true);

  const handleEdit = () => setIsEditMode(true);

  const handleQnsChange = (e) => {
    setQuestion(e.target.value)
  }

  const handleAnsChange = (e) => {
    setAnswer(e.target.value)
  }


  const handleSaveChanges = async () => {
    // Handle saving changes logic here
    setIsEditMode(false);
    try {
      await axios.put(`http://localhost:3001/api/faq/update/${id}`,{question,answer})
      props.refreshData();
    }catch (error){
      console.error('Error updating FAQ data:', error);
    }
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
          <Textarea onChange={handleQnsChange} content={props.qn} dis={!isEditMode} />
          <Textarea onChange={handleAnsChange} content={props.ans} dis={!isEditMode} />
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

export default BModalThree;
