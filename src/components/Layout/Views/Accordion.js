import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import Button from '../Views/Button';

function Cordion(props){
    return(
        <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Driver's License</Accordion.Header>
          <Accordion.Body>
            
            <Image src={props.source} rounded />
            <Image src={props.source} rounded />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>NRIC</Accordion.Header>
          <Accordion.Body>
            <Image src={props.source} rounded />
            <Image src={props.source} rounded />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
}

export default Cordion;