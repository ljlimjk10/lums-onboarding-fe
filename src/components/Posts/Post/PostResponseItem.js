const PostResponseItem = (props) => {
	const orderNum = props.order;
	const name = props.name;
	const date = props.date;
	const contact = props.contact;
	const telehandle = props.telehandle;
	return (
		<tr>
			<td>{orderNum}</td>
			<td>{name}</td>
			<td>{telehandle}</td>
			<td>{contact}</td>
			<td>{date}</td>
		</tr>
	);
};

export default PostResponseItem;
