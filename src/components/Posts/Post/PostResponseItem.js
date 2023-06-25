const PostResponseItem = (props) => {
	const orderNum = props.order;
	const name = props.name;
	const date = props.date;
	return (
		<tr>
			<td>{orderNum}</td>
			<td>{name}</td>
			<td>{date}</td>
		</tr>
	);
};

export default PostResponseItem;
