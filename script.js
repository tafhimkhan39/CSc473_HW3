const gradePointsMap = {
    'A+': 4.0, A: 4.0, 'A-': 3.7,
    'B+': 3.3, B: 3.0, 'B-': 2.7,
    'C+': 2.3, C: 2.0, 'C-': 1.7,
    'D+': 1.3, D: 1.0, 'D-': 0.7,
    'F': 0.0
  };
  
  function addRow() {
    const tableBody = document.querySelector('#gpaTable tbody');
    const newRow = document.createElement('tr');
  
    newRow.innerHTML = `
      <td><input type="checkbox" class="select-row" /></td>
      <td>
        <select class="grade" onchange="calculateGPA()">
          <option value="">Select Grade</option>
          ${Object.keys(gradePointsMap).map(grade => `<option value="${grade}">${grade}</option>`).join('')}
        </select>
      </td>
      <td><input type="number" class="credits" min="0" onchange="calculateGPA()" /></td>
      <td><button class="delete" onclick="deleteRow(this)">X</button></td>
    `;
    tableBody.appendChild(newRow);
  }
  
  function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
    calculateGPA();
  }
  
  function resetFields() {
    document.querySelectorAll('#gpaTable tbody tr').forEach(row => {
      const checkbox = row.querySelector('.select-row');
      if (checkbox.checked) {
        row.querySelector('.grade').value = '';
        row.querySelector('.credits').value = '';
      }
    });
    calculateGPA();
  }
  
  function calculateGPA() {
    let totalPoints = 0;
    let totalCredits = 0;
  
    document.querySelectorAll('#gpaTable tbody tr').forEach(row => {
      const grade = row.querySelector('.grade').value;
      const credits = parseFloat(row.querySelector('.credits').value);
      const isChecked = row.querySelector('.select-row').checked;
  
      if ((isChecked || (grade && credits)) && gradePointsMap[grade]) {
        totalPoints += gradePointsMap[grade] * credits;
        totalCredits += credits;
      }
    });
  
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    document.getElementById('gpaDisplay').textContent = gpa;
  }
  addRow();
  