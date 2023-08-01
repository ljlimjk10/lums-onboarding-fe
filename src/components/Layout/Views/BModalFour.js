import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import Textarea from './Textarea';

const API_BASE_URL = "http://13.215.50.140:3002";
const API_ENDPOINT = "/api/user/approve/";

function BModalFour(props) {
  const navigate = useNavigate();
  const [changeTo, setChangeTo] = useState(props.header);
  const [comments, setComments] = useState(null);
  const [show, setShow] = useState(false);
  const { value } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (changeTo === "Approve") {
      try {
        const response = await axios.put(`${API_BASE_URL}${API_ENDPOINT}${props.id}`, { status: "APPROVED", comments }, { headers: authHeader() });
        console.log(response.data);
        navigate('/Users');
      } catch (error) {
        console.error(error);
      }
    } else if (changeTo === "Reject") {
      try {
        const response = await axios.put(`${API_BASE_URL}${API_ENDPOINT}${props.id}`, { status: "REJECTED", comments }, { headers: authHeader() });
        console.log(response.data);
        navigate('/pending-users-table');
      } catch (error) {
        console.error(error);
      }
    }
    handleClose();
  };

  const handleChange = (event) => {
    setComments(event.target.value);
  };

  if (changeTo === "Approve" && comments === null) {
    setComments("You have been approved. Please join our channel: https://t.me/+NNAOw3xTkIFiMTRl");
  } else if (changeTo === "Reject" && comments === null) {
    setComments("You have been rejected because...");
  }

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
            <Textarea Label="Comments" value={comments} onChange={handleChange} />
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
