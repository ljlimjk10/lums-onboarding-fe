import Col from "react-bootstrap/Col";

/**
 * Reusable component for Content Page
 * Configured to take 10 cols given the sidebar takes 2 cols
 */

const ContentCard = (props) => {
	return (
		<Col className={`min-vh-100 ${props.className}`}>
			{props.children}
		</Col>
	);
};

export default ContentCard;
