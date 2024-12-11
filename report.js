document.getElementById("submit-btn").addEventListener("click", () => {
    const bugReport = {
        id: document.getElementById("bug-id").value,
        status: document.getElementById("status").value,
        platform: document.getElementById("platform").value,
        severity: document.getElementById("severity").value,
        module: document.getElementById("module").value,
        fromDate: document.getElementById("from-date").value,
        toDate: document.getElementById("to-date").value,
    };

    // Validate form data
    if (Object.values(bugReport).includes("")) {
        alert("Please fill all fields!");
        return;
    }

    // Append data to table
    const tableBody = document.querySelector("#report-table tbody");
    const row = document.createElement("tr");

    Object.values(bugReport).forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    tableBody.appendChild(row);

    // Clear the form
    document.getElementById("bug-report-form").reset();
});

// Export to PDF
document.getElementById("export-pdf-btn").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.text("Bug Reports", 14, 10); // Add title

    // Extract table data
    const table = document.getElementById("report-table");
    const tableData = Array.from(table.rows).map(row => 
        Array.from(row.cells).map(cell => cell.textContent)
    );

    // Generate PDF using autoTable
    pdf.autoTable({
        head: [tableData[0]], // First row as header
        body: tableData.slice(1), // Remaining rows as body
    });

    pdf.save("bug-reports.pdf");
});

// Export to Excel
document.getElementById("export-excel-btn").addEventListener("click", () => {
    const table = document.getElementById("report-table");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(workbook, "bug-reports.xlsx");
});
