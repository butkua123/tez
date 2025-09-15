import axios from 'axios';

// Set the base URL of the backend
const API_URL = 'http://localhost:8080/api/users';

// Function to register a new user
export const registerUser = async (user) => {
    return await axios.post(`${API_URL}/register`, user);
};

// Function to log in a user
export const loginUser = async (user) => {
    return await axios.post(`${API_URL}/login`, user);
};

// Function to delete a user
export const deleteUser = async (userId) => {
    return await axios.delete(`${API_URL}/${userId}`);
};
