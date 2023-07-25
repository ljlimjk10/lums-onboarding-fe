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

const API_BASE_URL = "http://13.239.114.14:3001";
const API_ENDPOINTS = ["/api/post/allevents"];

function RecentEventTable(props) {
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
    if (type === "Announcement") {
      navigate(`/posts/post-event-view/${postId}`);
    } else if (type === "Job") {
      navigate(`/posts/post-job-view/${postId}`);
    }
  };

  return (
    <Col lg={props.lg} md={props.md} xs={props.xs}>
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
                {Object.keys(contacts).flatMap((key) =>
                  contacts[key]
                    .slice(-3)
                    .map((item) => (
                      <tr key={item.id}>
                        <td style={{ maxWidth: "200px", wordWrap: "break-word" }}>{item.message}</td>
                        <td>{item.formattedDate}</td>
                        <td align="center">
                          <Button onClick={() => handleViewPost(item.id, item.type)}>View Post</Button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </Col>
  );
}

export default RecentEventTable;
