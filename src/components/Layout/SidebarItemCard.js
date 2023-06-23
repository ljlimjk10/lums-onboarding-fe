import React from "react";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "../Layout/Views/Button";

const SidebarItemCard = (props) => {
	const customStyle = {
		fontFamily: "Inter, sans-serif",
	};

	return (
		<Row className="d-flex ms-1 h4">
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
