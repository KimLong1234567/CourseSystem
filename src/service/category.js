import axios from "axios";

const API_URL =
	"https://66c2ee55d057009ee9be61b9.mockapi.io/category" ||
	"http://192.168.18.115:8080/api/categories";

export const getCategory = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
};

export const getCategoryId = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching post:", error);
		throw error;
	}
};

export const createCategory = async (post) => {
	try {
		const response = await axios.post(API_URL, post);
		return response.data;
	} catch (error) {
		console.error("Error creating post:", error);
		throw error;
	}
};

export const updateCategory = async (id, post) => {
	try {
		console.log(id, post);
		// /update_info
		const response = await axios.put(`${API_URL}/${id}`, post);
		return response.data;
	} catch (error) {
		console.error("Error updating post:", error);
		throw error;
	}
};

export const deleteCategory = async (id) => {
	try {
		await axios.delete(`${API_URL}/${id}`);
	} catch (error) {
		console.error("Error deleting post:", error);
		throw error;
	}
};
