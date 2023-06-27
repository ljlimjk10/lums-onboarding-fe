import Col from "react-bootstrap/Col";
import Badge from 'react-bootstrap/Badge';
import Button from "react-bootstrap/Button";

function Heading(props) {
    return (
        <>            
            <Col style={{border:"1px solid red"}} lg={10} md={8} xs={8}>
                <h5>
                    {props.page} <Badge bg="success">{props.status}</Badge>
                </h5>
            </Col>
            <Col style={{border:"1px solid red"}}  className="d-flex flex-row-reverse" lg={2} md={4} xs={4}>
                <Button className={props.vis}>Edit profile</Button>
            </Col>

            <Col lg={12} md={12} xs={12}>
                <hr />
            </Col>
        </>        
    )
}

export default Heading;
