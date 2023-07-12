import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Post_Job from "./Post_Job";
import axios from "axios";
import authHeader from "../../../services/auth-header";

const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINTS = [
  "/api/post/allevents",
  "/api/post/alljobs"
];

function PostTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
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
      const requests = API_ENDPOINTS.map(endpoint => axios.get(`${API_BASE_URL}${endpoint}`, { headers: authHeader() }))
      const responses = await Promise.all(requests);
      const data = responses.map(response => response.data);
      const consolidatedData = data.reduce((accumulator, currentValue) => {
        const key = Object.keys(currentValue)[0]; // Get the key of the current data object
        accumulator[key] = currentValue[key]; // Assign the array to the corresponding key in the accumulator object
        return accumulator;
      }, {});
      console.log(consolidatedData);
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

  const clearFilters = () => {
    setSearch("");
    setSelectedType("");
  };

  return (
    <Col>
      {selectedPost ? (<Post_Job postId={selectedPost} />) : (
        <Container>
          <h1 className="text-center mt-4">Post Table</h1>
          <Form>
            <InputGroup className="my-3">
              <ButtonGroup aria-label="Basic example">
                <Button
                  variant={selectedType === "Job" ? "info" : "primary"}
                  style={{ borderRadius: 0, zIndex: 0 }}
                  onClick={() => setSelectedType("Job")}
                >
                  Job
                </Button>
                <Button
                  variant={selectedType === "Announcement" ? "info" : "primary"}
                  style={{ borderRadius: 0, zIndex: 0 }}
                  onClick={() => setSelectedType("Announcement")}
                >
                  Announcement
                </Button>
              </ButtonGroup>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts"
                value={search}
              />
              <Button
                variant="primary"
                onClick={clearFilters}
                style={{ borderRadius: 0, zIndex: 0 }}
              >
                Clear Filters
              </Button>
            </InputGroup>
          </Form>
          {isLoading && !isInitialized ? (
            <div className="text-center">Loading...</div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Type</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(contacts)
                  .flatMap(key =>
                    contacts[key].filter((item) => {
                      const Message = item.message;
                      const Type = item.type;
                      const Created = item.createdAt || item.datetime;
                      const Status = item.status;
                      return (
                        (search.toLowerCase() === "" ||
                          Message.toLowerCase().includes(search.toLowerCase()) ||
                          Type.toLowerCase().includes(search.toLowerCase()) ||
                          Created.toLowerCase().includes(search.toLowerCase())) &&
                        (selectedType === "" || Type === selectedType)
                      );
                    })
                  )
                  .map((item) => (
                    <tr key={item.id}>
                      <td style={{ maxWidth: "300px" }}>{item.message}</td>
                      <td>{item.type}</td>
                      <td>{item.createdAt || item.datetime}</td>
                      <td align="center">
                        <Button onClick={() => handleViewPost(item.id, item.type)}>View Post</Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Container>
      )}
    </Col>
  );
}

export default PostTable;
