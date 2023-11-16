const fs = require('fs');
const path = require('path');

const MIN_INTERVAL = 1000;
const MAX_INTERVAL = 10000;

const directoryPath = path.join(__dirname, 'payloads');
const files = fs.readdirSync(directoryPath);
const jsFiles = files.filter(file => ['.js', '.cjs'].includes(path.extname(file)));

(function () {
  jsFiles.forEach(file => {
    const modulePath = path.join(directoryPath, file);
    const module = require(modulePath);

    if (typeof module !== 'function') {
      console.error(`Error: ${modulePath} does not have a default export, or the default export is not a function`);
      return;
    }

    const randomInterval = Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL;
    setInterval(module, randomInterval);
  });
})()

module.exports = {}