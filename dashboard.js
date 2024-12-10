// Initial values
var selectedRow = null;

// Form submit logic
function onFormSubmit(e) {
    e.preventDefault();  // Prevent the default form submission
    var formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

// Get method (Retrieving the data)
function readFormData() {
    var formData = {};
    formData["bugTitle"] = document.getElementById("bugTitle").value;
    formData["bugDescription"] = document.getElementById("bugDescription").value;
    formData["stepsToReproduce"] = document.getElementById("stepsToReproduce").value;
    formData["expectedBehavior"] = document.getElementById("expectedBehavior").value;
    formData["browser"] = document.getElementById("browser").value;
    formData["bugSeverity"] = document.getElementById("bugSeverity").value;
    return formData;
}

// Insert the data (Post method)
function insertNewRecord(data) {
    var table = document
        .getElementById("bugList")
        .getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);

    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.bugTitle;

    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.bugDescription;

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.bugSeverity;

    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.browser || "N/A";  // Show 'N/A' if no browser is specified

    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `
        <button onClick="onEdit(this)">Edit</button> 
        <button onClick="onDelete(this)">Delete</button>`;
}




// Insert the data (Post method)
function insertNewRecord(data) {
    // Send POST request to server
    fetch('/submit-bug', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Handle success
        alert('Bug submitted successfully');
        loadBugList(); // Reload the bug list after submission
    })
    .catch(error => {
        console.error('Error submitting bug:', error);
    });
}


// Function to load bugs from the database
function loadBugList() {
    fetch('/bugs')
        .then(response => response.json())
        .then(bugs => {
            const tableBody = document.getElementById("bugList").getElementsByTagName("tbody")[0];
            tableBody.innerHTML = ''; // Clear the existing list
            bugs.forEach(bug => {
                let newRow = tableBody.insertRow(tableBody.length);
                newRow.insertCell(0).innerHTML = bug.bugTitle;
                newRow.insertCell(1).innerHTML = bug.bugDescription;
                newRow.insertCell(2).innerHTML = bug.bugSeverity;
                newRow.insertCell(3).innerHTML = bug.browser || "N/A";
                newRow.insertCell(4).innerHTML = `
                    <button onClick="onEdit(this)">Edit</button> 
                    <button onClick="onDelete(this)">Delete</button>`;
            });
        })
        .catch(error => console.error('Error loading bug list:', error));
}

// Call loadBugList when the page loads
window.onload = loadBugList;





// Edit and update the data (Update method)
// Editing the data (get)
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("bugTitle").value = selectedRow.cells[0].innerHTML;
    document.getElementById("bugDescription").value = selectedRow.cells[1].innerHTML;
    document.getElementById("bugSeverity").value = selectedRow.cells[2].innerHTML;
    document.getElementById("browser").value = selectedRow.cells[3].innerHTML;
}

// Updating the data
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.bugTitle;
    selectedRow.cells[1].innerHTML = formData.bugDescription;
    selectedRow.cells[2].innerHTML = formData.bugSeverity;
    selectedRow.cells[3].innerHTML = formData.browser || "N/A";  // Handle browser field
}

// Deleting the data (delete method)
// Delete the data
function onDelete(td) {
    if (confirm("Are you sure about deleting the data?")) {
        row = td.parentElement.parentElement;
        document.getElementById("bugList").deleteRow(row.rowIndex);
        resetForm();
    }
}

// Resetting the values in form
function resetForm() {
    document.getElementById("bugTitle").value = "";
    document.getElementById("bugDescription").value = "";
    document.getElementById("stepsToReproduce").value = "";
    document.getElementById("expectedBehavior").value = "";
    document.getElementById("browser").value = "";
    document.getElementById("bugSeverity").value = "low";  // Reset to default value
    selectedRow = null;
}