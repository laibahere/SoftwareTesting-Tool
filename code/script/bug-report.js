// Event listener for the "Submit Bug Report" button
document.getElementById("submit-btn").addEventListener("click", () => {
    // Collecting all form values into an object
    const bugReport = {
        id: document.getElementById("bug-id").value,
        status: document.getElementById("status").value,
        platform: document.getElementById("platform").value,
        severity: document.getElementById("severity").value,
        module: document.getElementById("module").value,
        fromDate: document.getElementById("from-date").value,
        toDate: document.getElementById("to-date").value,
    };

    // Validate form data: Check if any field is empty
    if (Object.values(bugReport).includes("")) {
        alert("Please fill all fields!"); // Show alert if form is incomplete
        return;
    }

    // Get the table body to append the new report row
    const tableBody = document.querySelector("#report-table tbody");
    const row = document.createElement("tr"); // Create a new row for the table

    // Populate the row with the bug report data
    Object.values(bugReport).forEach(value => {
        const cell = document.createElement("td"); // Create a cell for each value
        cell.textContent = value; // Add the bug report value into the cell
        row.appendChild(cell); // Append the cell to the row
    });

    // Create "Actions" column with Edit and Delete buttons
    const actionsCell = document.createElement("td"); // Create a new cell for actions

    // Create Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit"; // Button label
    editButton.classList.add("edit-button"); // Add CSS class for styling
    // Add event listener for the Edit button to allow editing the report
    editButton.addEventListener("click", () => editBugReport(row));

    // Create Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete"; // Button label
    deleteButton.classList.add("delete-button"); // Add CSS class for styling
    // Add event listener for the Delete button to remove the row from the table
    deleteButton.addEventListener("click", () => deleteBugReport(row));

    // Add both buttons to the actions cell
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    // Append the actions cell to the row
    row.appendChild(actionsCell);

    // Append the row to the table body
    tableBody.appendChild(row);

    // Clear the form for the next input
    document.getElementById("bug-report-form").reset();
});

// Edit functionality: Pre-fill the form with the existing data from the row
function editBugReport(row) {
    const cells = row.querySelectorAll("td"); // Get all cells of the row
    // Fill the form fields with the values from the row
    document.getElementById("bug-id").value = cells[0].textContent;
    document.getElementById("status").value = cells[1].textContent;
    document.getElementById("platform").value = cells[2].textContent;
    document.getElementById("severity").value = cells[3].textContent;
    document.getElementById("module").value = cells[4].textContent;
    document.getElementById("from-date").value = cells[5].textContent;
    document.getElementById("to-date").value = cells[6].textContent;

    // Remove the row from the table to allow updates
    row.remove();
}

// Delete functionality: Remove the bug report row from the table
function deleteBugReport(row) {
    row.remove(); // Simply remove the row from the DOM
}

// Export the table data to PDF
document.getElementById("export-pdf-btn").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Set the title of the PDF
    pdf.text("Bug Reports", 14, 10);

    // Extract the data from the table into a 2D array
    const table = document.getElementById("report-table");
    const tableData = Array.from(table.rows).map(row => 
        Array.from(row.cells).map(cell => cell.textContent)
    );

    // Generate PDF using the autoTable plugin
    pdf.autoTable({
        head: [tableData[0]], // First row as table header
        body: tableData.slice(1), // Remaining rows as table body
    });

    // Save the generated PDF with a filename
    pdf.save("bug-reports.pdf");
});

// Export the table data to Excel
document.getElementById("export-excel-btn").addEventListener("click", () => {
    // Use the XLSX library to convert the table to a workbook
    const table = document.getElementById("report-table");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, "bug-reports.xlsx");
});
