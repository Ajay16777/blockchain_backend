"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const ip = require("ip");
let server = new server_1.Server().app;
// let port =  process.env.PORT || 5200;
let host = ip.address();
//run server on ip =
server.listen(5200, host, () => {
    console.log(`Server started on http://${host}:5200`);
});
