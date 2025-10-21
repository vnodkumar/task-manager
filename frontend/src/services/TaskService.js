// frontend/src/services/taskService.js
import axios from "axios";

// configure baseURL:
// - in dev with Vite you can set VITE_API_BASE_URL (optional), otherwise '/api' (use proxy)
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

function extractError(err) {
  // Normalized error message for UI
  return err?.response?.data?.error || err?.response?.data?.message || err.message || "Unknown error";
}

export async function getTasks({ status, q } = {}) {
  try {
    const params = {};
    if (status) params.status = status;
    if (q) params.q = q;
    const res = await api.get("/tasks", { params });
    return res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
}

export async function getTaskById(id) {
  try {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
}

export async function createTask({ title, description, status } = {}) {
  try {
    const payload = { title, description, status };
    const res = await api.post("/tasks", payload);
    return res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
}

export async function updateTask(id, fields = {}) {
  try {
    const res = await api.put(`/tasks/${id}`, fields);
    return res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
}

export async function deleteTask(id) {
  try {
    const res = await api.delete(`/tasks/${id}`);
    // if backend returns 204 No Content, axios returns res.data === '' — return boolean
    return res.status === 204 ? true : res.data;
  } catch (err) {
    throw new Error(extractError(err));
  }
}
