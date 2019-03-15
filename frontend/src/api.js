import axios from "axios";
import config from "./config";

export const api = axios.create({
  baseURL: config.apiUrl
});

export async function getData(url) {
  const response = await api.get(url);
  return response.data;
}

export async function getBills(days) {
  return await getData(`/report/bills/${days}`);
}

export async function getBudget(report) {
  return await getData(`/report/budget/${report}`);
}

export async function getBalance(report) {
  return await getData(`/report/balances/${report}`);
}

export async function getStats(report) {
  return await getData(`/report/stats/${report}`);
}

export async function getTransactions() {
  return await getData(`/tx`);
}

export async function newTransaction(tx) {
  return await api.post("/tx", tx);
}

export async function deleteTransaction(id) {
  return await api.delete(`/tx/${id}`);
}

export async function updateTransaction(_id, tx) {
  return await api.put(`/tx`, { _id, update: tx });
}

export async function getAccounts() {
  return await getData(`/ac`);
}

export async function newAccount(ac) {
  return await api.post("/ac", ac);
}

export async function updateAccount(_id, ac) {
  return await api.put(`/ac`, { _id, update: ac });
}
