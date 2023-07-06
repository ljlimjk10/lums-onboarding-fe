import React, { useEffect, useState } from 'react';
import { Container, FormControl } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DropDownList from '../Layout/Views/Dropdown';
import TextBox from '../Layout/Views/TextBox';
import Textarea from '../Layout/Views/Textarea';
import Heading_Schedule from '../Layout/Views/Heading_Schedule';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function CreatePostAdHoc() {
    const [pickupTime, setPickupTime] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [location, setLocation] = useState('');
    const [destination, setDestination] = useState('');
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
            Pick-Up Address: ${location} | Start Date: ${pickupDate} | Start Time: ${pickupTime}
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
    }, [pickupTime, pickupDate, location, destination, dropoffTime, dropoffDate, price, payout, riders, model]);

    return (
        <Container>
            <Form>
                <Row>
                    <Heading_Schedule handleValueChange={handleValueChange} page="Create Post" b_name="Post" b_name_two="Schedule" />
                    <Col lg={6} md={6} xs={12}>
                        <DropDownList Label="Job Type" adhoc="1" />
                        <TextBox Label="Pickup Time*" type="time" value={pickupTime} onChange={handleValueChange} />
                        <TextBox Label="Pickup Date*" type="date" value={pickupDate} onChange={handleValueChange} />
                        <TextBox Label="Location*" value={location} onChange={handleValueChange} />
                        <TextBox Label="Destination" value={destination} onChange={handleValueChange} />
                        <TextBox Label="Drop-off Time" type="time" value={dropoffTime} onChange={handleValueChange} />
                        <TextBox Label="Drop-off Date*" type="date" value={dropoffDate} onChange={handleValueChange} />
                        <TextBox Label="Price" type="number" value={price} onChange={handleValueChange} />
                        <TextBox Label="Payout" type="number" value={payout} onChange={handleValueChange} />
                        <TextBox Label="Riders" type="number" value={riders} onChange={handleValueChange} />
                        <TextBox Label="Model*" type="text" value={model} onChange={handleValueChange} />
                        <TextBox Label="Post Time" current={postTime} onChange={handleValueChange} disabled="true" />
                        <TextBox Label="Post Date" current={postDate} onChange={handleValueChange} disabled="true" />
                    </Col>
                    <Col lg={6} md={6} xs={12}>
                        <Textarea Label="Template" rows="24" value={template} onChange={(e) => setTemplate(e.target.value)} />
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default CreatePostAdHoc;
