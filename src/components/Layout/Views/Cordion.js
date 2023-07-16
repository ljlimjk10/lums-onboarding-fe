import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BModal from './BModal';

function Cordion(props) {
  console.log(props);
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{props.header_one}</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col className="d-flex justify-content-center" lg={6} md={6} xs={12}>
              <BModal
                source={props.front_license}
                header={`${props.header_one} Front`}
                disabled={props.disabled}
                handleImageUpload={props.handleImageUpload}
                fieldName="license_front"
              />

            </Col>
            <Col className="d-flex justify-content-center" lg={6} md={6} xs={12}>
              <BModal
                source={props.back_license}
                header={`${props.header_one} Back`}
                disabled={props.disabled}
                handleImageUpload={props.handleImageUpload}
                fieldName="license_back"
              />
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>{props.header_two}</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col className="d-flex justify-content-center" lg={6} md={6} xs={12}>
              <BModal
                source={props.front_nric}
                header={`${props.header_two} Front`}
                disabled={props.disabled}
                handleImageUpload={props.handleImageUpload}
                fieldName="nric_front"
              />
            </Col>
            <Col className="d-flex justify-content-center" lg={6} md={6} xs={12}>
              <BModal
                source={props.back_nric}
                header={`${props.header_two} Back`}
                disabled={props.disabled}
                handleImageUpload={props.handleImageUpload}
                fieldName="nric_back"
              />
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>

      {/* May need to look at header & fieldName and change accrodingly. Delete comment if it is correct */}
      <Accordion.Item eventKey="2">
        <Accordion.Header>{props.header_three}</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col className="d-flex justify-content-center" lg={6} md={6} xs={12}>
              <BModal
                source={props.certifications.display_medical}
                header="Medical Certificate"
                disabled={props.disabled}
                handleImageUpload={props.handleImageUpload}
                fieldName="medical"
              />
            </Col>
            <Col className="d-flex justify-content-center" lg={6} md={6} xs={12}>
              <BModal
                source={props.certifications.display_child_safety}
                header="Child Safety Certificate"
                disabled={props.disabled}
                handleImageUpload={props.handleImageUpload}
                fieldName="child_safety"
              />
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Cordion;
