import axios from "axios";

const API_URL = "https://66bc665424da2de7ff6a5957.mockapi.io/courses";

// Service để gọi các API liên quan đến Post
export const getCourses = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
};
