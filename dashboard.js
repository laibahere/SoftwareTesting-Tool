let testCases = [];
const summary = {
    total: 0,
    open: 0,
    closed: 0,
    failed: 0,
    passed: 0
};

function onFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("testCaseTitle").value;
    const status = document.getElementById("testCaseStatus").value;

    const newTestCase = { title, status };
    testCases.push(newTestCase);
    updateSummary(status, "add");
    addTestCaseToTable(newTestCase);
    updateSummaryDisplay();
    document.getElementById("testCaseTitle").value = "";
}

function updateSummary(status, operation) {
    if (operation === "add") {
        summary.total++;
        summary[status]++;
    } else if (operation === "remove") {
        summary.total--;
        summary[status]--;
    }
}

function addTestCaseToTable(testCase) {
    const table = document.getElementById("testCaseTable").querySelector("tbody");
    const row = table.insertRow();

    row.insertCell(0).textContent = testCase.title;
    row.insertCell(1).textContent = testCase.status;
    const actions = row.insertCell(2);
    actions.innerHTML = `<button onclick="deleteTestCase(this)">Delete</button>`;
}

function deleteTestCase(button) {
    const row = button.parentElement.parentElement;
    const status = row.cells[1].textContent;
    updateSummary(status, "remove");
    row.remove();
    updateSummaryDisplay();
}

function updateSummaryDisplay() {
    document.getElementById("totalCount").textContent = summary.total;
    document.getElementById("openCount").textContent = summary.open;
    document.getElementById("closedCount").textContent = summary.closed;
    document.getElementById("failedCount").textContent = summary.failed;
    document.getElementById("passedCount").textContent = summary.passed;
}

function downloadReport(format) {
    if (format === "pdf") {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Test Case Summary Report", 10, 10);
        doc.text(`Total Test Cases: ${summary.total}`, 10, 20);
        doc.text(`Open: ${summary.open}`, 10, 30);
        doc.text(`Closed: ${summary.closed}`, 10, 40);
        doc.text(`Failed: ${summary.failed}`, 10, 50);
        doc.text(`Passed: ${summary.passed}`, 10, 60);
        doc.save("TestCaseSummary.pdf");
    } else if (format === "excel") {
        const rows = [["Title", "Status"]];
        testCases.forEach(testCase => rows.push([testCase.title, testCase.status]));

        let csvContent = "data:text/csv;charset=utf-8," 
            + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "TestCaseSummary.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
