function bookTicket() {
    const boarding = document.getElementById("boarding").value;
    const destination = document.getElementById("destination").value;
    const travelDate = document.getElementById("travelDate").value;
  
    if (!boarding || !destination || !travelDate) {
      alert("Please fill all fields.");
      return;
    }
  
    const ticket = {
      id: Date.now(),
      trainId: "Train-" + Math.floor(Math.random() * 1000),
      userId: localStorage.getItem("loggedInUser"),
      username: localStorage.getItem("loggedInUser"),
      boarding,
      destination,
      date: travelDate,
      tickets: 1,
      boardingTime: "10:00 AM",
      arrivalTime: "04:00 PM"
    };
  
    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    allTickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(allTickets));
  
    document.getElementById("message").innerText =
      `Ticket Booked! Ticket ID: ${ticket.id}`;
  }
  