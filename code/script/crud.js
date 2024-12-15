// Variable to keep track of the row being edited
var selectedRow = null;

// Form submit logic - this is triggered when the user submits the form
function onFormSubmit(e) {
    e.preventDefault();  // Prevent the default form submission (page reload)
    
    // Get the form data
    var formData = readFormData();
    
    // Check if a row is being edited or if it's a new record
    if (selectedRow == null) {
        // If no row is selected, insert a new record
        insertNewRecord(formData);
    } else {
        // If a row is selected, update the record
        updateRecord(formData);
    }
    
    // Reset the form after submitting
    resetForm();
}

// Function to retrieve the data from the form
function readFormData() {
    var formData = {};
    formData["bugTitle"] = document.getElementById("bugTitle").value;
    formData["bugDescription"] = document.getElementById("bugDescription").value;
    formData["stepsToReproduce"] = document.getElementById("stepsToReproduce").value;
    formData["expectedBehavior"] = document.getElementById("expectedBehavior").value;
    formData["browser"] = document.getElementById("browser").value;
    formData["bugSeverity"] = document.getElementById("bugSeverity").value;
    return formData;  // Return the form data object
}

// Function to insert a new record into the table
function insertNewRecord(data) {
    var table = document
        .getElementById("bugList")
        .getElementsByTagName("tbody")[0];
    
    // Insert a new row at the end of the table
    var newRow = table.insertRow(table.length);

    // Insert the Bug Title into the first column
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.bugTitle;

    // Insert the Bug Description into the second column
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.bugDescription;

    // Insert the Bug Severity into the third column
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.bugSeverity;

    // Insert the Browser used into the fourth column (show "N/A" if not provided)
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.browser || "N/A";  // If no browser is provided, display 'N/A'

    // Insert action buttons (Edit and Delete) into the fifth column
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `
        <button class="edit-button" onClick="onEdit(this)">Edit</button>
        <button class="delete-button" onClick="onDelete(this)">Delete</button>
    `;
}

// Function to edit an existing record (triggered by the Edit button)
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;  // Get the row that contains the Edit button
    document.getElementById("bugTitle").value = selectedRow.cells[0].innerHTML;  // Set the form's input fields with the existing values
    document.getElementById("bugDescription").value = selectedRow.cells[1].innerHTML;
    document.getElementById("bugSeverity").value = selectedRow.cells[2].innerHTML;
    document.getElementById("browser").value = selectedRow.cells[3].innerHTML;
}

// Function to update an existing record (triggered after editing and submitting)
function updateRecord(formData) {
    // Update the values of the selected row with the new data
    selectedRow.cells[0].innerHTML = formData.bugTitle;
    selectedRow.cells[1].innerHTML = formData.bugDescription;
    selectedRow.cells[2].innerHTML = formData.bugSeverity;
    selectedRow.cells[3].innerHTML = formData.browser || "N/A";  // Handle empty browser field
}

// Function to delete a record (triggered by the Delete button)
function onDelete(td) {
    if (confirm("Are you sure about deleting the data?")) {
        row = td.parentElement.parentElement;  // Get the row containing the Delete button
        document.getElementById("bugList").deleteRow(row.rowIndex);  // Delete the row from the table
        resetForm();  // Reset the form to clear any selected data
    }
}

// Function to reset the form after adding, editing, or deleting a record
function resetForm() {
    // Clear all the form input fields
    document.getElementById("bugTitle").value = "";
    document.getElementById("bugDescription").value = "";
    document.getElementById("stepsToReproduce").value = "";
    document.getElementById("expectedBehavior").value = "";
    document.getElementById("browser").value = "";
    document.getElementById("bugSeverity").value = "low";  // Reset the bug severity to "low" (default)
    
    // Set the selectedRow back to null (no row is being edited now)
    selectedRow = null;
}

