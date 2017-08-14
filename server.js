const http = require('http');
const MyServer = require('./src/server').MyServer;

class Server {}

Server.bootstrap = ()=>{
    return new MyServer();
}
exports.Server = Server;