import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Heading_two from '../Layout/Views/Heading_two';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DropDownList from '../Layout/Views/Dropdown';
import TextBox from '../Layout/Views/TextBox';
import Textarea from '../Layout/Views/Textarea';
import TimePicker from '../Layout/Views/TimePicker';
import DatePicker from '../Layout/Views/DatePicker';

function CreatePostAdHoc() {
    const [pickupTime, setPickupTime] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [location, setLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [price, setPrice] = useState('');
    const [payout, setPayout] = useState('');
    const [template, setTemplate] = useState('');

    const handleDestinationChange = (value) => {
        setDestination(value);
        updateTemplate(); // Update the template whenever the destination changes
    };

    const updateTemplate = () => {
        const updatedTemplate = `
      Pickup Time: ${pickupTime}
      Pickup Date: ${pickupDate}
      Location: ${location}
      Destination: ${destination}
      Drop-off Time: ${dropoffTime}
      Drop-off Date: ${dropoffDate}
      Price: ${price}
      Payout: ${payout}
    `;
        setTemplate(updatedTemplate);
    };

    return (
        <Container>
            <Row>
                <Heading_two page="Create Post" b_name="Post" b_name_two="Schedule" />
                <Col lg={6} md={6} xs={12}>
                    <DropDownList Label="Job Type" adhoc="1" />
                    <TimePicker
                        Label="Pickup Time"
                        onChange={(e) => setPickupTime(e.target.value)}
                    />
                    <DatePicker
                        Label="Pickup Date"
                        onChange={(e) => setPickupDate(e.target.value)}
                    />
                    <TextBox
                        Label="Location"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <TextBox
                        Label="Destination"
                        value={destination}
                        onChange={handleDestinationChange}
                    />
                    <TimePicker
                        Label="Drop-off Time"
                        onChange={(e) => setDropoffTime(e.target.value)}
                    />
                    <DatePicker
                        Label="Drop-off Date"
                        onChange={(e) => setDropoffDate(e.target.value)}
                    />
                    <TextBox Label="Price" onChange={(e) => setPrice(e.target.value)} />
                    <TextBox Label="Payout" onChange={(e) => setPayout(e.target.value)} />
                    <TextBox Label="Post Time" disabled />
                    <TextBox Label="Post Date" disabled />
                </Col>
                <Col lg={6} md={6} xs={12}>
                    <Textarea Label="Template" rows="13" value={template} />
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePostAdHoc;
