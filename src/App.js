import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";


import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./components/Login/LoginPage";
import ExistingUsersTable from "./components/Users/ExistingUsersTable";
import PendingUsersTable from "./components/Users/PendingUsersTable";
import UserView from "./components/Users/UserView";
import Post from "./components/Posts/Post/Post";
import Post_two from "./components/Posts/Post/Post_two";
import { LoginContext } from "./components/Login/LoginContext";
import { LoginProvider } from "./components/Login/LoginContext";
import PostTable from "./components/Posts/Post/PostTable";
import Dashboard from "./components/Dashboard/Dashboard";
import QuestionTable from "./components/Questions/QuestionTable";
import PendingUserView from "./components/Users/PendingUserView";
import CreatePostAdHoc from "./components/CreatePost/CreatePostAdHoc";
import CreatePost from "./components/CreatePost/CreatePost";
import CreatePostEvent from "./components/CreatePost/CreatePostEvent";
import TimePicker from "./components/Layout/Views/TimePicker";
import DateTimePicker from "./components/Layout/Views/DateTimePicker";
import Datepicker from "./components/Layout/Views/DatePicker";

import Button from "./components/Layout/Views/Button";
import ContentCard from "./components/Layout/Views/ContentCard";
import LabelText from "./components/Layout/Views/LabelText";
import { Nav } from "react-bootstrap";


function App() {
	return (
		<Router>
			<LoginProvider>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="*" element={<MainContent />} />
				</Routes>
			</LoginProvider>
		</Router>
	);
}

function MainContent() {
	const { isLoggedIn } = useContext(LoginContext);
	const postData = {
		message:
			"This message is a message. It has a ivoefndjnvoin fdbfjffnfjfjfjjfjjfj fjfjjfjdejjdjfjcjvbdhh fhfhghfhffoijfcjefjiefvdsnbjkv  eojfoejfiejfijfnknviobvionvksbvobgi. long para long para long para long paralong para long para long para long para v long para v ",
		type: "Type (Use enum TODO)",
		date: "test date (create new date obj with backend data)",
	};
	return (
		<>
			<Navbar />
			{/* <CreatePostEvent /> */}
			<CreatePostAdHoc />

			{/* {isLoggedIn && <Navbar />}
			
			<Routes>
				<Route path="/" element={isLoggedIn ? <Dashboard /> : <LoginPage />} />
				<Route path="/users" element={isLoggedIn ? <ExistingUsersTable /> : <LoginPage />} />
				<Route path="/pending-users-table" element={isLoggedIn ? <PendingUsersTable /> : <LoginPage />} />
				<Route path="/Posts" element={isLoggedIn ? <PostTable /> : <LoginPage />} />
				<Route path="/support" element={isLoggedIn ? <QuestionTable /> : <LoginPage />} />
				<Route path="/new-post" element={isLoggedIn ? <CreatePost /> : <LoginPage />} />
				<Route path="/new-post/adhoc" element={isLoggedIn ? <CreatePostAdHoc /> : <LoginPage />} />
				<Route path="/new-post/event" element={isLoggedIn ? <CreatePostEvent /> : <LoginPage />} />
			</Routes>  */}
		</>
	);
}

export default App;


