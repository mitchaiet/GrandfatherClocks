const express = require('express');
const path = require('path');

const app = express();

// Define an array of websites to cycle through
const websites = [
  'analog-text-clock',
  'digital-clock',
  'analog-clock',
  // Add additional websites here
];

// Define the interval (in milliseconds) to cycle through websites
const interval = 5000;

// Initialize the current website to the first website in the array
let currentWebsiteIndex = 0;

// Serve the index.html file for the current website
app.get('/', (req, res) => {
  const website = websites[currentWebsiteIndex];
  const filePath = path.join(__dirname, 'Clocks', website, 'dist', 'index.html');
  res.sendFile(filePath);
});

// Cycle through the websites at the specified interval
setInterval(() => {
  currentWebsiteIndex = (currentWebsiteIndex + 1) % websites.length;
}, interval);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
