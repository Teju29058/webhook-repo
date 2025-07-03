const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

let events = [];

app.post('/webhook', (req, res) => {
  const data = req.body;

  // Check for duplicates or outdated events (bonus requirement)
  if (!events.some(e => e.timestamp === data.timestamp)) {
    events.push(data);
    console.log('New event received:', data);
    // Optional: Save to file or database
    fs.writeFileSync('events.json', JSON.stringify(events, null, 2));
  }

  res.status(200).send('Received');
});

app.get('/events', (req, res) => {
  res.json(events);
});

app.listen(3000, () => {
  console.log('Webhook server listening on port 3000');
});
