import axios from "axios";

const API_BASE_URL = "http://localhost:8800/api";

interface Request {
  method: string;
  url: string;
  data?: object;
}

const newRequest = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const makeRequest = async ({ method, url, data }: Request) => {
  const response = await newRequest({ method, url, data });
  return response.data;
};

export default newRequest;
