import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./components/Login/LoginPage";
import ExistingUsersTable from "./components/Users/ExistingUsersTable";
import PendingUsersTable from "./components/Users/PendingUsersTable";
import UserView from "./components/Users/UserView";


import Button from "./components/Layout/Views/Button";
import ContentCard from "./components/Layout/Views/ContentCard";
import LabelText from "./components/Layout/Views/LabelText";
import { Nav } from "react-bootstrap";


function App() {
	return (
		<Router>
			<Navbar />	
				<ExistingUsersTable />
				{/* <PendingUsersTable />  */}
				{/* <UserView />  */}
		</Router>




		
			// <Container fluid className="min-vh-100">
				// <Row>
					// <Sidebar />
					/* <UserView /> 
					// <ExistingUsersTable />
					/* <PendingUsersTable /> */
				// </Row>
			/* </Container> */
		
		
		// <div>
		// 	<LoginPage />
		// </div>
	);

}

export default App;
