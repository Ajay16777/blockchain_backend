"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env_1 = require("./environments/env");
const UserRouter_1 = require("./routers/UserRouter");
class Server {
    constructor() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations() {
        this.connectMongodb();
        this.configureBodyParser();
    }
    connectMongodb() {
        const databaseUrl = (0, env_1.getEnvironmentVariables)().db_url;
        mongoose.connect(databaseUrl).then(() => {
            console.log("mongoDb Connected");
        });
    }
    configureBodyParser() {
        this.app.use(express.json({ limit: "1000mb" }));
        this.app.use(express.urlencoded({
            limit: "1000mb",
            extended: true,
            parameterLimit: 1000000,
        }));
    }
    setRoutes() {
        this.app.use(cors());
        this.app.get("/", (req, res) => {
            res.send("Hello World");
        });
        this.app.use("/api/users", UserRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(200).json({
                // By Default 200 else 404
                message: "Not Found !" + (0, env_1.getEnvironmentVariables)().jwt_secret,
                status_code: 404,
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(200).json({
                // By Default 200 else errorStatus
                message: error.message || "Something Went Wrong. Please Try Again",
                status_code: errorStatus,
            });
        });
    }
}
exports.Server = Server;
