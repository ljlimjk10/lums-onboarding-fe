import React from "react";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";

const SidebarItemCard = (props) => {
	const customStyle = {
		fontFamily: "Inter, sans-serif",
	};
	return (
		<Row className="d-flex ms-1">
			<Col className="align-items-center">
				{props.icon}
				<span className="ms-3 fs-6 text-light" style={customStyle}>
					{props.text}
				</span>
			</Col>
		</Row>
	);
};

export default SidebarItemCard;
