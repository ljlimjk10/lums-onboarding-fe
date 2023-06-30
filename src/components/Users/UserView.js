import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

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

    const {Name, NRIC, Address, Make_Model, Capacity, Region, Contact, Telegram, Entity, Carplate,"Identification Photo (Front)": IdentificationPhotoFront,"Identification Photo (Back)": IdentificationPhotoBack,Certifications } = userData||{};

    return (
        <Container>
            <Row>
                <Heading status="Approved" page="User Information" b_name="Edit Profile"/>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Name" disabled="true" current={Name}/>
                    <TextBox Label="NRIC" disabled="true" current={NRIC}/>
                    <TextBox Label="Address" disabled="true" current={Address}/>
                    <TextBox Label="Make/Model" disabled="true" current={Make_Model}/>
                    <TextBox Label="Capacity" disabled="true" current={Capacity}/>
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <TextBox Label="Location" disabled="true" current={Region}/>
                    <TextBox Label="Contact" disabled="true" current={Contact}/>
                    <TextBox Label="Telegram" disabled="true" current={Telegram}/>
                    <TextBox Label="Entity" disabled="true" current={Entity}/>
                    <TextBox Label="Car plate" disabled="true" current={Carplate}/>
                </Col>
                <Col lg={12} md={12} xs={12}>
                    <Cordion source="https://picsum.photos/500/300" front_license={IdentificationPhotoFront} back_license={IdentificationPhotoBack} certifications={Certifications} header_one="Driver's License" header_two="NRIC"/>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default UserView;
