import React from "react";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "../Layout/Views/Button";

const SidebarItemCard = (props) => {
	const customStyle = {
		fontFamily: "Inter, sans-serif",
	};

	return (
		<Row>
			<Col>
				<Button className="d-flex w-100" variant="dark">
					<Col xs={2}>{props.icon}</Col>
					<Col>
						<span
							className="d-flex text-start
							text-light px-2"
							style={customStyle}
						>
							{props.text}
						</span>
					</Col>
				</Button>
			</Col>
		</Row>
	);
};

export default SidebarItemCard;
