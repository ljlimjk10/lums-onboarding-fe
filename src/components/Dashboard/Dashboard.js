import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Dashboard_element from "../Layout/Views/Dashboard_element";
import RecentJobTable from "./RecentJobTable";
import RecentEventTable from "./RecentEventTable";


function Dashboard() {
    return (
        <Container>
            <Row>
                <Col lg={12} md={12} xs={12}>
                    <div style={{ fontSize: "60px" }} className="d-flex justify-content-center align-items-center h-100">
                        Dashboard
                    </div>
                </Col>
                <Dashboard_element title="Number of Drivers" lg="4" md="4" xs="12" mTop="20px" mBottom="50px" content="48" fSize="60px" />
                <Dashboard_element title="Number of jobs (Day)" lg="4" md="3" xs="12" mTop="20px" mBottom="20px" content="5"  fSize="60px" />
                <Dashboard_element title="Number of new Drivers" lg="4" md="4" xs="12" mTop="20px" mBottom="20px" content="11" fSize="60px" />
                <RecentEventTable title="Recent Events" />
                <RecentJobTable title="Recent Jobs"/>
            </Row>
        </Container>
    );
}

export default Dashboard;
