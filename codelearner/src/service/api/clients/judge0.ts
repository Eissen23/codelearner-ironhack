import axios from "axios";

export const JUDGE0_API = axios.create({
  baseURL: import.meta.env.VITE_JUDGE0_API_URL,
  headers: {
    "Content-Type": "application/json",
    'x-rapidapi-key': import.meta.env.VITE_JUDGE0_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_JUDGE0_API_HOST,
  },
});


