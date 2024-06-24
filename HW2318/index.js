const gradePoints = {
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0
};

function addRow() {
    const table = document.getElementById('courseTable');
    const rowCount = table.rows.length + 1;
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="checkbox" checked></td>
        <td><input type="text" placeholder="Course #${rowCount}"></td>
        <td><input type="text" placeholder="Grade"></td>
        <td><input type="number" placeholder="Credits"></td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
    `;
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateCoursePlaceholders();
}

function updateCoursePlaceholders() {
    const rows = document.querySelectorAll('#courseTable tr');
    rows.forEach((row, index) => {
        row.cells[1].querySelector('input').placeholder = `Course #${index + 1}`;
    });
}

function calculateGPA() {
    const rows = document.querySelectorAll('#courseTable tr');
    let totalGradePoints = 0;
    let totalCredits = 0;

    rows.forEach(row => {
        const include = row.cells[0].querySelector('input').checked;
        const grade = row.cells[2].querySelector('input').value;
        const credits = parseFloat(row.cells[3].querySelector('input').value);

        if (include && grade in gradePoints && !isNaN(credits)) {
            totalGradePoints += gradePoints[grade] * credits;
            totalCredits += credits;
        }
    });

    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 'N/A';
    document.getElementById('gpaOutput').innerText = 'GPA: ' + gpa;
}

function resetTable() {
    const table = document.getElementById('courseTable');
    table.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        addRow();
    }
    document.getElementById('gpaOutput').innerText = 'GPA: ';
}

// Initialize the table with 5 rows
window.onload = resetTable;