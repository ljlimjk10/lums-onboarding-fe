import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Link, Route,Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./components/Login/LoginPage";
import ExistingUsersTable from "./components/Users/ExistingUsersTable";
import PendingUsersTable from "./components/Users/PendingUsersTable";
import UserView from "./components/Users/UserView";
import Post from "./components/Posts/Post/Post";

import Button from "./components/Layout/Views/Button";
import ContentCard from "./components/Layout/Views/ContentCard";
import LabelText from "./components/Layout/Views/LabelText";
import { Nav } from "react-bootstrap";

function App() {
	const postData = {
		message:
			"This message is a message. It has a ivoefndjnvoin fdbfjffnfjfjfjjfjjfj fjfjjfjdejjdjfjcjvbdhh fhfhghfhffoijfcjefjiefvdsnbjkv  eojfoejfiejfijfnknviobvionvksbvobgi. long para long para long para long paralong para long para long para long para v long para v ",
		type: "Type (Use enum TODO)",
		date: "test date (create new date obj with backend data)",
	};
	const [isLogin, setLogin] = useState(false)
	
	return (
		<>
		<Router>
			<Routes>
			<Route path="/" element={<PendingUsersTable/>}/>
			<Route path="/ExistingUsersTable" element={<ExistingUsersTable/>}/>
			<Route path="/Posts" element={<Post postData={postData}/>}/>
			<Route path="/LoginPage" element={<LoginPage/>}/>
			</Routes>
			{/* <ExistingUsersTable /> */}
			{/* <PendingUsersTable />  */}
			{/* <Post postData={postData} /> */}
			{/* <UserView vis="visible"/>  */}			
		</Router>
		</>
	);
}

export default App;
