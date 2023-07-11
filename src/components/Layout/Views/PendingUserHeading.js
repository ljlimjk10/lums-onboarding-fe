import Col from "react-bootstrap/Col";
import Badge from 'react-bootstrap/Badge';
import Button from "react-bootstrap/Button";
import BModalFour from "./BModalFour";
import { useNavigate } from 'react-router-dom';

function PendingUserHeading(props) {
    const navigate = useNavigate();

    const handleBack = () => {
        // Perform any necessary actions before navigating back
        navigate('/pending-users-table'); // Replace '/other-page' with the desired URL
    };    

    return (
        <>      
            <Col style={{marginTop:"3%"}} lg={10} md={8} xs={8}>
                <h4>
                    {props.page} <Badge bg="success">{props.status}</Badge>
                </h4>
            </Col>
            <Col style={{marginTop:"3%", marginBottom:"1%" }} className="d-flex flex-row-reverse" lg={2} md={4} xs={4}>
                <div style={{marginLeft:"3%"}}>
                    <BModalFour id={props.id} name={props.b_name} var="danger" header={props.b_name} value="You have been rejected due to ..." />
                </div>
                <div style={{marginLeft:"3%"}}>
                    <BModalFour id={props.id} name={props.b_name_two} var="success" header={props.b_name_two} value="You have been accepted." />
                </div>
                <div>
                    <Button onClick={handleBack}>Back</Button>
                </div>
            </Col>
            <hr />
        </>        
    )
}

export default PendingUserHeading;