import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { data } from "./questionData";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import BModalTwo from "../Layout/Views/BModalTwo";
import BModalThree from "../Layout/Views/BModalThree";

function QuestionTable() {
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
      // Implement CSV generation logic using selectedUsers array
      const csvData = [];
      csvData.push(["Question", "Answer"]);
      // You can access the selected user details using the user id from the 'contacts' array
      const selectedUserDetails = selectedUsers.map((id)=>{
        return contacts.find((user)=>user.id===id)
      });
      // Iterate over selectedUserDetails array
      selectedUserDetails.forEach((user) => {
        const { Question, Answer } = user;
        // Push a row for each selected user
        csvData.push([Question, Answer]);
      });
      const csvString = csvData.map((row)=>row.join(",")).join("\n");
      // Create a Blob object with the CSV data
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });

      // Save the CSV file using FileSaver.js
      saveAs(blob, "selected_users.csv");
      console.log("Selected User Details:", selectedUserDetails);
      
    }
  };
  
    return (
      <Col>
          <Container>
            <h1 className="text-center mt-4">Questions</h1>
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
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Select</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) => {
                    const Question = item.question;
                    const Answer = item.answer;
                    
                    return (
                      (search.toLowerCase() === "" ||
                        Question.toLowerCase().includes(search.toLowerCase()) ||
                        Answer.toLowerCase().includes(search.toLowerCase())
                        ) 
                    );
                  })
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.question}</td>
                      <td>{item.answer}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(item.id)}
                          onChange={() => handleUserSelection(item.id)}
                        />
                      </td>
                      <td align="center">
                      <BModalThree bname="View Question" header="New Question" qn={item.question} ans={item.answer} dis="true"/>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <BModalTwo bname="New Question" header="New Question" />
            <Button style={{ marginLeft: "10px" }} variant="danger">Delete</Button>
            <Button onClick={handleGenerateCSV} style={{ marginLeft: "10px" }}>Generate CSV</Button>
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
      </Col>
    );
  }
  
  export default QuestionTable;
  