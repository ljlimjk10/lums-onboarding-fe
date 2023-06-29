import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import ExistingUsersTable from "./components/Users/ExistingUsersTable";
import PendingUsersTable from "./components/Users/PendingUsersTable";
// import UserView from "./components/Users/UserView";
import Post from "./components/Posts/Post/Post";

function App() {
	const postData = {
		message:
			"This message is a message. It has a ivoefndjnvoin fdbfjffnfjfjfjjfjjfj fjfjjfjdejjdjfjcjvbdhh fhfhghfhffoijfcjefjiefvdsnbjkv  eojfoejfiejfijfnknviobvionvksbvobgi. long para long para long para long paralong para long para long para long para v long para v ",
		type: "Type (Use enum TODO)",
		date: "test date (create new date obj with backend data)",
	};
	return (
		<Routes>
			<Route path="/" element={<Navbar />}>
				{/* using pending users table as homepage while developing homepage */}
				<Route index element={<PendingUsersTable />} />
				<Route path="users" element={<ExistingUsersTable />} />
				<Route path="posts" element={<Post postData={postData} />} />
			</Route>
		</Routes>
	);
}

export default App;
