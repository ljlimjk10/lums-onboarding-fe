import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import { Button } from "react-bootstrap";

function Dashboard() {
    return (
        <Container>
            <Row>
                <Col lg={12} md={12} xs={12}>
                    <div style={{ fontSize: "60px" }} className="d-flex justify-content-center align-items-center h-100">
                        Dashboard
                    </div>
                </Col>
                <Col lg={6} md={6} xs={12} style={{ height: "400px" }}>
                    <Row style={{marginLeft:"1px"}}>test</Row>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Button variant="danger" style={{width:"100%", height:"100%"}}>asdasas</Button>
                    </div>

                </Col>
                <Col lg={6} md={5} xs={12} style={{ height: "400px" }}>
                    <Row style={{marginLeft:"1px"}}>test</Row>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Button variant="danger" style={{width:"100%", height:"100%"}}>asdasas</Button>
                    </div>
                </Col>
                
                <Col lg={4} md={4} xs={12} style={{ height: "400px", marginTop:"20px"}}>
                    <Row style={{marginLeft:"1px"}}>test5</Row>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Button variant="danger" style={{width:"100%", height:"100%"}}>asdasas</Button>
                    </div>
                </Col>
                <Col lg={4} md={3} xs={12} style={{ height: "400px", marginTop:"20px" }}>
                    <Row style={{marginLeft:"1px"}}>test</Row>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Button variant="danger" style={{width:"100%", height:"100%"}}>asdasas</Button>
                    </div>
                </Col>
                <Col lg={4} md={4} xs={12} style={{ height: "400px", marginTop:"20px" }}>
                    <Row style={{marginLeft:"1px"}}>test</Row>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Button variant="danger" style={{width:"100%", height:"100%"}}>asdasas</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
