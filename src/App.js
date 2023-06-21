import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Sidebar from "./components/Sidebar/Sidebar";

function App() {
	return (
		<Container fluid className="min-vh-100">
			<Row>
				<Sidebar />
			</Row>
		</Container>
	);
}

export default App;
