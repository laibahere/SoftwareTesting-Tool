// In-memory user data
let users = [];
let editIndex = null;

// Form elements
const userForm = document.getElementById('userForm');
const userNameInput = document.getElementById('userName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const userTableBody = document.getElementById('userTableBody');

// Handle form submission
userForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const userName = userNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    // Validation
    if (!userName || !email || !phone) {
        alert("All fields are required!");
        return;
    }

    if (editIndex === null) {
        // Add new user
        users.push({ userName, email, phone });
    } else {
        // Edit existing user
        users[editIndex] = { userName, email, phone };
        editIndex = null;
    }

    userForm.reset();
    renderUsers(); // Update table
});

// Render users in the table
function renderUsers() {
    userTableBody.innerHTML = ''; // Clear table

    if (users.length === 0) {
        userTableBody.innerHTML = `<tr><td colspan="4">No users found</td></tr>`;
    }

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.userName}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });

    // Attach event listeners to the buttons after rendering
    document.querySelectorAll('.edit-button').forEach((button) => {
        button.addEventListener('click', handleEdit);
    });

    document.querySelectorAll('.delete-button').forEach((button) => {
        button.addEventListener('click', handleDelete);
    });
}

// Handle edit button click
function handleEdit(event) {
    editIndex = event.target.getAttribute('data-index');
    const user = users[editIndex];
    userNameInput.value = user.userName;
    emailInput.value = user.email;
    phoneInput.value = user.phone;
}

// Handle delete button click
function handleDelete(event) {
    const index = event.target.getAttribute('data-index');
    users.splice(index, 1); // Remove user
    renderUsers(); // Update table
}

// Initial render of users (empty initially)
renderUsers();
