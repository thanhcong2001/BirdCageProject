import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://tainguyen58-001-site1.ftempurl.com/api/", // api base
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
