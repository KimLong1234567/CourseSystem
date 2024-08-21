import axios from "axios";

const API_URL = "http://192.168.18.115:8080/api/courses";
const API_URL_MOC = "https://66bc665424da2de7ff6a5957.mockapi.io/courses";

export const getCourses = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching courses from primary API:", error);
		try {
			console.log("Trying to fetch courses from fallback API...");
			const fallbackResponse = await axios.get(API_URL_MOC);
			return fallbackResponse.data;
		} catch (fallbackError) {
			console.error("Error fetching courses from fallback API:", fallbackError);
			throw fallbackError;
		}
	}
};

export const getCoursesById = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching course by ID from primary API:", error);
		try {
			console.log("Trying to fetch course by ID from fallback API...");
			const fallbackResponse = await axios.get(`${API_URL_MOC}/${id}`);
			return fallbackResponse.data;
		} catch (fallbackError) {
			console.error(
				"Error fetching course by ID from fallback API:",
				fallbackError
			);
			throw fallbackError;
		}
	}
};

export const createCourses = async (course) => {
	try {
		const response = await axios.post(API_URL, course);
		return response.data;
	} catch (error) {
		console.error("Error creating course in primary API:", error);
		try {
			console.log("Trying to create course in fallback API...");
			const fallbackResponse = await axios.post(API_URL_MOC, course);
			return fallbackResponse.data;
		} catch (fallbackError) {
			console.error("Error creating course in fallback API:", fallbackError);
			throw fallbackError;
		}
	}
};

export const updateCourses = async (id, course) => {
	try {
		const response = await axios.put(`${API_URL}/${id}`, course);
		return response.data;
	} catch (error) {
		console.error("Error updating course in primary API:", error);
		try {
			console.log("Trying to update course in fallback API...");
			const fallbackResponse = await axios.put(`${API_URL_MOC}/${id}`, course);
			return fallbackResponse.data;
		} catch (fallbackError) {
			console.error("Error updating course in fallback API:", fallbackError);
			throw fallbackError;
		}
	}
};

export const deleteCourses = async (id) => {
	try {
		await axios.delete(`${API_URL}/${id}`);
	} catch (error) {
		console.error("Error deleting course from primary API:", error);
		try {
			console.log("Trying to delete course from fallback API...");
			await axios.delete(`${API_URL_MOC}/${id}`);
		} catch (fallbackError) {
			console.error("Error deleting course from fallback API:", fallbackError);
			throw fallbackError;
		}
	}
};
