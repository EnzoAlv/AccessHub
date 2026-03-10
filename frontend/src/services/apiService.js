const API_BASE_URL = 'http://localhost:5282/api';

async function handleResponse(response, method, endpoint) {
  if (!response.ok) {
    let errorMessage;
    try {
      const errorBody = await response.text();
      errorMessage = errorBody || `${method} ${endpoint} falhou com status ${response.status}`;
    } catch {
      errorMessage = `${method} ${endpoint} falhou com status ${response.status}`;
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) return null;

  try {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  return headers;
}

const apiService = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response, 'GET', endpoint);
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response, 'POST', endpoint);
  },

  async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response, 'PUT', endpoint);
  },

  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response, 'DELETE', endpoint);
  },
};

export default apiService;