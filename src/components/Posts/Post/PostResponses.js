import Table from "react-bootstrap/Table";

// TODO convert to retrieve prod data
// TODO add pagination
import { data } from "./test-data";
import PostResponseItem from "./PostResponseItem";

const PostResponses = (props) => {
	const postResponseItemComponents = data.map((item) => (
		<PostResponseItem
			order={item.order}
			name={item.name}
			date={item.date}
		/>
	));
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Order</th>
					<th>Name</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>{postResponseItemComponents}</tbody>
		</Table>
	);
};

export default PostResponses;
