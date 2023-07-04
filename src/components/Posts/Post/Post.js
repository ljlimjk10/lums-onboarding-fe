import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ContentCard from "../../Layout/Views/ContentCard";
import LabelText from "../../Layout/Views/LabelText";
import Button from "../../Layout/Views/Button";
import PostResponses from "./PostResponses";

const Post = (props) => {
	const handleGoBack = () =>{
		
	}
	return (
		<ContentCard>
			<LabelText
				label={"Message"}
				labelCols={1}
				text={props.postData.message}
				textCols={7}
			></LabelText>
			<LabelText
				label={"Type"}
				labelCols={1}
				text={props.postData.type}
				textCols={7}
			></LabelText>
			<LabelText
				label={"Date"}
				labelCols={1}
				text={props.postData.date}
				textCols={7}
			></LabelText>
			<Row>
				<Col xs={{ span: 3, offset: 1 }}>
					<PostResponses />
				</Col>
			</Row>
			<Row>
				<Col xs={{ span: 3, offset: 1 }}>
					<Button className="m-1">Generate CSV</Button>
					<Button onClick={handleGoBack} className="m-1">Back</Button>
				</Col>
			</Row>
		</ContentCard>
	);
};

export default Post;
