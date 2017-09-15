const path = require('path');
const four04 = require('./four04').Four04;
const express = require('express');

class MyServer{
    constructor(){
        this.app = express();
        this.setup();
    };
    setup(){
        this.app.use(express.static(path.join(__dirname, "../public")));
        this.app.use(four04.getApp());
    }
    getApp(){
       return this.app;
    }
}


exports.MyServer = MyServer;