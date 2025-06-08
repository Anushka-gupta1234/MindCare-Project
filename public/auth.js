// public/auth.js
console.log("auth.js loaded and running");

const token = localStorage.getItem("token");

if (!token) {
  console.log("No token found. Redirecting to login.");
  window.location.href = "/"; // Adjust path if different
} else {
  // Optionally validate token by pinging server
  fetch("/MindCare/all", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        console.log("Token invalid or expired. Redirecting.");
        window.location.replace = "/";
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      window.location.replace = "/";
    });
}
