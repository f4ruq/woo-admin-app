const API_BASE = "http://127.0.0.1:8000";

function apiFetch(path, options = {}) {
  const token = localStorage.getItem("access_token");

  return fetch(API_BASE + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
      ...(options.headers || {})
    }
  }).then(res => {
    if (!res.ok) throw new Error("API error");
    return res.json();
  });
}