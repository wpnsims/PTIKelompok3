// Load data from localStorage if available
let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];

// Function to save data to localStorage
function saveDataToLocalStorage() {
  localStorage.setItem('data', JSON.stringify(data));
}

// Function to display data
function displayData() {
  let html = '';
  data.forEach(item => {
    html += `<div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">${item.fullName}</h5>
                  <p class="card-text">${item.address}</p>
                  <button class="btn btn-primary mr-2 editBtn" data-toggle="modal" data-target="#editModal" data-id="${item.id}">Edit</button>
                  <button class="btn btn-danger deleteBtn" data-id="${item.id}">Delete</button>
                </div>
              </div>`;
  });
  document.getElementById('dataContainer').innerHTML = html;
}

// Display initial data
displayData();

// Add data
document.getElementById('addForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let fullName = document.getElementById('fullName').value;
  let address = document.getElementById('address').value;
  data.push({ id: data.length + 1, fullName: fullName, address: address });
  saveDataToLocalStorage(); // Save data to localStorage
  document.getElementById('addModal').classList.remove('show'); // Hide modal
  document.getElementById('addModal').style.display = 'none'; // Hide modal backdrop
  displayData();
  alert('Data added successfully!');
});

// Edit data
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('editBtn')) {
    let id = e.target.getAttribute('data-id');
    let selectedItem = data.find(item => item.id === parseInt(id));
    document.getElementById('editId').value = selectedItem.id;
    document.getElementById('editFullName').value = selectedItem.fullName;
    document.getElementById('editAddress').value = selectedItem.address;
  }
});

document.getElementById('editForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let id = document.getElementById('editId').value;
  let fullName = document.getElementById('editFullName').value;
  let address = document.getElementById('editAddress').value;
  let index = data.findIndex(item => item.id === parseInt(id));
  data[index].fullName = fullName;
  data[index].address = address;
  saveDataToLocalStorage(); // Save data to localStorage
  document.getElementById('editModal').classList.remove('show'); // Hide modal
  document.getElementById('editModal').style.display = 'none'; // Hide modal backdrop
  displayData();
  alert('Data updated successfully!');
});

// Delete data
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('deleteBtn')) {
    let id = e.target.getAttribute('data-id');
    data = data.filter(item => item.id !== parseInt(id));
    saveDataToLocalStorage(); // Save data to localStorage
    displayData();
    alert('Data deleted successfully!');
  }
});
