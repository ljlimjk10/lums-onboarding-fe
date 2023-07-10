import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import authHeader from '../../../services/auth-header';

const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINT = "/api/user/approve/";

function BModal_Edit(props) {
  const [changeTo, setChangeTo] = useState(props.header);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (event) => {
    event.preventDefault();
    props.onClick();
    setLoading(true);
    if (changeTo === "Edit") {
      try {
        const response = await axios.put(
          `${API_BASE_URL}${API_ENDPOINT}${props.id}`,
          { status: "PENDING" },
          { headers: authHeader() }
        );
        console.log(response.data);
        // Provide appropriate feedback to the user, e.g., show a success message
      } catch (error) {
        console.error(error);
        // Provide appropriate feedback to the user, e.g., show an error message
      } finally {
        setLoading(false);
        handleClose();
      }
    }
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
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" disabled={loading} variant="primary">
              {loading ? "Loading..." : "Confirm"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}


export default BModal_Edit;
