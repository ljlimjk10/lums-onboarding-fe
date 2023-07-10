import React, { useEffect, useState } from 'react';
import { Container, FormControl } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DropDownList from '../Layout/Views/Dropdown';
import TextBox from '../Layout/Views/TextBox';
import Textarea from '../Layout/Views/Textarea';
import Heading_Schedule from '../Layout/Views/Heading_Schedule';
import Form from 'react-bootstrap/Form';

function CreatePostAdHoc() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };

    const [pickupTime, setPickupTime] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [location, setLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [region, setRegion] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [price, setPrice] = useState('');
    const [payout, setPayout] = useState('');
    const [riders, setRiders] = useState('');
    const [postTime, setPostTime] = useState('');
    const [postDate, setPostDate] = useState('');
    const [template, setTemplate] = useState('');
    const [model, setModel] = useState('');

    const handleValueChange = (value, label) => {
        if (label === "Price") {
            setPrice(value);
        } else if (label === "Location*") {
            setLocation(value);
        } else if (label === "Destination") {
            setDestination(value);
        } else if (label === "Region") {
            setRegion(value);
        } else if (label === "Payout") {
            setPayout(value);
        } else if (label === "Riders") {
            setRiders(value);
        } else if (label === "Model*") {
            setModel(value);
        } else if (label === "Pickup Time*") {
            setPickupTime(value);
        } else if (label === "Drop-off Time") {
            setDropoffTime(value);
        } else if (label === "Pickup Date*") {
            setPickupDate(value);
        } else if (label === "Drop-off Date*") {
            setDropoffDate(value);
        } else if (label ==="Date"){
            setPostDate(value)
        }else if (label==="Time"){
            setPostTime(value);
        }
        updateTemplate();
    };

    const updateTemplate = () => {
        const updatedTemplate = `
            *COMPULSORY ACTION REQUIRED | NEW JOB PAGE (AD-HOC)* *RESPOND ‘YES’ TO ACCEPT ✔ AND ‘NO’ TO REJECT ✖.*
            Route Description:
            Route 1
            Pick-Up Address: ${location} | Region: ${region} | Start Date: ${pickupDate} | Start Time: ${pickupTime}
            Drop-Off Address (if any): ${destination} | End Time (if any): ${dropoffTime}\n
            Type of Project: Point-to-Point (Single) / Point-to-Point (Multi-Stop) / Disposal (Hourly)
            Industry: Education / Workplace (Standard) / Workplace (Silent Hour) / Medical / Tourism / Others\n 
            Expected Daily Project Driver-Payout: S$${price} (BEFORE LyloScheme deduction, if any)
            Expected Daily Project Driver-Payout: S$${payout} (AFTER LyloScheme deduction, if any)\n
            *Job Details:*
            Expected Passengers Per Ride: ${riders} PAX 
            Car Model: ${model}
            Profile of Passengers:
            • Average Age/ Students Grade:
            • Gender (if specified):
            • Special Requirements (if any):
            Job Description: 
            • XX
            *Terms and Conditions Applies*`;

        setTemplate(updatedTemplate);
    };

    useEffect(() => {
        updateTemplate();
    }, [pickupTime, pickupDate, location, destination, region, dropoffTime, dropoffDate, price, payout, riders, model]);

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Heading_Schedule handleValueChange={handleValueChange} page="Create Post" b_name="Post" b_name_two="Schedule" />
                    <Col lg={6} md={6} xs={12}>
                        <DropDownList Label="Job Type" adhoc="1" />
                        <TextBox r="required" style={{ fontWeight: 'bold' }} Label="Pickup Time*" type="time" value={pickupTime} onChange={handleValueChange} />
                        <TextBox r="required" style={{ fontWeight: 'bold' }} Label="Pickup Date*" type="date" value={pickupDate} onChange={handleValueChange} />
                        <TextBox r="required" style={{ fontWeight: 'bold' }} Label="Location*" value={location} onChange={handleValueChange} />
                        <TextBox Label="Destination" value={destination} onChange={handleValueChange} />
                        <TextBox Label="Region" value={region} onChange={handleValueChange} />
                        <TextBox Label="Drop-off Time" type="time" value={dropoffTime} onChange={handleValueChange} />
                        <TextBox style={{ fontWeight: 'bold' }} Label="Drop-off Date*" type="date" value={dropoffDate} onChange={handleValueChange} />
                        <TextBox Label="Price" type="number" value={price} onChange={handleValueChange} />
                        <TextBox Label="Payout" type="number" value={payout} onChange={handleValueChange} />
                        <TextBox Label="Riders" type="number" value={riders} onChange={handleValueChange} />
                        <TextBox r="required" style={{ fontWeight: 'bold' }} Label="Model*" type="text" value={model} onChange={handleValueChange} />
                        <TextBox r="required" style={{ fontWeight: 'bold' }} Label="Post Time*" current={postTime} onChange={handleValueChange} placeholder="Please schedule (Top Right)" />
                        <TextBox r="required" style={{ fontWeight: 'bold' }} Label="Post Date*" current={postDate} onChange={handleValueChange} placeholder="Please schedule (Top Right)" />
                    </Col>

                    <Col lg={6} md={6} xs={12}>
                        <Textarea Label="Template" rows="26" value={template} onChange={(e) => setTemplate(e.target.value)} />
                    </Col>

                </Row>
            </Form>
        </Container>
    );
}

export default CreatePostAdHoc;
