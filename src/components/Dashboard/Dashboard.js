import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Dashboard_element from "../Layout/Views/Dashboard_element";

function Dashboard() {
    return (
        <Container>
            <Row>

                <Col lg={12} md={12} xs={12}>
                    <div style={{ fontSize: "60px" }} className="d-flex justify-content-center align-items-center h-100">
                        Dashboard
                    </div>
                </Col>
                
                <Dashboard_element title="Most Recent Event" lg="6" md="6" xs="12" mBottom="10px" content="asdasas" />
                <Dashboard_element title="Drivers pending Approval" lg="6" md="5" xs="12" content="20" fSize="60px"/>
                <Dashboard_element title="Number of Drivers" lg="4" md="4" xs="12" mTop="20px" mBottom="50px" content="48" fSize="60px" />
                <Dashboard_element title="Number of jobs (Day)" lg="4" md="3" xs="12" mTop="20px" mBottom="20px" content="5"  fSize="60px" />
                <Dashboard_element title="Number of new Drivers" lg="4" md="4" xs="12" mTop="20px" mBottom="20px" content="11" fSize="60px" />
                
            </Row>
        </Container>
    );
}

export default Dashboard;
