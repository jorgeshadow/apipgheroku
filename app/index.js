"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const documentosRoute_1 = __importDefault(require("./routes/documentosRoute"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.onConfig();
        this.onRoutes();
    }
    onConfig() {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(express_1.default.json());
        this.app.use(cors());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    onRoutes() {
        this.app.use('/api', documentosRoute_1.default);
    }
    onStart() {
        this.app.listen(this.app.get('port'), () => {
            console.log('corriendo en el puerto 3000', this.app.get('port'));
        });
    }
}
const server = new Server();
server.onStart();
