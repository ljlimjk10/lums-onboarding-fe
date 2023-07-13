import Accordion from 'react-bootstrap/Accordion';
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import BModal from './BModal';

function Cordion(props){
    return(
        <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{props.header_one}</Accordion.Header>
          <Accordion.Body>

            <Row>
              <Col className='d-flex justify-content-center' lg={6} md={6} xs={12}>
                <BModal source={props.front_license} header={`${props.header_one} Front`} disabled={props.disabled}/>
              </Col>
              <Col className='d-flex justify-content-center' lg={6} md={6} xs={12}> 
                <BModal source={props.back_license} header={`${props.header_one} Back`} disabled={props.disabled}/>
              </Col>
            </Row>
            
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>{props.header_two}</Accordion.Header>
          <Accordion.Body>

            <Row>
              <Col className='d-flex justify-content-center' lg={6} md={6} xs={12}>
                <BModal source={props.front_nric} header={`${props.header_two} Front`} disabled={props.disabled} />
              </Col>
              <Col className='d-flex justify-content-center' lg={6} md={6} xs={12}> 
                <BModal source={props.back_nric} header={`${props.header_two} Back`} disabled={props.disabled} />
              </Col>
            </Row>

          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    );
}

export default Cordion;