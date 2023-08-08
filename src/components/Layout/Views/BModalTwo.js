import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Textarea from './Textarea';
import axios from "axios";
import authHeader from '../../../services/auth-header';

function BModalTwo(props) {
  const {onRefreshData} = props
  const [show, setShow] = useState(false);
  const [question,setQuestion] = useState("");
  const [answer,setAnswer] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  const handleAddQuestionClick = () => {
    createQuestionAndAnswer({question,answer});
    handleClose();

  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleQnsChange = (e) => {
    setQuestion(e.target.value);
    // console.log(question);
  }
  const handleAnsChange = (e) => {
    setAnswer(e.target.value);
    // console.log(answer);

  }
  const createQuestionAndAnswer = async () => {
    try{
      setIsLoading(true);
      const response = await axios.post('http://13.215.50.140:3002/api/faq/create',{question_en:question,answer_en:answer},{headers:authHeader()})
      console.log('Question and answer created successfully');
      onRefreshData();
    }
    catch(error){
      console.log("Error:",error);
    }finally{
    setIsLoading(false)
}
  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        {props.bname}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Textarea pholder="Please enter your question" name="question" onChange={handleQnsChange} />
          <Textarea pholder="Please enter your answer" name="answer" onChange={handleAnsChange} />

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddQuestionClick}>
            Add Question
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default BModalTwo;
