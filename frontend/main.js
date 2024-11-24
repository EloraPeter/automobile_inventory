const API_BASE = "http://localhost:5000/api";

// Signup logic
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    alert(data.message || "Signup successful. Please log in.");
    if (response.ok) window.location.href = "index.html";
});

// Login logic
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } else {
        alert(data.error || "Login failed.");
    }
});

// Populate dashboard
async function populateDashboard() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE}/inventory`, {
        headers: { Authorization: token },
    });

    const cars = await response.json();
    const table = document.getElementById("inventory-table");
    table.innerHTML = ""; // Clear previous rows

    cars.forEach((car) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${car.make}</td>
            <td>${car.model}</td>
            <td>${car.year}</td>
            <td>NGN ${car.price}</td>
            <td>${car.available ? "Yes" : "No"}</td>
        `;
        table.appendChild(row);
    });
}

// Redirect back to the dashboard
document.getElementById("dashboard-btn")?.addEventListener("click", () => {
    window.location.href = "dashboard.html";
});

// Handle Add Car Form Submission
document.getElementById("add-car-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const year = parseInt(document.getElementById("year").value);
    const price = parseFloat(document.getElementById("price").value);
    const availability = document.getElementById("availability").value === "true";

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_BASE}/inventory/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ make, model, year, price, availability }),
        });

        if (response.ok) {
            alert("Car added successfully!");
            window.location.href = "dashboard.html";
        } else {
            const error = await response.json();
            alert(error.message || "Failed to add car.");
        }
    } catch (err) {
        alert("Something went wrong. Please try again later.");
    }
});


if (window.location.pathname.endsWith("dashboard.html")) {
    populateDashboard();
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });
}



