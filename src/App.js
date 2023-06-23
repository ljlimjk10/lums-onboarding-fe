import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./components/Login/LoginPage";
import ExistingUsersTable from "./components/Users/ExistingUsersTable";
import PendingUsersTable from "./components/Users/PendingUsersTable";


import Button from "./components/Layout/Views/Button";
import ContentCard from "./components/Layout/Views/ContentCard";
import LabelText from "./components/Layout/Views/LabelText";


function App() {
	return (
		<Container fluid className="min-vh-100">
			<Row>
				<Sidebar />
				<ExistingUsersTable />
				{/* <PendingUsersTable /> */}
				{/* <Col xs={10}>
					asd
				</Col> */}
			</Row>
		</Container>
		
		// <div>
		// 	<LoginPage />
		// </div>
	);

}

export default App;
