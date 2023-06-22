import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./components/Login/LoginPage";

import UserTable from "./components/Table/UserTable";
import PendingUsers from "./components/Table/PendingUsers";
import "./components/Table/index.css";



function App() {
	return (
		<Container fluid className="min-vh-100">
			<Row>
				<Sidebar />
				<UserTable />
				
				{/* <PendingUsers /> */}
				
				

				

			</Row>
		</Container>
		
		// <div>
		// 	<LoginPage />
		// </div>
	);

}

export default App;
