"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentoscontroller_1 = require("../controllers/documentoscontroller");
class DocumentosRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.onConfig();
    }
    onConfig() {
        this.router.post('/setv/', documentoscontroller_1.documentosController.setdatespg);
        this.router.get('/', documentoscontroller_1.documentosController.obtenerpg);
        this.router.get('/movedb', documentoscontroller_1.documentosController.moverdocumentos);
    }
}
const documentosRoute = new DocumentosRoute();
exports.default = documentosRoute.router;
