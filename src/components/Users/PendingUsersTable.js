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
import { useNavigate, Link,useLocation } from "react-router-dom";

const API_BASE_URL = "http://13.215.50.140:3002";
const API_ENDPOINTS = [
  "/api/user/all/pending",
  "/api/user/all/new",
  "/api/user/all/rejected"
];

function PendingUsersTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {  
    fetchPendingUserData();
  }, []);



  const fetchPendingUserData = async () => {
    setIsLoading(true);
    try {
      const requests = API_ENDPOINTS.map(endpoint =>
        axios.get(`${API_BASE_URL}${endpoint}`, { headers: authHeader() })
      );
      const responses = await Promise.all(requests);
      console.log(responses);
      const data = responses.map((response) => response.data.data);
      const consolidatedData = data.flat();
      console.log(consolidatedData);
      setContacts(consolidatedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewUser = (userId) => {
    setSelectedUserId(userId);
    navigate(`/pending-users-table/pending-user-view/${userId}`);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedStatus("");
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
                  variant={selectedStatus === "NEW" ? "info" : "primary"}
                  style={{ borderRadius: 0, zIndex: 0 }}
                  onClick={() => setSelectedStatus("NEW")}
                >
                  New
                </Button>
                <Button
                  variant={selectedStatus === "PENDING" ? "info" : "primary"}
                  style={{ zIndex: 0 }}
                  onClick={() => setSelectedStatus("PENDING")}
                >
                  Pending
                </Button>
                <Button
                  variant={selectedStatus === "REJECTED" ? "info" : "primary"}
                  style={{ borderRadius: 0, zIndex: 0 }}
                  onClick={() => setSelectedStatus("REJECTED")}
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
                        <Link
                          to={`/pending-users-table/pending-user-view/${item.id}`}
                        >
                          <Button onClick={() => handleViewUser(item.id)}>
                            View User
                          </Button>
                        </Link>
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
          <PendingUserView userId={selectedUserId} />
        </Container>
      )}
    </Col>
  );
}

export default PendingUsersTable;
