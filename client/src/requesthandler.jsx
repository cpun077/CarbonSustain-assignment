// client side request functions

import axios from 'axios'
const server = "http://127.0.0.1:8000/"
const BASE_URL = `${server}api/actions/`

export async function getall() {
    try {
        const response = await axios.get(BASE_URL);
        return response
    } catch (error) {
        return error
    }
}

export async function post(row) {
    try {
        const response = await axios.post(BASE_URL, row);
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

export async function del(id) {
    try {
        const response = await axios.delete(`${BASE_URL}${id}/`)
        return response
    } catch (error) {

    }
}