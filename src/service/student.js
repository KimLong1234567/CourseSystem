import axios from "axios";

const API_URL = "https://66bc665424da2de7ff6a5957.mockapi.io/student";

// Service để gọi các API liên quan đến Post
export const createStudent = async (student) => {
	try {
		console.log(student);
		const response = await axios.post(API_URL, student);
		return response.data;
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
};
