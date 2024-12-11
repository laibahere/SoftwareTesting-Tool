// Fetch the bug data from localStorage and populate the table
window.onload = function() {
    var bugData = JSON.parse(localStorage.getItem('bugData'));

    if (bugData && bugData.length > 0) {
        var tableBody = document.querySelector('#recentBugTable tbody');
        bugData.forEach(bug => {
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${bug.name}</td>
                <td>${bug.number}</td>
                <td>${bug.severity}</td>
                <td>${bug.status}</td>
            `;
            tableBody.appendChild(row);
        });
    }
};
