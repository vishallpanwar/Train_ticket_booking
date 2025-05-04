// Sample data
let users = [];
let bookings = [];
let adminData = { totalTickets: 0, sales: 0 };

// Registration logic
// ========== REGISTRATION ==========
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const adhar = document.getElementById('adhar').value.trim();
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users') || '[]');
  
    // Check if username already exists
    if (users.find(u => u.username === username)) {
      alert("Username already registered");
      return;
    }
  
    users.push({ username, password, email, mobile, adhar });
    localStorage.setItem('users', JSON.stringify(users));
  
    alert("Registration successful!");
    window.location.href = 'login.html';
  });
  

// Login logic
// ========== LOGIN ==========
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
  
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert("Login successful!");
      window.location.href = 'book.html';
    } else {
      alert("Invalid username or password");
    }
  });
  
// Booking logic
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const boardingStation = document.getElementById('boardingStation').value;
  const destinationStation = document.getElementById('destinationStation').value;
  const date = document.getElementById('date').value;

  const ticket = {
    ticketId: bookings.length + 1,
    boardingStation,
    destinationStation,
    date
  };

  bookings.push(ticket);
  displayTickets();
});

function displayTickets() {
  const ticketList = document.getElementById('ticketList');
  ticketList.innerHTML = bookings.map(ticket => 
    `<div>Ticket ID: ${ticket.ticketId} - ${ticket.boardingStation} to ${ticket.destinationStation} on ${ticket.date}</div>`
  ).join('');
}

// Admin logic
function displayAdminData() {
  const customerTable = document.getElementById('customerTable');
  customerTable.innerHTML = users.map((user, index) => 
    `<tr>
      <td>${index + 1}</td>
      <td>${user.username}</td>
      <td>${user.mobile}</td>
      <td>${bookings.filter(b => b.username === user.username).length}</td>
      <td><button onclick="deleteCustomer(${index})">Delete</button></td>
    </tr>`
  ).join('');
}

function deleteCustomer(index) {
  users.splice(index, 1);
  displayAdminData();
}

displayAdminData();
