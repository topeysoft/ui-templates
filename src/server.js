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
    getApp(){
       return this.app;
    }
}


exports.MyServer = MyServer;