import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DropDownList from '../Layout/Views/Dropdown';
import TextBox from '../Layout/Views/TextBox';
import Textarea from '../Layout/Views/Textarea';
import TimePicker from '../Layout/Views/TimePicker';
import DatePicker from '../Layout/Views/DatePicker';
import Heading_Schedule from '../Layout/Views/Heading_Schedule';

function CreatePostAdHoc() {
    const [pickupTime, setPickupTime] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [location, setLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [price, setPrice] = useState('');
    const [payout, setPayout] = useState('');
    const [postTime, setPostTime] = useState('');
    const [postDate, setPostDate] = useState('');
    const [template, setTemplate] = useState('');

    const handleValueChange = (value, label) => {
        if (label === "Price") {
            setPrice(value);
        } else if (label === "Location") {
            setLocation(value);
        } else if (label === "Destination") {
            setDestination(value);
        } else if (label === "Payout") {
            setPayout(value);
        } else if (label === "Pickup Time") {
            setPickupTime(value);
        } else if (label === "Drop-off Time") {
            setDropoffTime(value);
        } else if (label === "Pickup Date") {
            setPickupDate(value);
        } else if (label === "Drop-off Date") {
            setDropoffDate(value);
        } else if (label === "Date") {
            setPostDate(value)
        } else if (label === "Time") {
            setPostTime(value);
        }
        updateTemplate();
    };

    const updateTemplate = () => {
        const updatedTemplate = `*COMPULSORY ACTION REQUIRED | NEW JOB PAGE (AD-HOC)* *RESPOND ‘YES’ TO ACCEPT ✔ AND ‘NO’ TO REJECT ✖.*
    Route Description:
    Route 1
    Pick-Up Address: ${location} | Start Date: ${pickupDate} | Start Time: ${pickupTime}
    Drop-Off Address (if any): ${destination} | End Time (if any): ${dropoffTime}\n
    Type of Project: Point-to-Point (Single) / Point-to-Point (Multi-Stop) / Disposal (Hourly)
    Industry: Education / Workplace (Standard) / Workplace (Silent Hour) / Medical / Tourism / Others\n 
    Expected Daily Project Driver-Payout: S$${price} (BEFORE LyloScheme deduction, if any)
    Expected Daily Project Driver-Payout: S$${payout} (AFTER LyloScheme deduction, if any)\n
    *Job Details:*
    Expected Passengers Per Ride: XX PAX 
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
    }, [pickupTime, pickupDate, location, destination, dropoffTime, dropoffDate, price, payout]);

    return (
        <Container>
            <Row>
                <Heading_Schedule handleValueChange={handleValueChange} page="Create Post" b_name="Post" b_name_two="Schedule" />
                <Col lg={6} md={6} xs={12}>
                    <DropDownList Label="Job Type" adhoc="1" />
                    <TimePicker Label="Pickup Time" onChange={handleValueChange} />
                    <DatePicker Label="Pickup Date" onChange={handleValueChange} />
                    <TextBox Label="Location" value={location} onChange={handleValueChange} />
                    <TextBox Label="Destination" value={destination} onChange={handleValueChange} />
                    <TimePicker Label="Drop-off Time" onChange={handleValueChange} />
                    <DatePicker Label="Drop-off Date" onChange={handleValueChange} />
                    <TextBox Label="Price" value={price} onChange={handleValueChange} />
                    <TextBox Label="Payout" value={payout} onChange={handleValueChange} />
                    <TimePicker value={postTime} Label="Post Time" onChange={handleValueChange} />
                    <DatePicker value={postDate} Label="Post Date" onChange={handleValueChange} />
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <Textarea Label="Template" rows="13" value={template} onChange={(e) => setTemplate(e.target.value)} />
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePostAdHoc;