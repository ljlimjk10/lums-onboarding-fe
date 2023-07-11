import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";


import LoginPage from "./components/Login/LoginPage";
import ExistingUsersTable from "./components/Users/ExistingUsersTable";
import PendingUsersTable from "./components/Users/PendingUsersTable";
import { LoginContext } from "./components/Login/LoginContext";
import { LoginProvider } from "./components/Login/LoginContext";
import PostTable from "./components/Posts/Post/PostTable";
import Dashboard from "./components/Dashboard/Dashboard";
import QuestionTable from "./components/Questions/QuestionTable";
import CreatePostAdHoc from "./components/CreatePost/CreatePostAdHoc";
import CreatePost from "./components/CreatePost/CreatePost";
import CreatePostEvent from "./components/CreatePost/CreatePostEvent";

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
	return (
		<>
			{isLoggedIn && <Navbar />}
			<Routes>
				<Route path="/" element={isLoggedIn ? <Dashboard /> : <LoginPage />} />
				<Route path="/users" element={isLoggedIn ? <ExistingUsersTable /> : <LoginPage />} />
				<Route path="/pending-users-table" element={isLoggedIn ? <PendingUsersTable /> : <LoginPage />} />
				<Route path="/pending-users-table/PendingUserView" element={isLoggedIn ? <PendingUsersTable /> : <LoginPage />} />
				<Route path="/Posts" element={isLoggedIn ? <PostTable /> : <LoginPage />} />
				<Route path="/support" element={isLoggedIn ? <QuestionTable /> : <LoginPage />} />
				<Route path="/new-post" element={isLoggedIn ? <CreatePost /> : <LoginPage />} />
				<Route path="/new-post/adhoc" element={isLoggedIn ? <CreatePostAdHoc /> : <LoginPage />} />
				<Route path="/new-post/event" element={isLoggedIn ? <CreatePostEvent /> : <LoginPage />} />
			</Routes>
		</>
	);
}

export default App;

