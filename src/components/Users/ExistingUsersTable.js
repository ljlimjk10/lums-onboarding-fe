import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from "./data.js";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import UserView from "./UserView.js";
import { saveAs } from "file-saver";

function ExistingUsersTable() {
  const [contacts, setContacts] = useState(data);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleViewUser = (userId) => {
    console.log(userId);
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
      const allUserIds = contacts.filter((user) => user.Status === "Accepted").map((user) => user.id);
      setSelectedUsers(allUserIds);
    }
    setIsSelectAll(!isSelectAll);
  };

  const handleGenerateCSV = () => {
    if (selectedUsers.length === 0) {
      setShowPopUp(true);
    } else {
      setShowPopUp(false);
      // Implement CSV generation logic using selectedUsers array
      const csvData = [];
      csvData.push(["Name", "NRIC", "Address", "Model", "Capacity", "Region", "Contact", "Telegram", "Entity", "Carplate", "Status", "Driver's License (Front)", "Driver License (Back)", "Identification Photo (Front)", "Identification Photo (Back)", "Certifications"]);
      // You can access the selected user details using the user id from the 'contacts' array
      const selectedUserDetails = selectedUsers.map((userId) => {
        return contacts.find((user) => user.id === userId)
      });
      // Iterate over selectedUserDetails array
      selectedUserDetails.forEach((user) => {
        const {
          Name,
          NRIC,
          Address,
          Make_Model,
          Capacity,
          Region,
          Contact,
          Telegram,
          Entity,
          Carplate,
          Status,
          "Driver License (Front)": LicenseFront,
          "Driver License (Back)": LicenseBack,
          "Identification Photo (Front)": IdentificationPhotoFront,
          "Identification Photo (Back)": IdentificationPhotoBack,
          Certifications
        } = user;

        // Push a row for each selected user
        csvData.push([Name, NRIC, Address, Make_Model, Capacity, Region, Contact, Telegram, Entity, Carplate, Status, LicenseFront, LicenseBack, IdentificationPhotoFront, IdentificationPhotoBack, Certifications]);
      });
      const csvString = csvData.map((row) => row.join(",")).join("\n");
      // Create a Blob object with the CSV data
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });

      // Save the CSV file using FileSaver.js
      saveAs(blob, "selected_users.csv");
      console.log("Selected User Details:", selectedUserDetails);

    }
  };

  const handleGoBack = () => {
    setSelectedUserId(null);
  };

  return (
    <Col>
      {!selectedUserId && (
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
              {data
                .filter((item) => {
                  const Status = item.Status;
                  const Name = `${item.Name}`;
                  const NRIC = item.NRIC;
                  const Contact = item.Contact;
                  const Region = item.Region;
                  const Carplate = item.Carplate;
                  const Model = item.Make_Model;
                  const Capacity = item.Capacity;

                  return (
                    (search.toLowerCase() === "" ||
                      Name.toLowerCase().includes(search.toLowerCase()) ||
                      NRIC.toLowerCase().includes(search.toLowerCase()) ||
                      Contact.toLowerCase().includes(search.toLowerCase()) ||
                      Region.toLowerCase().includes(search.toLowerCase()) ||
                      Carplate.toLowerCase().includes(search.toLowerCase()) ||
                      Model.toLowerCase().includes(search.toLowerCase()) ||
                      Capacity.toLowerCase().includes(search.toLowerCase())
                    ) &&
                    Status === "Accepted"
                  );
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    <td>{item.NRIC}</td>
                    <td>{item.Contact}</td>
                    <td>{item.Region}</td>
                    <td>{item.Carplate}</td>
                    <td>{item.Make_Model}</td>
                    <td>{item.Capacity}</td>
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
          <Button onClick={handleGenerateCSV}>Generate CSV</Button>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={handleSelectAll}
          >
            {isSelectAll ? "Deselect All" : "Select All"}
          </Button>
          {showPopUp && (
            <div className="pop-up-message">
              Please select at least one user to generate the CSV.
            </div>
          )}
          <hr />
        </Container>
      )}
      {selectedUserId && (
        <Container>
          
          <UserView handleGoBack={handleGoBack} userId={selectedUserId} />
        </Container>
      )}
    </Col>
  );
}

export default ExistingUsersTable;
