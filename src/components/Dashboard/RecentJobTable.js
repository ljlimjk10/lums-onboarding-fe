import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import axios from "axios";
import authHeader from "../../services/auth-header";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const API_BASE_URL = "http://13.239.114.14:3002";
const API_ENDPOINTS = ["/api/post/alljobs"];

function RecentJobTable(props) {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [contacts, setContacts] = useState([]);

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
      const consolidatedData = data.reduce((accumulator, currentValue) => {
        const key = Object.keys(currentValue)[0];
        accumulator[key] = currentValue[key].map((item) => {
          const formattedDate = new Date(item.createdAt || item.datetime).toLocaleString("en-SG", {
            timeZone: "Asia/Singapore",
          });
          return { ...item, formattedDate };
        });
        return accumulator;
      }, {});
      setContacts(consolidatedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  const handleViewPost = (postId, type) => {
    setSelectedPost(postId);
    console.log(type);
    if (type === "Announcement") {
      navigate(`/posts/post-event-view/${postId}`);
    } else if (type === "Job") {
      navigate(`/posts/post-job-view/${postId}`);
    }
  };

  const recentJobs = Object.values(contacts).flatMap((key) => key).sort((a, b) => {
    const dateA = new Date(a.createdAt || a.datetime);
    const dateB = new Date(b.createdAt || b.datetime);
    return dateB - dateA;
  }).slice(0, 1);

  return (
    <Col>
      <Container>
        {isLoading && !isInitialized ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <Row style={{ marginLeft: "1px" }}>{props.title}</Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((item) => (
                  <tr key={item.id}>
                    <td style={{ maxWidth: "200px" }}>
                      {item.type === "Job" ? (
                        <>
                          Location: {item.location} <br /> Region: {item.region} <br /> Model: {item.model} <br /> Destination: {item.destination} <br />
                          Pickup Date and Time: {new Date(item.pickupTime).toLocaleString("en-SG", { timeZone: "Asia/Singapore" })} <br />
                          Price: ${item.price} <br /> Payout: ${item.payout} <br />
                          Dropoff Date Data and Time : {new Date(item.dropoffTime).toLocaleString("en-SG", { timeZone: "Asia/Singapore" })} <br />
                          Posted Date and Time: {new Date(item.createdAt).toLocaleString("en-SG", { timeZone: "Asia/Singapore" })}
                        </>
                      ) : (
                        item.message
                      )}
                    </td>
                    <td>{item.formattedDate}</td>
                    <td align="center">
                      <Button onClick={() => handleViewPost(item.id, item.type)}>View Post</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </Col>
  );
}

export default RecentJobTable;
