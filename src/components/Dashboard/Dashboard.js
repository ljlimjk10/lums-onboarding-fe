import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Dashboard_element from "../Layout/Views/Dashboard_element";
import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import RecentEventTable from "./RecentEventTable";
import RecentJobTable from "./RecentJobTable";


const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINTS = ["/api/user/all/verified", "/api/user/all/pending", "/api/user/all/rejected", "/api/user/all/new", "/api/post/alljobs"];

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [count, setCount] = useState(0); // Define count variable
    const [driverCount, setDriverCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [newCount, setNewCount] = useState(0);
    const [JobCountDay, setJobCountDay] = useState(0);

    useEffect(() => {
      fetchPostData();
    }, []);
  
    const fetchPostData = async () => {
      setIsLoading(true);
      try {
        const requests = API_ENDPOINTS.map((endpoint) =>
          axios.get(`${API_BASE_URL}${endpoint}`, { headers: authHeader() })
        );
        const responses = await Promise.all(requests);
        const data = responses.map((response) => response.data);
        const driverCount = data[0][`data`].length;
        const pendingCount = data[1]['data'].length;
        const rejectedCount = data[2]['data'].length;
        const newCount = data[3]['data'].length;

        const createdAt = new Date(data[4].JobPosts[0].createdAt);
        const dateOnly = createdAt.toLocaleDateString(); // Retrieves only the date portion

        
        const allJobsArr = data[4]['JobPosts'];
        

        const today = new Date().toLocaleDateString(); // Get the current date

        let JobCountDay = 0;
        
        allJobsArr.forEach((job) => {
          const curDate = new Date(job.createdAt).toLocaleDateString(); // Convert job createdAt to date string
        
          if (curDate === today) {
            JobCountDay++;
          }
        });
    
        
        setJobCountDay(JobCountDay)
        setDriverCount(driverCount);        
        setPendingCount(pendingCount);
        setRejectedCount(rejectedCount);
        setNewCount(newCount);


        
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} xs={12}>
                    <div style={{ fontSize: "60px" }} className="d-flex justify-content-center align-items-center h-100">
                        Dashboard
                    </div>
                </Col>
                <Dashboard_element title="Number of Drivers" lg="4" md="4" xs="12" mTop="20px" mBottom="50px" content={driverCount} fSize="60px" url="/users" />
                <Dashboard_element title="Waiting Approval" lg="4" md="4" xs="12" mTop="20px" mBottom="50px" content={pendingCount + rejectedCount + newCount} fSize="60px" url="/pending-users-table" />
                <Dashboard_element title="Jobs (today)" lg="4" md="4" xs="12" mTop="20px" mBottom="50px" content={JobCountDay} fSize="60px" url="/Posts" />
                <RecentEventTable title="Recent Events" />
                <RecentJobTable title="Recent Jobs" />
            </Row>
        </Container>
    );
}

export default Dashboard;
