import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import UserTable from "./components/Table/UserTable";
import "./components/Table/index.css";

import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./components/Login/LoginPage";

function App() {
	return (
		<Container fluid className="min-vh-100">
			<Row>
				<Sidebar />
				<UserTable />
			</Row>
		</Container>

		// <div>
		// 	<LoginPage />
		// </div>
	);

}

export default App;
