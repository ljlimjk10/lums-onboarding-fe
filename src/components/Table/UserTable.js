import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './data.js';
import Col from "react-bootstrap/Col";

function UserTable() {
  const [contacts, setContacts] = useState(data);
  const [search, setSearch] = useState('');

  return (
    <Col xs={10}>
        <Container>
            <h1 className='text-center mt-4'> Existing Users</h1>
            <Form>
              <InputGroup className='my-3'>

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
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((item) => {
                    const fullName = `${item.first_name} ${item.last_name}`;
                    const email = item.email;
                    const phone = item.phone;
                    return (
                      search.toLowerCase() === '' ||
                      fullName.toLowerCase().includes(search.toLowerCase()) ||
                      email.toLowerCase().includes(search.toLowerCase()) ||
                      phone.toLowerCase().includes(search.toLowerCase())
                    );
                  })
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
        </Container>
      </Col>    
  );
}

export default UserTable;
