
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard_element(props){
    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate(props.url);
    };
    
    return (
        <>
            <Col lg={props.lg} md={props.md} xs={props.xs} style={{ height: "300px", marginBottom: props.mBottom, marginTop: props.mTop }}>
                <Row style={{marginLeft:"1px"}}>{props.title}</Row>
                <div className="d-flex justify-content-center align-items-center h-100">
                    <Button variant="danger" style={{width:"100%", height:"100%", fontSize: props.fSize }} onClick={handleButtonClick}>{props.content}</Button>
                </div>
            </Col>
        </>
    )
}

export default Dashboard_element;