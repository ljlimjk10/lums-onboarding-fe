import ContentCard from "../Layout/Views/ContentCard";
import LabelText from "../Layout/Views/LabelText";

const Post = (props) => {
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
		</ContentCard>
	);
};

export default Post;
