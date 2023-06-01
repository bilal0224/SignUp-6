import axios from "axios";

const client = axios.create({
    baseURL:'https://localhost:7183'
})

export default client;