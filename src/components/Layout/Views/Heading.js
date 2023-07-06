import Col from "react-bootstrap/Col";
import Badge from 'react-bootstrap/Badge';
import Button from "react-bootstrap/Button";
import BModalFour from "./BModalFour";
import { useState } from "react";

function Heading(props) {
    const { isEditMode, setIsEditMode } = props;
    console.log(props);
    const [values,setValues] = useState({});
    const handleSaveChanges = () => {
        setIsEditMode(false);

    }

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
                </Button>) : (<Button variant="danger" onClick={handleEdit}>
                    Edit
                </Button>)}
                {!isEditMode
                ? (<Button onClick={props.onClick} style={{ marginRight: "3%" }}>Back</Button>) : null}
            </Col>
            <hr />
        </>
    )
}

export default Heading;
