import { Server } from "./server";
const ip = require("ip");
let server = new Server().app;

// let port =  process.env.PORT || 5200;

let host = 'localhost';


//run server on ip =
server.listen(5200, host, () => {
    console.log(`Server started on http://${host}:5200`);
    }
);


