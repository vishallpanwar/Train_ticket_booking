const username = localStorage.getItem("loggedInUser");
const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
const container = document.getElementById("ticketsContainer");

const userTickets = tickets.filter(ticket => ticket.userId === username);

if (userTickets.length === 0) {
  container.innerHTML = "<p>You have no tickets booked.</p>";
} else {
  userTickets.forEach((t, index) => {
    const div = document.createElement("div");
    div.className = "ticket";
    div.innerHTML = `
      <strong>Ticket ID:</strong> ${t.id}<br>
      <strong>From:</strong> ${t.boarding}<br>
      <strong>To:</strong> ${t.destination}<br>
      <strong>Date:</strong> ${t.date}<br>
      <strong>Boarding Time:</strong> ${t.boardingTime}<br>
      <strong>Arrival Time:</strong> ${t.arrivalTime}<br>
      <button onclick="cancelTicket(${index})">Cancel Ticket</button>
    `;
    container.appendChild(div);
  });
}

function cancelTicket(indexToRemove) {
  const updatedTickets = tickets.filter((t, i) => !(t.userId === username && i === indexToRemove));
  localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  alert("Ticket cancelled.");
  location.reload();
}
