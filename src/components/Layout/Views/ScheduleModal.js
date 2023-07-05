import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';

function ScheduleModal(props) {

  const {handleValueChange} = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Form.Group>
        <Button variant={props.var} onClick={handleShow}>
          {props.name}
        </Button>
      </Form.Group>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatePicker Label="Date" onChange={handleValueChange}/>
          <TimePicker Label="Time" onChange={handleValueChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ScheduleModal;