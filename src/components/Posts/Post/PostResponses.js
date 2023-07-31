import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import PostResponseItem from "./PostResponseItem";
import authHeader from "../../../services/auth-header";

const API_BASE_URL = "http://localhost:3001";
const API_ENDPOINT = "/api/postresponses/";
const ITEMS_PER_PAGE = 10; // Change this number as per your pagination requirement

const PostResponses = (props) => {
	const [postResponseData, setPostResponseData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const pollId = props.pollId;

	useEffect(() => {
		fetchPollData(pollId);
	}, [pollId]);

	const fetchPollData = async (pollId) => {
		try {
			const response = await axios.get(`${API_BASE_URL}${API_ENDPOINT}${pollId}`,{headers:authHeader()});
			setPostResponseData(response.data.data);
		} catch (error) {
			console.error("Error fetching poll data:", error);
			setPostResponseData([]); // Set an empty array on error to avoid the slice error
		}
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// Ensure postResponseData is an array before using slice
	const currentItems = Array.isArray(postResponseData)
		? postResponseData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
		: [];

	// Conditional rendering check for data presence and array type
	console.log(postResponseData);
	let postResponseItemComponents = null;
	if (postResponseData && Array.isArray(postResponseData)) {
		postResponseItemComponents = currentItems.map((item,index) => {
			const utcDateStr = item.responseTime;
			const sgtDateTime = new Date(utcDateStr).toLocaleString("en-sg",{timeZone:"Asia/Singapore"});
			return <PostResponseItem key={item.id} order={index+1} name={item.name} date={sgtDateTime} />
	});
	}

	return (
		<div>
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
			<div>
				{/* Pagination component */}
				<Pagination
					currentPage={currentPage}
					itemsPerPage={ITEMS_PER_PAGE}
					totalItems={postResponseData.length} // Use postResponseData.length directly since it's always an array
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

// TODO: Implement the Pagination component here
const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li key={number} className="page-item">
						<a
							onClick={() => onPageChange(number)}
							href="#!"
							className={`page-link ${currentPage === number ? "active" : ""}`}
						>
							{number}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default PostResponses;
