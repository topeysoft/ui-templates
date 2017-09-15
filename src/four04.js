"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const server_1 = require("./server");
class Four04 {
    constructor() {
        this.app = express();
        this.app.use(function(req, resp){
            return resp.sendfile(path.join(__dirname, '../public/errors/404.html'))
        });
    }
    static getApp() {
        return (new Four04()).app;
    }
}
exports.Four04 = Four04;
//# sourceMappingURL=host-agent.js.map