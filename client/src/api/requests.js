import axios from "axios";
import request from "./httpService";

const openCageApiKey = process.env.REACT_APP_OPENCAGE_API_KEY;

const getCoordinates = async (address) => {
	const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${openCageApiKey}`;
	const { data } = await axios.get(url);
	return data;
};

export async function fetchProducts() {
	const url = "/api/products/getUserProducts";
	const { data } = await request.get(url);
	return data;
}

export async function getProductsByLocationRadius() {
	const url = "/api/products/getProductsByLocationRadius";
	const { data } = await request.get(url);
	return data;
}

export async function createProduct(payload) {
	const url = "/api/products";
	const { data } = await request.post(url, payload);
	return data;
}

export async function editProduct(payload) {
	const url = `/api/products/${payload.id}`;
	const { data } = await request.put(url, payload.payload);
	return data;
}

export async function comment(payload) {
	const url = `/api/products/comment/${payload.id}`;
	const { data } = await request.post(url, payload.payload);
	return data;
}

export async function deleteProduct(payload) {
	console.log("I ran", payload);
	const url = `/api/products/${payload.id}`;
	const { data } = await request.delete(url);
	return data;
}

export { getCoordinates };
