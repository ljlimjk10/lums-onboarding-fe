import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import Textarea from './Textarea';
const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINT = "/api/user/approve/";

function BModalFour(props) {

  const [changeTo, setChangeTo] = useState(props.header)
  const [show, setShow] = useState(false);
  const {value} = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (changeTo === "Approve") {
      try {
        const response = await axios.put(`${API_BASE_URL}${API_ENDPOINT}${props.id}`, { status: "APPROVED" },{headers:authHeader()});
        console.log(response.data);
        // Perform any additional logic or actions you want after successfully updating the status
      } catch (error) {
        console.error(error);
        // Handle the error and display an appropriate message to the user
      }
    }
    // Additional logic or actions you want to perform on form submission
    handleClose();
  };

  return (
    <>
      <Button variant={props.var} onClick={handleShow}>
        {props.name}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{props.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Textarea Label="Comments" value={value}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default BModalFour;
