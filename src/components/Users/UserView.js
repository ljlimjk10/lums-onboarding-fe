import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";

import TextBox from "../Layout/Views/TextBox";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
import "../../index.css";
import Heading from "../Layout/Views/Heading";
import Cordion from "../Layout/Views/Cordion";
import {data} from "./data"


function UserView(props) {
    // console.log(data);
    const id = props.userId;
    const [userData,setUserData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(()=>{
        fetchUserData(id);
    },[id]);
    // const { Name = '', NRIC = '', Address = '', Model = '', Capacity = '', Location = '', Contact = '', Telegram = '', Entity = '', Carplate = '' } = userData || {};

    const fetchUserData = (userId) => { // async
        //try{ const response = await fetch('API_ENDPOINT')
        // const data = await response.json();}
        // catch(error) {log(e)}
        const filteredData = data.filter((item)=>item.id===userId)
        // console.log(filteredData);
        setUserData(filteredData[0]);
        // console.log(userData);
    }
    const [formData, setFormData] = useState({});
    const handleInputChange = (fieldName, value) => {
        setFormData(prevData => ({
            ...prevData,
            [fieldName]: value
        }));
    };

    const {Name, NRIC, Address, Make_Model, Capacity, Region, Contact, Telegram, Entity, Carplate,"Identification Photo (Front)": IdentificationPhotoFront,"Identification Photo (Back)": IdentificationPhotoBack,Certifications } = userData||{};

    return (
        <Container>
            <Row>
                <Heading onClick={props.handleGoBack} isEditMode={isEditMode} setIsEditMode={setIsEditMode} status="Approved" page="User Information" name="Edit Profile" />
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Name" disabled={!isEditMode} current={Name}/>
                    <TextBox Label="NRIC" disabled={!isEditMode} current={NRIC}/>
                    <TextBox Label="Address" disabled={!isEditMode} current={Address}/>
                    <TextBox Label="Make/Model" disabled={!isEditMode} current={Make_Model}/>
                    <TextBox Label="Capacity" disabled={!isEditMode} current={Capacity}/>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Location" disabled={!isEditMode} current={Region}/>
                    <TextBox Label="Contact" disabled={!isEditMode} current={Contact}/>
                    <TextBox Label="Telegram" disabled={!isEditMode} current={Telegram}/>
                    <TextBox Label="Entity" disabled={!isEditMode} current={Entity}/>
                    <TextBox Label="Car plate" disabled={!isEditMode} current={Carplate}/>
                </Col>
                <Col lg={12} md={12} xs={12}>
                    <Cordion source="https://picsum.photos/500/300" front_license={IdentificationPhotoFront} back_license={IdentificationPhotoBack} certifications={Certifications} header_one="Driver's License" header_two="NRIC" disabled={!isEditMode} />
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default UserView;
