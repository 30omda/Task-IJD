import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_MOVIE_URL;

const axiosMovie = axios.create({
    baseURL: baseURL,
});

export default axiosMovie;
