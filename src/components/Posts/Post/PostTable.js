import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import {postdata} from "./postdata";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function PostTable() {
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
  
    const clearFilters = () => {
      setSearch("");
      setSelectedStatus("");
    };
  
    return (
      <Col>
        <Container>
          <h1 className="text-center mt-4">Post Table</h1>
          <Form>
            <InputGroup className="my-3">
              <ButtonGroup aria-label="Basic example">
                <Button
                  variant={selectedStatus === "Posted" ? "info" : "primary"}
                  style={{ borderRadius: 0, zIndex: 0 }}
                  onClick={() => setSelectedStatus("Posted")}
                >
                  Posted
                </Button>
                <Button
                  variant={selectedStatus === "Scheduled" ? "info" : "primary"}
                  style={{ borderRadius: 0, zIndex: 0 }}
                  onClick={() => setSelectedStatus("Scheduled")}
                >
                  Scheduled
                </Button>
              </ButtonGroup>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts"
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
                <th>Message</th>
                <th>Type</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {postdata
                .filter((item) => {
                  const Message = item.message;
                  const Type = item.type;
                  const Created = item.createdAt;
                  const Status = item.status;
                  return (
                    (search.toLowerCase() === "" ||
                      Message.toLowerCase().includes(search.toLowerCase()) ||
                      Type.toLowerCase().includes(search.toLowerCase()) ||
                      Created.toLowerCase().includes(search.toLowerCase())) &&
                    (selectedStatus === "" || Status === selectedStatus)
                  );
                })
                // Only display users with status other than "Accepted" when no filters are selected
                .filter((item) => item.status !== "Accepted")
                .map((item, index) => (
                  <tr key={index}>
                    <td style={{maxWidth:"300px"}}>{item.message}</td>
                    <td>{item.type}</td>
                    <td>{item.createdAt}</td>
                    <td align="center">
                          <Button>View Post</Button>
                      </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      </Col>
    );
  }
  
  export default PostTable;