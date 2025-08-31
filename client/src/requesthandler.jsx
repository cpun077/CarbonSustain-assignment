import axios from 'axios'
const BASE_URL = "http://127.0.0.1:8000/api/actions/"

export async function getall() {
    try {
        const response = await axios.get(BASE_URL);
        return response
    } catch (error) {
        return error
    }
}

export async function put(row) {
    try {
        const response = await axios.put(`${BASE_URL}${row.id}/`, row)
        return response
    } catch (error) {
        return error
    }
}

export async function get(id) {
    try {
        const response = await axios.get(`${BASE_URL}${id}/`)
        return response
    } catch (error) {
        return error
    }
}