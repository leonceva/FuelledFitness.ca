import axios from 'axios';
/* const BASE_URL = 'http://localhost:8080'; */
// const BASE_URL = 'http://192.168.2.42:8080';
const BASE_URL = 'https://api.fuelledfitness.ca:8443';

export default axios.create({
	baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
