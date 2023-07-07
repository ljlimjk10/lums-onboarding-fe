import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import UserView from "./UserView.js";
import { saveAs } from "file-saver";
import axios from "axios";
import authHeader from "../../services/auth-header.js";

const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINT = "/api/user/all/verified";

function ExistingUsersTable() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}${API_ENDPOINT}`, { headers: authHeader() });
      if (response.status === 200) {
        setContacts(response.data);
      } else if (response.status === 304) {
        console.log("The data has not been modified since the last request.");
      } else {
        console.log("An error occurred.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };



  const handleViewUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedUsers([]);
    } else {
      const allUserIds = contacts.map((user) => user.id);
      setSelectedUsers(allUserIds);
    }
    setIsSelectAll(!isSelectAll);
  };

  const handleGenerateCSV = () => {
    if (selectedUsers.length === 0) {
      setShowPopUp(true);
    } else {
      setShowPopUp(false);

      const csvData = [];
      csvData.push([
        "Name",
        "NRIC",
        "Address",
        "Model",
        "Capacity",
        "Region",
        "Contact",
        "Telegram",
        "Entity",
        "Carplate",
        "Status",
        "Driver's License (Front)",
        "Driver License (Back)",
        "Identification Photo (Front)",
        "Identification Photo (Back)",
        "Certifications"
      ]);

      const selectedUserDetails = selectedUsers.map((userId) =>
        contacts.find((user) => user.id === userId)
      );

      selectedUserDetails.forEach((user) => {
        const {
          name,
          nricId,
          address,
          car_model,
          car_capacity,
          region,
          contact,
          telehandle,
          affiliation,
          car_plate,
          license_front,
          license_back,
          nric_front,
          nric_back,
          certificate
        } = user;

        csvData.push([
          name,
          nricId,
          address,
          car_model,
          car_capacity,
          region,
          contact,
          telehandle,
          affiliation,
          car_plate,
          license_front,
          license_back,
          nric_front,
          nric_back,
          certificate
        ]);
      });

      const csvContent = csvData.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "selected_users.csv";
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);

      console.log("Selected User Details:", selectedUserDetails);
    }
  };

  const handleGoBack = () => {
    setSelectedUserId(null);
  };

  return (
    <Col>
      {!selectedUserId ? (
        <Container>
          <h1 className="text-center mt-4">Existing Users</h1>
          <Form>
            <InputGroup className="my-3">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users"
              />
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
                  <th>Contact</th>
                  <th>Region</th>
                  <th>Carplate</th>
                  <th>Model</th>
                  <th>Capacity</th>
                  <th>Select</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contacts
                  .filter((item) => {
                    const name = item.name.toLowerCase();
                    const nricId = item.nricId.toLowerCase();
                    const contact = item.contact.toLowerCase();
                    const region = item.region.toLowerCase();
                    const car_plate = item.car_plate.toLowerCase();
                    const car_model = item.car_model.toLowerCase();
                    const car_capacity = item.car_capacity.toLowerCase();
                    return (
                      name.includes(search.toLowerCase()) ||
                      nricId.includes(search.toLowerCase()) ||
                      contact.includes(search.toLowerCase()) ||
                      region.includes(search.toLowerCase()) ||
                      car_plate.includes(search.toLowerCase()) ||
                      car_model.includes(search.toLowerCase()) ||
                      car_capacity.includes(search.toLowerCase())
                    );
                  })
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.nricId}</td>
                      <td>{item.contact}</td>
                      <td>{item.region}</td>
                      <td>{item.car_plate}</td>
                      <td>{item.car_model}</td>
                      <td>{item.car_capacity}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(item.id)}
                          onChange={() => handleUserSelection(item.id)}
                        />
                      </td>
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
          <Button onClick={handleGenerateCSV}>Generate CSV</Button>
          <Button style={{ marginLeft: "10px" }} onClick={handleSelectAll}>
            {isSelectAll ? "Deselect All" : "Select All"}
          </Button>
          {showPopUp && (
            <div className="pop-up-message">
              Please select at least one user to generate the CSV
            </div>
          )}
          <hr />
        </Container>
      ) : (
        <Container>
          <UserView handleGoBack={handleGoBack} userId={selectedUserId} />
        </Container>
      )}
    </Col>
  );
}

export default ExistingUsersTable;
