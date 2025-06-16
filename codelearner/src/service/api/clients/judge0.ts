import axios from "axios";
import { web } from "../../../config/web";

export const JUDGE0_API = axios.create({
  baseURL: web.judgeAPI,
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": import.meta.env.VITE_JUDGE0_API_HOST,
    "x-rapidapi-host": import.meta.env.VITE_JUDGE_API_KEY,
  },
});
