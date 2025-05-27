// In Node.js
const fs = require('fs');
const path = require('path');
const logoPath = path.resolve(__dirname, '../client/src/assets/images/logo.png');
const base64Logo = fs.readFileSync(logoPath, {encoding: 'base64'});
console.log(`data:image/png;base64,${base64Logo}`);