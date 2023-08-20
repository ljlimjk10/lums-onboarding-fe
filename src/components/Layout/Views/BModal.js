import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function BModal(props) {
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [file, setFile] = useState(null); // New state to store the file
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleImgSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImg(URL.createObjectURL(selectedFile));
    setFile(selectedFile); // Store the file in state
  };

  const handleUploadImage = () => {
    if (file) {
      props.handleImageUpload(props.fieldName, file); // File type
      handleClose();
    }
  };
  return (
    <>
      <Form.Group>
        <Col>
          <Form.Label column>{props.Label}</Form.Label>
        </Col>
        <Button variant="link" onClick={handleShow} disabled={props.disabled}>
          <Image 
            src={`data:image/jpeg;base64,${props.source}`}
            rounded
            fluid
            alt="No Image Attached! Click here to upload!"
          />

        </Button>
      </Form.Group>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImg && <Image src={selectedImg} alt="Uploaded Image" rounded fluid />}
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col lg={8} md={6} xs={6}>
              <Form.Control type="file" accept=".jpg, .jpeg, .png" onChange={handleImgSelect} />
            </Col>
            <Col lg={4} md={6} xs={6}>
              <Button variant="primary" onClick={handleUploadImage}>
                Save Changes
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BModal;
