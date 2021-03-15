//import http package
const http = require('http');

//import app
const app = require('./app');

//set server port
const port = process.env.PORT || 3000;

//create server
const server = http.createServer(app);

//start listener with port
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});