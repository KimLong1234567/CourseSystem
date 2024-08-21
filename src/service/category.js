import axios from "axios";

const API_URL = "http://192.168.18.115:8080/api/categories";

const API_URL_MOC = "https://66c2ee55d057009ee9be61b9.mockapi.io/category";

const timeoutPromise = (ms) => {
	return new Promise((_, reject) =>
		setTimeout(() => reject(new Error("Timeout")), ms)
	);
};
export const getCategory = async () => {
	try {
		const response = await Promise.race([
			axios.get(API_URL),
			timeoutPromise(3000),
		]);
		console.log("Fetch API form sever BE");
		return response.data;
	} catch (error) {
		console.warn(
			"Primary API failed or took too long. Falling back to secondary API..."
		);
		try {
			const fallbackResponse = await axios.get(API_URL_MOC);
			console.log("Fetch API form sever MOC");
			return fallbackResponse.data;
		} catch (fallbackError) {
			console.error("Both APIs failed:", fallbackError);
			throw fallbackError;
		}
	}
};

export const getCategoryId = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching filter:", error);
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
