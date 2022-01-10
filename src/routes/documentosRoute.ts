import {Router}from 'express';

import { documentosController } from "../controllers/documentoscontroller";


class DocumentosRoute{
    public router:Router=Router();

    constructor(){
         this.onConfig();

    }
    onConfig():void{ 
         this.router.get('/obtenerDocumentosd/:dateant/:datedes',documentosController.obtenerDocumentos);
         this.router.post('/setv/',documentosController.setdatespg);
         this.router.get('/datepg',documentosController.obtenerpg);
         this.router.get('/movedb',documentosController.moverdocumentos);
    }
}
const documentosRoute = new DocumentosRoute();
export default documentosRoute.router