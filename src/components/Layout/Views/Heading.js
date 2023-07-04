import Col from "react-bootstrap/Col";
import Badge from 'react-bootstrap/Badge';
import Button from "react-bootstrap/Button";
import BModalFour from "./BModalFour";

function Heading(props) {
    return (
        <>      
            <Col style={{marginTop:"3%"}} lg={10} md={8} xs={8}>
                <h4>
                    {props.page} <Badge bg="success">{props.status}</Badge>
                </h4>
            </Col>
            <Col style={{marginTop:"3%", marginBottom:"1%" }} className="d-flex flex-row-reverse" lg={2} md={4} xs={4}>
                <BModalFour b_name={props.b_name} header="Confirm Edit?" />
            </Col>
            <hr />
        </>        
    )
}

export default Heading;
