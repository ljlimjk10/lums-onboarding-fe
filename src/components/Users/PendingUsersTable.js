import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from "./data.js";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import PendingUserView from "./PendingUserView.js";

function PendingUsersTable() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleViewUser = (userId) => {
    console.log(userId);
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
              {data
                .filter((item) => {
                  const Name = `${item.Name}`;
                  const NRIC = item.NRIC;
                  const Address = item.Address;
                  const Status = item.Status;
                  return (
                    (search.toLowerCase() === "" ||
                      Name.toLowerCase().includes(search.toLowerCase()) ||
                      NRIC.toLowerCase().includes(search.toLowerCase()) ||
                      Address.toLowerCase().includes(search.toLowerCase())) &&
                    (selectedStatus === "" || Status === selectedStatus)
                  );
                })
                // Only display users with status other than "Accepted" when no filters are selected
                .filter((item) => item.Status !== "Accepted")
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    <td>{item.NRIC}</td>
                    <td>{item.Address}</td>
                    <td>{item.Status}</td>
                    <td align="center">
                      <Button onClick={() => handleViewUser(item.id)}>
                        View User
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        <Container>
          <Button onClick={handleGoBack}>Back</Button>
          <PendingUserView userId={selectedUserId} />
        </Container>
      )}
    </Col>
  );
}

export default PendingUsersTable;
