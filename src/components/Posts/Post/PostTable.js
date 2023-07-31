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

const API_BASE_URL = "http://13.239.114.14:3002";
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

  const clearFilters = () => {
    setSearch("");
    setSelectedType("");
  };
  function convertToSGT(utcTimestamp) {
    // Parse the UTC timestamp to a Date object
    const date = new Date(utcTimestamp);

    // Get the UTC time in milliseconds
    const utcTime = date.getTime();

    // Calculate the time difference between UTC and SGT in milliseconds
    const sgtTimeDifference = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

    // Calculate the Singapore Time (SGT) in milliseconds
    const sgtTime = utcTime + sgtTimeDifference;

    // Create a new Date object for the Singapore Time
    const sgtDate = new Date(sgtTime);

    // Extract the individual components of Singapore Date and Time
    const day = String(sgtDate.getDate()).padStart(2, '0');
    const month = String(sgtDate.getMonth() + 1).padStart(2, '0');
    const year = sgtDate.getFullYear();
    let hours = sgtDate.getHours();
    const minutes = String(sgtDate.getMinutes()).padStart(2, '0');
    const seconds = String(sgtDate.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Create the formatted Singapore Date and Time string
    const singaporeDateTime = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;

    return singaporeDateTime;
  }

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
                      let displayCreated = "";
                      let displayDateTime = "";

                      if (item.createdAt) {
                        const createdAtDate = new Date(item.createdAt);
                        if (createdAtDate instanceof Date && !isNaN(createdAtDate)) {
                          displayCreated = convertToSGT(item.createdAt)
                        }
                      } else if (item.datetime) {
                        const datetimeDate = new Date(item.datetime);
                        if (datetimeDate instanceof Date && !isNaN(datetimeDate)) {
                          displayDateTime = convertToSGT(item.datetime)
                        }
                      }


                      const Message = item.message;
                      const Type = item.type;
                      const Created = item.createdAt || item.datetime;
                      return (
                        (search.toLowerCase() === "" ||
                          Message.toLowerCase().includes(search.toLowerCase()) ||
                          Type.toLowerCase().includes(search.toLowerCase()) ||
                          displayCreated.toLowerCase().includes(search.toLowerCase()) ||
                          displayDateTime.toLowerCase().includes(search.toLowerCase())) &&
                        (selectedType === "" || Type === selectedType)
                      );
                    })
                  )
                  .map((item) => {
                    let toDisplay = "";
                    let displayCreated = "";
                    let displayDateTime = "";
                    if (item.type === "Job") {
                      const {
                        id,
                        location,
                        region,
                        model,
                        destination,
                        pickupTime,
                        price,
                        payout,
                        dropoffTime,
                        status,
                        createdAt,
                      } = item;
                      // Convert pickupTime to Singapore time and date
                      const pickupDateTime = new Date(pickupTime).toLocaleString("en-SG", {
                        timeZone: "Asia/Singapore",
                      });

                      // Convert dropoffTime to Singapore time
                      const dropoffDateTime = new Date(dropoffTime).toLocaleString("en-SG", {
                        timeZone: "Asia/Singapore",
                      });

                      // Convert createdAt to Singapore time
                      const createdDateTime = new Date(createdAt).toLocaleString("en-SG", {
                        timeZone: "Asia/Singapore",
                      });

                      toDisplay = (
                        <div>
                          Location: {location} <br /> Region: {region} <br /> Model: {model} <br />  Destination: {destination} <br />  Pickup Date and Time: {pickupDateTime} <br />  Price: ${price} <br />  Payout: ${payout} <br />  Dropoff Date and Time: {dropoffDateTime} <br />   Posted Date and Time: {createdDateTime}
                        </div>
                      );

                    } else {
                      toDisplay = item.message;
                    }
                    if (item.createdAt) {
                      const createdAtDate = new Date(item.createdAt);
                      if (createdAtDate instanceof Date && !isNaN(createdAtDate)) {
                        displayCreated = createdAtDate.toLocaleString("en-SG", {
                          timeZone: "Asia/Singapore",
                        });
                      }
                    } else if (item.datetime) {
                      const datetimeDate = new Date(item.datetime);
                      if (datetimeDate instanceof Date && !isNaN(datetimeDate)) {
                        displayDateTime = datetimeDate.toLocaleString("en-SG", {
                          timeZone: "Asia/Singapore",
                        });
                      }
                    }

                    return (
                      <tr key={item.id}>
                        <td style={{ maxWidth: "300px" }}>{toDisplay}</td>
                        <td>{item.type}</td>
                        <td>{displayCreated || displayDateTime}</td>
                        <td align="center">
                          <Button onClick={() => handleViewPost(item.id, item.type)}>View Post</Button>
                        </td>
                      </tr>)
                  })}
              </tbody>
            </Table>
          )}
        </Container>
      )}
    </Col>
  );
}

export default PostTable;
