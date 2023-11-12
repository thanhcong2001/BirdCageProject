import axios from "axios";

const deleteClient = axios.create({
    baseURL: "https://tainguyen58-001-site1.ftempurl.com/", // api base
    headers: {
        "Content-Type": "application/json",
    },
});

export default deleteClient;
