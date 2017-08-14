const path = require('path');
const express = require('express');

class MyServer{
    constructor(){
        this.app = express();
        this.setup();
    };
    setup(){
        this.app.use(express.static(path.join(__dirname, "../public")));
    }
}


exports.MyServer = MyServer;