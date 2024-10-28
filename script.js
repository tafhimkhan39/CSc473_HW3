const gradePointsMap = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };
  
  function addRow() {
    const tableBody = document.querySelector('#gpaTable tbody');
    const newRow = document.createElement('tr');
  
    const selectCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'select-row';
    selectCell.appendChild(checkbox);
    newRow.appendChild(selectCell);

    const courseCell = document.createElement('td');
    const courseInput = document.createElement('input');
    courseInput.type = 'text';
    courseInput.className = 'course';
    courseInput.placeholder = 'Enter Course Name';
    courseCell.appendChild(courseInput);
    newRow.appendChild(courseCell);
  
    const gradeCell = document.createElement('td');
    const gradeSelect = document.createElement('select');
    gradeSelect.className = 'grade';
  
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Grade';
    gradeSelect.appendChild(defaultOption);
  
    for (const grade in gradePointsMap) {
      const option = document.createElement('option');
      option.value = grade;
      option.textContent = grade;
      gradeSelect.appendChild(option);
    }
  
    gradeCell.appendChild(gradeSelect);
    newRow.appendChild(gradeCell);
  
    const creditsCell = document.createElement('td');
    const creditsInput = document.createElement('input');
    creditsInput.type = 'number';
    creditsInput.className = 'credits';
    creditsInput.min = '0';
    creditsCell.appendChild(creditsInput);
    newRow.appendChild(creditsCell);
  
    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'X';
    deleteButton.onclick = () => deleteRow(deleteButton);
    actionCell.appendChild(deleteButton);
    newRow.appendChild(actionCell);
  
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
        row.querySelector('.course').value = '';
      }
    });
    document.getElementById('gpaDisplay').textContent = '0.00';
  }
  
  function calculateGPA() {
    let totalPoints = 0;
    let totalCredits = 0;
    let checkedRowsExist = false;
  
    document.querySelectorAll('#gpaTable tbody tr').forEach(row => {
      const grade = row.querySelector('.grade').value;
      const credits = parseFloat(row.querySelector('.credits').value);
      const isChecked = row.querySelector('.select-row').checked;
  
      if (isChecked && gradePointsMap[grade] && !isNaN(credits) && credits > 0) {
        totalPoints += gradePointsMap[grade] * credits;
        totalCredits += credits;
        checkedRowsExist = true;
      }
    });
  
    if (!checkedRowsExist) {
      document.querySelectorAll('#gpaTable tbody tr').forEach(row => {
        const grade = row.querySelector('.grade').value;
        const credits = parseFloat(row.querySelector('.credits').value);
  
        if (gradePointsMap[grade] && !isNaN(credits) && credits > 0) {
          totalPoints += gradePointsMap[grade] * credits;
          totalCredits += credits;
        }
      });
    }
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    document.getElementById('gpaDisplay').textContent = gpa;
  }
  addRow();
  
  
  