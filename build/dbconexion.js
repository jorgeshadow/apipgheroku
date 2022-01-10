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
exports.bd = void 0;
const dbconfig_1 = __importDefault(require("./dbconfig"));
const odbc = require('odbc');
class Bd {
    constructor() { }
    query(aSql, aParams = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(res => {
                const conectionconfig = {
                    connectionString: `DSN=ODBCtest;UID=${dbconfig_1.default.bd.user};PWD=${dbconfig_1.default.bd.password};DATABASE=${dbconfig_1.default.bd.host}/${dbconfig_1.default.bd.port}:${dbconfig_1.default.bd.database}`,
                    connectionTimeout: 10,
                    loginTimeout: 10
                };
                const connection = odbc.connect(conectionconfig, (error, connection) => {
                    if (error) {
                        console.log(error);
                        res(error);
                    }
                    connection.query(aSql, aParams, (error, result) => {
                        if (error) {
                            console.log(error);
                            res(error);
                        }
                        res(result);
                        connection.close((error) => {
                            if (error) {
                                return;
                            }
                        });
                    });
                });
            });
        });
    }
}
exports.bd = new Bd();
