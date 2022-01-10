"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require('cors');
const express_1 = __importDefault(require("express"));
const { Pool } = require('pg');
const app = (0, express_1.default)();
const config = {
    user: 'cguycmbjlrmbza',
    host: 'ec2-75-101-227-91.compute-1.amazonaws.com',
    password: '8b2247ed52084ba04e71435ba13ef6a4cba1cb1d0fc553878e304fd64a6c3d82',
    database: 'd2kl56pbbbsnkv',
    ssl: {
        rejectUnauthorized: false
    },
    port: '5432'
};
const pool = new Pool(config);
var mv = require('mv');
// funcion 1
// res.json({ message: "Hello world!" });
app.set("port", process.env.PORT || 3000);
app.get("/", (_req, res) => {
    res.json({ "ASF": "ASF" });
});
app.post('/setv', (_req, res) => {
});
app.get('/datepg', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield pool.query(`select * from ventas`);
    res.json(resp);
}));
app.get('/movedb', (_req, res) => {
    mv('G:/My Drive/fdbs/PRUEBA.FDB', 'C:/FirebirdDB/PRUEBA.FDB', function (err) {
        res.json(err);
    });
});
app.listen(app.get("port"), () => {
    console.log(`Server on http://localhost:${app.get("port")}/`);
});
