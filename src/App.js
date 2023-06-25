import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Sidebar from "./components/Sidebar/Sidebar";
// import LoginPage from "./components/Login/LoginPage";
// import UserTable from "./components/Users/ExistingUsersTable";
// import PendingUsers from "./components/Users/PendingUsersTable";
import Post from "./components/Posts/Post/Post";

function App() {
	const postData = {
		message:
			"This message is a message. It has a ivoefndjnvoin fdbfjffnfjfjfjjfjjfj fjfjjfjdejjdjfjcjvbdhh fhfhghfhffoijfcjefjiefvdsnbjkv  eojfoejfiejfijfnknviobvionvksbvobgi. long para long para long para long paralong para long para long para long para v long para v ",
		type: "Type (Use enum TODO)",
		date: "test date (create new date obj with backend data)",
	};
	return (
		<Container fluid className="min-vh-100">
			<Row>
				<Sidebar />
				{/* <PendingUsers /> */}
				{/* <UserTable /> */}
				<Post postData={postData} />
			</Row>
		</Container>
	);
}

export default App;
