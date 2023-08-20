import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * Reusable component for label and text
 * Consumes className and apply to itself
 * Consumes label and text and their respective grid settings
 * Comes with internal settings for grid settings within itself
 */
const LabelText = (props) => {
	return (
		<Row className={`my-4 mx-1 ${props.className}`}>
			<Col xs={props.labelCols}>
				<span className="d-flex justify-content-end">
					{props.label}
				</span>
			</Col>
			<Col xs={props.textCols}>
				<Card bg="secondary" style={{ borderRadius: "0" }}>
					<Card.Body className="pt-1 ps-2">{props.text}</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default LabelText;
