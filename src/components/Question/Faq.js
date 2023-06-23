import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import LabelText from "../Layout/Views/LabelText";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import TextBox from "../Layout/Views/TextBox";
import QuestionModal from "./QuestionModal";

export default function Faq() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [question, setQuestion] = useState("What is this?");
    const [answer, setAnswer] = useState("CoolCool");

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveQuestion = (editedQuestion) => {
        setQuestion(editedQuestion);
        setIsModalOpen(false);
    };

    return (
        <>
            <Col xs={5}>
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={10} style={{ outline: "5px solid", marginTop: "10%" }}>
                        <Form>
                            <TextBox Label="Question" value={question} disabled={true} />
                            <TextBox Label="Answer" value={answer} disabled={true} />
                            <button onClick={handleOpenModal}>Edit Question</button>
                        </Form>
                    </Col>
                </Row>
            </Col>
            {isModalOpen && (
                <QuestionModal
                    question={question}
                    onSave={handleSaveQuestion}
                    onCancel={handleCloseModal}
                />
            )}
        </>
    );
}
