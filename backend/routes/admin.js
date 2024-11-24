const API_BASE = "http://localhost:3000/api";

// Fetch and display users
async function fetchUsers() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE}/admin/users`, {
        headers: { Authorization: token },
    });
    const users = await response.json();

    const usersTable = document.getElementById("users-table");
    usersTable.innerHTML = ""; // Clear table before adding rows

    users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.first_name} ${user.last_name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        usersTable.appendChild(row);
    });
}

// Fetch and display inventory
async function fetchInventory() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE}/inventory`, {
        headers: { Authorization: token },
    });
    const cars = await response.json();

    const inventoryTable = document.getElementById("inventory-table");
    inventoryTable.innerHTML = ""; // Clear table before adding rows

    cars.forEach((car) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${car.id}</td>
            <td>${car.make}</td>
            <td>${car.model}</td>
            <td>${car.year}</td>
            <td>${car.price}</td>
            <td>${car.available ? "Yes" : "No"}</td>
            <td>
                <button onclick="deleteCar(${car.id})">Delete</button>
            </td>
        `;
        inventoryTable.appendChild(row);
    });
}

// Delete a user
async function deleteUser(userId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: token },
    });

    if (response.ok) {
        alert("User deleted successfully!");
        fetchUsers();
    } else {
        alert("Failed to delete user.");
    }
}

// Delete a car
async function deleteCar(carId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE}/inventory/${carId}`, {
        method: "DELETE",
        headers: { Authorization: token },
    });

    if (response.ok) {
        alert("Car deleted successfully!");
        fetchInventory();
    } else {
        alert("Failed to delete car.");
    }
}

// Initialize admin dashboard
fetchUsers();
fetchInventory();
