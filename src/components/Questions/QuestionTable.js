import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
// import { data } from "./questionData";
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import BModalTwo from "../Layout/Views/BModalTwo";
import BModalThree from "../Layout/Views/BModalThree";
import axios from "axios";
import authHeader from "../../services/auth-header";

function QuestionTable() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const BASE_URL = "http://localhost:3001";


  useEffect(() => {
    fetchData();
  }, []);
  // Fetching Data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/faq/retrieve`,{headers:authHeader()});
      const faqData = response.data.FAQs;
      setContacts(faqData);
    } catch (error) {
      console.error('Error retrieving FAQ data:', error);
    }
  };

  const deleteData = async () => {
    if (selectedQuestions.length === 0) {
      setIsDelete(true);
      setShowPopUp(true);
      return;
    }
    setShowPopUp(false);
    try {
      await Promise.all(selectedQuestions.map((questionId) => axios.delete(`http://localhost:3001/api/faq/delete/${questionId}`)));
      refreshData();
      setSelectedQuestions([]);
    } catch (err) {
      console.error('Error deleting FAQ data:', err);
    }
  };




  const refreshData = () => {
    // Implement the logic to refresh the data in the parent component
    fetchData();
  };

  const handleQuestionSelection = (questionId) => {
    setSelectedQuestions((prevSelectedQuestions) => {
      if (prevSelectedQuestions.includes(questionId)) {
        return prevSelectedQuestions.filter((id) => id !== questionId);
      } else {
        return [...prevSelectedQuestions, questionId];
      }
    });
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedQuestions([]);
    } else {
      const allQuestionIds = contacts.map((question) => question.id);
      setSelectedQuestions(allQuestionIds);
    }
    setIsSelectAll(!isSelectAll);
  };

  const handleGenerateCSV = () => {
    if (selectedQuestions.length === 0) {
      setIsDelete(false);
      setShowPopUp(true);
    } else {
      setShowPopUp(false);
      // Implement CSV generation logic using selectedQuestions array
      const csvData = [];
      csvData.push(['"Question"', '"Answer"']);

      // Iterate over selectedQuestions array
      selectedQuestions.forEach((questionId) => {
        const question = contacts.find((item) => item.id === questionId);
        if (question && question.question && question.answer) {
          const { question: questionText, answer } = question;
          const formattedQuestion = `"${questionText.replace(/\n/g, " ")}"`;
          const formattedAnswer = `"${answer.replace(/\n/g, " ")}"`;
          csvData.push([formattedQuestion, formattedAnswer]);
        }
      });
      const csvString = csvData.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });

      // Save the CSV file using FileSaver.js
      saveAs(blob, "selected_questions.csv");
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
              placeholder="Search questions & answers"
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
            {contacts
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
                      checked={selectedQuestions.includes(item.id)}
                      onChange={() => handleQuestionSelection(item.id)}
                    />
                  </td>
                  <td align="center">
                    <BModalThree refreshData= {refreshData} bname="View Question" header="New Question" qn={item.question} ans={item.answer} id={item.id} dis="true" />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <BModalTwo bname="New Question" header="New Question" onRefreshData={refreshData} />
        <Button onClick={deleteData} style={{ marginLeft: "10px" }} variant="danger">Delete</Button>
        <Button onClick={handleGenerateCSV} style={{ marginLeft: "10px" }}>Generate CSV</Button>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={handleSelectAll}
        >
          {isSelectAll ? "Deselect All" : "Select All"}
        </Button>
        {showPopUp && (
          <div className="pop-up-message">
            Please select {isDelete ? "a question to delete": "at least one user to generate the CSV"}.
          </div>
        )}
        <hr />
      </Container>
    </Col>
  );
}

export default QuestionTable;
