import axios from "axios"

export const api = axios.create({
    baseURL: "http://10.0.0.41:5000"
});

export async function getData(url) {
    const response = await api.get(url)
    return response.data
}

export async function getBills(report) {
    return await getData(`/report/bills/${report}`)
}

export async function getBudget(report) {
    return await getData(`/report/budget/${report}`)
}

export async function getBalance(report) {
    return await getData(`/report/balances/${report}`)
}

export async function getStats(report) {
    return await getData(`/report/stats/${report}`)
}