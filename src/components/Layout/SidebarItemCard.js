import React from "react";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "../Layout/Views/Button";
import Image from "react-bootstrap/Image";

import LyloLogo from "../../assets/lylo-logo.svg";

const SidebarItemCard = (props) => {
	const customStyle = {
		fontFamily: "Inter, sans-serif",
	};

	return (
		<Row className="d-flex ms-1 h4">
			<Image src={LyloLogo} className="ms-3" style={{ width: "40%" }} />
			<Col className="align-items-center">
				<Button variant="dark">
					{props.icon}
					<span className="ms-3 fs-6 text-light" style={customStyle}>
						{props.text}
					</span>
				</Button>
			</Col>
		</Row>
	);
};

export default SidebarItemCard;
