import { io } from '/static/socket.io.esm.min.js';
const tableBody = document.getElementById('table-content');
const socket = io();

socket.on('new_event', appendEvent);

socket.on('connect', function() { 
  console.log('Connected to server');
});

function clearEvents() {
  tableBody.innerHTML = '';
}

function appendEvent(event) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${event.date}</td>
    <td class="fst-italic">${event.ip}</td>
    <td>${event.name}</td>
  `;
  tableBody.appendChild(tr);
}

function loadEvents() {
  fetch('/events')
    .then(response => response.json())
    .then(events => {
      console.log(events);
      clearEvents();
      events.forEach(appendEvent);
    });
}

document.querySelector('#update-btn').addEventListener('click', loadEvents);
document.querySelector('#post-btn').addEventListener('click', () => {
  fetch("/events", {
    method: 'POST'
  }).then(response => {
    if (!response.ok)
    {
      alert('Failed to post event');
    }
  });
});

loadEvents();