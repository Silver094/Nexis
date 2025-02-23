import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"; 

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/login`, userData);
export const fetchHabits = (token) => axios.get(`${API_URL}/habits`, { headers: { Authorization: `Bearer ${token}` } });
export const addHabit = (token, habitData) => axios.post(`${API_URL}/habits`, habitData, { headers: { Authorization: `Bearer ${token}` } });
export const updateHabit = (token, habitName) => axios.put(`${API_URL}/habits/${habitName}`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const deleteHabit = (token, habitName) => axios.delete(`${API_URL}/habits/${habitName}`, { headers: { Authorization: `Bearer ${token}` } });
export const fetchInsights = (userId) => axios.get(`${API_URL}/api/insights/${userId}`);
