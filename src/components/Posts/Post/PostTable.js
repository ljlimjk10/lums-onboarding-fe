import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Post_Job from "./Post_Job";
import saveAs from "file-saver";
import axios from "axios";
import authHeader from "../../../services/auth-header";


const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINTS = [
  "/api/post/allevents"
];

function PostTable() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);


  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    try {
      setIsLoading(true);
      const requests = API_ENDPOINTS.map(endpoint=>axios.get(`${API_BASE_URL}${endpoint}`,{headers:authHeader()}))
      const responses = await Promise.all(requests);

      const data = responses.map(response=>response.data);
      console.log(data);
      const consolidatedData = data.flat();
      setContacts(consolidatedData)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewPost = (postId) => {
    setSelectedPost(postId)
  }

  const clearFilters = () => {
    setSearch("");
    setSelectedStatus("");
  };

  const handleGoBack = () => {
    setSelectedPost(null);
  };

  const handleGenerateCSV = (postData) => {
    const csvData = [];
    csvData.push([
      "Message",
      "Image",
      "Type",
      "Location",
      "Destination",
      "Pickup Time",
      "Drop-off Time",
      "Price",
      "Payout",
      "Status",
      "Created At",
      "Scheduled For"
    ]);
    const {
      message,
      image,
      type,
      location,
      destination,
      pickupTime,
      dropofftime,
      price,
      payout,
      status,
      createdAt,
      scheduledfor
    } = postData;
    const sanitizedMessage = message ? `"${message.replace(/"/g, '""')}"` : "";
    csvData.push([
      sanitizedMessage,
      image || "",
      type || "",
      location || "",
      destination || "",
      pickupTime || "",
      dropofftime || "",
      price || "",
      payout || "",
      status || "",
      createdAt || "",
      scheduledfor || ""
    ]);

    const csvString = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "post_data.csv");
  }

  return (
    <Col>
      {selectedPost ? (<Post_Job onClick={handleGoBack} postId={selectedPost} handleGenerateCSV={handleGenerateCSV} />) : (
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
                placeholder="Search posts" value={search}
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
              {contacts
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
                    <td style={{ maxWidth: "300px" }}>{item.message}</td>
                    <td>{item.type}</td>
                    <td>{item.createdAt}</td>
                    <td align="center">
                      <Button onClick={() => handleViewPost(item.id)}>View Post</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      )}
    </Col>
  );
}

export default PostTable;