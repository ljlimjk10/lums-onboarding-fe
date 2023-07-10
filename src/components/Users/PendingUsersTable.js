import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header.js";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import PendingUserView from "./PendingUserView.js";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINTS = [
  "/api/user/all/pending",
  "/api/user/all/new",
  "/api/user/all/rejected"
];

function PendingUsersTable() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPendingUserData();
  }, []);

  const fetchPendingUserData = async () => {
    try {
      setIsLoading(true);
      const requests = API_ENDPOINTS.map(endpoint=>axios.get(`${API_BASE_URL}${endpoint}`,{headers:authHeader()}))
      const responses = await Promise.all(requests);
      const data = responses.map(response=>response.data.data);
      const consolidatedData = data.flat();
      setContacts(consolidatedData)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewUser = (userId) => {
    setSelectedUserId(userId);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedStatus("");
  };

  const handleGoBack = () => {
    setSelectedUserId(null);
  };

  return (
    <Col>
      {!selectedUserId ? (
        <Container>
          <h1 className="text-center mt-4">Pending Users</h1>
          <Form>
            <InputGroup className="my-3">
              <ButtonGroup aria-label="Basic example">
                <Button
                  variant={selectedStatus === "New" ? "info" : "primary"}
                  style={{ borderRadius: 0, zIndex: 0 }}
                  onClick={() => setSelectedStatus("New")}
                >
                  New
                </Button>
                <Button
                  variant={selectedStatus === "Editing" ? "info" : "primary"}
                  style={{ zIndex: 0 }}
                  onClick={() => setSelectedStatus("Editing")}
                >
                  Editing
                </Button>
                <Button
                  variant={selectedStatus === "Rejected" ? "info" : "primary"}
                  style={{ borderRadius: 0, zIndex: 0 }}
                  onClick={() => setSelectedStatus("Rejected")}
                >
                  Rejected
                </Button>
              </ButtonGroup>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users"
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
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : Array.isArray(contacts) && contacts.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>NRIC</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contacts
                  .filter((item) => {
                    const name = item.name.toLowerCase();
                    const nricId = item.nricId.toLowerCase();
                    const address = item.address.toLowerCase();
                    const status = item.status;
                    return (
                      (search.toLowerCase() === "" ||
                        name.includes(search.toLowerCase()) ||
                        nricId.includes(search.toLowerCase()) ||
                        address.includes(search.toLowerCase())) &&
                      (selectedStatus === "" || status === selectedStatus)
                    );
                  })
                  .filter((item) => item.status !== "Accepted")
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.nricId}</td>
                      <td>{item.address}</td>
                      <td>{item.status}</td>
                      <td align="center">
                        <Button onClick={() => handleViewUser(item.id)}>
                          View User
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            <div>No existing users found.</div>
          )}
        </Container>
      ) : (
        <Container>
          <PendingUserView onClick={handleGoBack} userId={selectedUserId} />
        </Container>
      )}
    </Col>
  );
}

export default PendingUsersTable;
