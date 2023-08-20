import Accordion from 'react-bootstrap/Accordion';


function Cordion_Two(props) {
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
            {props.r_order}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Cordion_Two;