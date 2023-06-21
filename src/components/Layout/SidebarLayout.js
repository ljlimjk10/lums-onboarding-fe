import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import LyloLogo from "../../assets/lylo-logo.svg";

const SidebarLayout = (props) => {
	return (
		<Col xs={2} className="bg-dark fs-5 min-vh-100">
			<Row className="py-1 d-flex">
				<Image
					src={LyloLogo}
					className="ms-3"
					style={{ width: "50%" }}
				/>
			</Row>
			{props.children}
		</Col>
	);
};

export default SidebarLayout;
