const http = require('http');
const MyServer = require('./src/server').MyServer;



const server = http.createServer((new MyServer()).app);

server.listen(3200);