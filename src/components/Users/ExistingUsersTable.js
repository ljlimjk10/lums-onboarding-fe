import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { data } from "./data.js";
import Button from "../Layout/Views/Button";
import Col from "react-bootstrap/Col";
import UserView from "./UserView.js";

function ExistingUsersTable() {
	const [contacts, setContacts] = useState(data);
	const [search, setSearch] = useState("");
	const [selectedUserId, setSelectedUserId] = useState(null);
	const handleViewUser = (userId) => {
		setSelectedUserId(userId)
	}
	return (
		<Col xs={10}>
		
			{selectedUserId ? <UserView userId={selectedUserId} /> : 
			
			<Container>
				<h1 className="text-center mt-4"> Existing Users</h1>
				<Form>
					<InputGroup className="my-3">
						{/* onChange for search */}
						<Form.Control
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search users"
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
							<th>Select</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data
							.filter((item) => {
								const Name = `${item.Name}`;
								const NRIC = item.NRIC;
								const Contact = item.Contact;
								const Address = item.Address;
								return (
									search.toLowerCase() === "" ||
									Name.toLowerCase().includes(
										search.toLowerCase()
									) ||
									NRIC.toLowerCase().includes(
										search.toLowerCase()
									) ||
									Contact.toLowerCase().includes(
										search.toLowerCase()
									) ||
									Address.toLowerCase().includes(
										search.toLowerCase()
									)
								);
							})
							.map((item, index) => (
								<tr key={index}>
									<td>{item.Name}</td>
									<td>{item.NRIC}</td>
									<td>{item.Contact}</td>
									<td>{item.Address}</td>
									<td>{<input type="checkbox"></input>}</td>
									<td align="center">
										<Button onClick={()=>handleViewUser(item.id)}>View User</Button>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
				<Button>Generate CSV</Button>
				<Button style={{marginLeft:"10px"}}>Select All</Button>
				<hr />
			</Container>
			}
		</Col>
	);
}

export default ExistingUsersTable;
