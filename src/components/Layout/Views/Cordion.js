import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import Button from '../Views/Button';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import BModal from './BModal';

function Cordion(props){
    return(
        <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Driver's License</Accordion.Header>
          <Accordion.Body>

            <Row>
              <Col className='d-flex justify-content-center' lg={6} md={6} xs={12}>
                <BModal source={props.source} />
              </Col>
              <Col className='d-flex justify-content-center' lg={6} md={6} xs={12}> 
                <Image src={props.source} rounded fluid/>
              </Col>
            </Row>
            
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>NRIC</Accordion.Header>
          <Accordion.Body>

            <Row>
              <Col className='d-flex justify-content-center' lg={6} md={6} xs={12}>
                <Image src={props.source} rounded fluid/>
              </Col>
              <Col className='d-flex justify-content-center' lg={6} md={6} xs={12}> 
                <Image src={props.source} rounded fluid/>
              </Col>
            </Row>

          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    );
}

export default Cordion;