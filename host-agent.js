"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const server_1 = require("./server");
class HostAgent {
    constructor() {
        this.app = express();
        var boot = server_1.Server.bootstrap();
        this.app.use(boot.app);
    }
    static getHostedApp() {
        return (new HostAgent()).app;
    }
}
exports.HostAgent = HostAgent;
//# sourceMappingURL=host-agent.js.map