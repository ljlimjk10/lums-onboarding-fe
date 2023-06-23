import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './data';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function UserView({ userId }) {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [nric, setNric] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [telegramHandle, setTelegramHandle] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const [certifications, setCertifications] = useState('');
    const [identificationPhoto, setIdentificationPhoto] = useState('');
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        fetchUser(userId);
    }, [userId]);

    const handleEditProfile = () => {
        setEditing(true);
    };

    const handleSaveChanges = () => {
        // Create a new user object with the updated fields
        const updatedUser = {
            ...user,
            Name: name,
            NRIC: nric,
            Address: address,
            Contact: contact,
            Telegram: telegramHandle,
            'Driver License': driverLicense,
            Certifications: certifications,
            'Identification Photo': identificationPhoto,
            Status: 'editing', // Set the status to 'editing'
        };
        // Update the user in the main data
        const updatedData = data.map((item) =>
            item.id === userId ? updatedUser : item
        );
        // Update the main data (replace the import with the updated data)
        // (You might want to replace this with the actual update logic)
        setUser(updatedUser);
        // Reset the editing state
        setEditing(false);
    };

    const handleDeleteUser = () => {
        // Filter out the deleted user from the main data
        const updatedData = data.filter((item) => item.id !== userId);
        // Update the main data (replace the import with the updated data)
        // (You might want to replace this with the actual update logic)
        setUser(null);
        // Reset the editing state
        setEditing(false);
    };

    const fetchUser = async (userId) => {
        try {
            const user = data.find((item) => item.id === userId);
            if (user) {
                setName(user.Name);
                setNric(user.NRIC);
                setAddress(user.Address);
                setContact(user.Contact);
                setTelegramHandle(user.Telegram);
                setDriverLicense(user['Driver License']);
                setCertifications(user.Certifications);
                setIdentificationPhoto(user['Identification Photo']);
                setUser(user);
            }
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };

    return (
        <div style={{display:'flex'}}>
            <Col xs={5} style={{marginRight:'20px'}}>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNRIC">
                        <Form.Label>NRIC</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={nric}
                            onChange={(e) => setNric(e.target.value)}
                            disabled={!isEditing}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={!isEditing}
                        />
                    </Form.Group>
                    <Form.Group controlId="formContact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={contact}
                            onChange={(e) => setContact(e.target.value)}
                            disabled={!isEditing}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTelegramHandle">
                        <Form.Label>Telegram Handle</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={telegramHandle}
                            onChange={(e) => setTelegramHandle(e.target.value)}
                            disabled={!isEditing}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDriverLicense">
                        <Form.Label>Driver's License</Form.Label>
                        <Image src={driverLicense} thumbnail />
                    </Form.Group>
                    <Form.Group controlId="formCertifications">
                        <Form.Label>Certifications</Form.Label>
                        <Image src={certifications} thumbnail />
                    </Form.Group>
                    <Form.Group controlId="formIdentificationPhoto">
                        <Form.Label>Identification Photo</Form.Label>
                        <Image src={identificationPhoto} thumbnail />
                    </Form.Group>
                    {isEditing ? (
                        <div>
                            <Button variant="primary" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                            <Button variant="danger" onClick={handleDeleteUser}>
                                Delete User Data
                            </Button>
                        </div>
                    ) : (
                        <Button variant="primary" onClick={handleEditProfile}>
                            Edit Profile
                        </Button>
                    )}
                </Form>
            </Col>
        </div>
    );
}

export default UserView;
