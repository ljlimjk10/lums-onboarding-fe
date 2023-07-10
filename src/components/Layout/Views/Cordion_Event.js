import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';

function Cordion_Event(props) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{props.header_1}</Accordion.Header>
        <Accordion.Body>
          {props.message}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>{props.header_2}</Accordion.Header>
        <Accordion.Body>
          <div className="d-flex justify-content-center align-items-center h-100">
            <Image src={props.source} rounded fluid alt="No Image Attached! Click here to upload!" className="img-fluid" />
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>{props.header_3}</Accordion.Header>
        <Accordion.Body>
          {props.r_order}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Cordion_Event;
