import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import BModal_Post from './BModal_Post';

function Heading_Schedule(props) {
  return (
    <>
      <Col style={{ marginTop: '3%' }} lg={10} md={8} xs={8}>
        <h4>
          {props.page} <Badge bg="success">{props.status}</Badge>
        </h4>
      </Col>
      <Col
        style={{ marginTop: '3%', marginBottom: '1%' }}
        className="d-flex flex-row-reverse"
        lg={2}
        md={4}
        xs={4}
      >
        <div style={{ marginLeft: '3%' }}>
          <BModal_Post name={props.b_name} var="danger" header={props.b_name} />
        </div>
      </Col>
      <hr />
    </>
  );
}

export default Heading_Schedule;
