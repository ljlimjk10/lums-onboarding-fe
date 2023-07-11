import Col from "react-bootstrap/Col";
import Badge from 'react-bootstrap/Badge';
import Button from "react-bootstrap/Button";
import BModal_Edit from "./BModal_Edit";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Heading(props) {
    const { isEditMode, setIsEditMode } = props;
    const navigate = useNavigate();

    console.log(props);
    
    const handleSaveChanges = () => {
        setIsEditMode(false);
        props.update(props.id);
        navigate('/pending-users-table');
    }

    const handleBack = () => {
        // Perform any necessary actions before navigating back
        navigate('/users'); // Replace '/other-page' with the desired URL
      };

    const handleEdit = () => setIsEditMode(true);
    return (
        <>
            <Col style={{ marginTop: "3%" }} lg={10} md={8} xs={8}>
                <h4>
                    {props.page} <Badge bg="success">{props.status}</Badge>
                </h4>
            </Col>
            <Col style={{ marginTop: "3%", marginBottom: "1%" }} className="d-flex flex-row-reverse" lg={2} md={4} xs={4}>
                {isEditMode ? (<Button variant="success" onClick={handleSaveChanges}>
                    Save Changes
                </Button>) : (<BModal_Edit id={props.id} var="danger" name="Edit" header="Edit" onClick={handleEdit} />)}
                {!isEditMode
                ? (<Button onClick={handleBack} style={{ marginRight: "3%" }}>Back</Button>) : null}
            </Col>
            <hr />
        </>
    )
}

export default Heading;
