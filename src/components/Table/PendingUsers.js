import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './data.js';
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import User_Status from '../NavBar/User_Status.js';

function PendingUsers() {
  const [contacts, setContacts] = useState(data);
  const [search, setSearch] = useState('');

  return (
    <Col xs={10}>
        <Container>
          
            <h1 className='text-center mt-4'>Pending Users</h1>
            <Form>
              <InputGroup className='my-3'>
              <User_Status />
                {/* onChange for search */}
                
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search users'
                />
              </InputGroup>
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>NRIC</th>
                  <th>Contact</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) => {
                    const Name = `${item.Name}`;
                    const NRIC = item.NRIC;
                    const Address = item.Address;
                    return (
                      search.toLowerCase() === '' ||
                      Name.toLowerCase().includes(search.toLowerCase()) ||
                      NRIC.toLowerCase().includes(search.toLowerCase()) ||
                      Address.toLowerCase().includes(search.toLowerCase())
                    );
                  })
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.Name}</td>
                      <td>{item.NRIC}</td>
                      <td>{item.Address}</td>
                      <td align="center"><Button>View User</Button></td>
                    </tr>
                  ))}
              </tbody>
            </Table>
        </Container>
      </Col>    
  );
}

export default PendingUsers;
