import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const QuestionModal = ({ question, onSave, onCancel }) => {
    const [editedQuestion, setEditedQuestion] = useState(question);

    const handleQuestionChange = (event) => {
        setEditedQuestion(event.target.value);
    };

    const handleSave = () => {
        onSave(editedQuestion);
    };

    return (
        <Modal show={true} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Question:</label>
                <input
                    type="text"
                    value={editedQuestion}
                    onChange={handleQuestionChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QuestionModal;
