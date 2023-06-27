import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from 'react-bootstrap/Badge';
import Button from "react-bootstrap/Button";

function Heading(props) {
    return (
        <>            
            <Col style={{border:"1px solid red"}} lg={5} md={6} xs={12}>
                <h4>
                    {props.page} <Badge bg="success">{props.status}</Badge>
                </h4>
            </Col>
            <Col style={{border:"1px solid red"}} lg={4} md={6} xs={12}>
                
            </Col>
            <Col className="d-flex justify-content-right" style={{border:"1px solid red"}} lg={3} md={6} xs={12}>
                <Button className={props.vis}>Edit profile</Button>
                <Button className={props.vistwo}>Edit profile</Button>
            </Col>

            <Col style={{border:"1px solid red"}} lg={12} md={12} xs={12}>
                <hr />
            </Col>
        </>        
    )
}

export default Heading;
