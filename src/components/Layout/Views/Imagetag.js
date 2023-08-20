import React from 'react';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/Button";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


function Imagetag(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <Row>
      <Col lg={12}>
        <div className="d-flex justify-content-center align-items-center">
          <h4>{props.type}</h4>
        </div>
      </Col>
      <Col lg={12}>
        <div className="d-flex justify-content-center align-items-center">
            <Button variant="link" disabled={props.disabled} onClick={handleShow}>
                <Image src={props.source} fluid/>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{props.type}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={props.source} fluid/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Upload New
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
      </Col>
    </Row>
  );
}

export default Imagetag;
