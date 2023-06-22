import BootstrapButton from "react-bootstrap/Button";

const Button = (props) => {
	return (
		<BootstrapButton variant="secondary" className="text-center">
			{props.children}
		</BootstrapButton>
	);
};

export default Button;
