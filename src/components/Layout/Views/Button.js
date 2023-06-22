import BootstrapButton from "react-bootstrap/Button";

/**
 * Reusable component for button
 */

const Button = (props) => {
	return (
		<BootstrapButton variant="secondary" className="text-center">
			{props.children}
		</BootstrapButton>
	);
};

export default Button;