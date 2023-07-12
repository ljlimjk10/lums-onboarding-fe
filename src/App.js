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
import PendingUserView from "./components/Users/PendingUserView";
import UserView from "./components/Users/UserView";
import Post_Event from "./components/Posts/Post/Post_Event";
import Post_Job from "./components/Posts/Post/Post_Job";

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
				<Route path="/users/user-view/:id" element={isLoggedIn ? <UserView /> : <LoginPage />} />
				<Route path="/pending-users-table" element={isLoggedIn ? <PendingUsersTable /> : <LoginPage />} />
				<Route path="/pending-users-table/pending-user-view/:id" element={isLoggedIn ? <PendingUserView /> : <LoginPage />} />
				<Route path="/posts" element={isLoggedIn ? <PostTable /> : <LoginPage />} />
				<Route path="/posts/post-job-view/:id" element={isLoggedIn ? <Post_Job /> : <LoginPage />} />
				<Route path="/posts/post-event-view/:id" element={isLoggedIn ? <Post_Event/> : <LoginPage />} />
				<Route path="/support" element={isLoggedIn ? <QuestionTable /> : <LoginPage />} />
				<Route path="/new-post" element={isLoggedIn ? <CreatePost /> : <LoginPage />} />
				<Route path="/new-post/adhoc" element={isLoggedIn ? <CreatePostAdHoc /> : <LoginPage />} />
				<Route path="/new-post/event" element={isLoggedIn ? <CreatePostEvent /> : <LoginPage />} /> 
			</Routes>
		</>
	);
}

export default App;

