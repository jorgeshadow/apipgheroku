import { Request,Response } from "express";
const {Pool } =require('pg')

const config={
    user:'cguycmbjlrmbza',
    host:'ec2-75-101-227-91.compute-1.amazonaws.com',
    password:'8b2247ed52084ba04e71435ba13ef6a4cba1cb1d0fc553878e304fd64a6c3d82',
    database:'d2kl56pbbbsnkv',
    ssl: {
        rejectUnauthorized: false
      },
    port:'5432'
}

const pool=new Pool(config)

var mv = require('mv');
class DocumentosController{
    // funcion 1
   async setdatespg(req:Request,res:Response):Promise<any>{
    try { 
        const resp =await pool.query(`
        UPDATE public.ventas
	    SET  ventas_tarjeta='${req.body.VENTAS_TARJETA}', ventas_efectivo='${req.body.VENTAS_EFECTIVO}', ingreso_tarjeta='${req.body.INGRESO_TARJETA}', fondo='${req.body.FONDO}', ingreso_efectivo='${req.body.INGRESO_EFECTIVO}', retiro_tarjeta='${req.body.RETIRO_TARJETA}', retiro_efectivo='${req.body.RETIRO_EFECTIVO}', total_venta='${req.body.TOTAL_VENTA}', total_efe='${req.body.TOTAL_EFE}', total_tarj='${req.body.TOTAL_TARJ}', total_ingreso='${req.body.TOTAL_INGRESO}', total_egr='${req.body.TOTAL_EGR}', gran_total='${req.body.GRAN_TOTAL}'
	    WHERE SUCURSAL='${req.body.SUCURSAL}';`); 
        res.json({
          resp
        })
  
    } catch (error) { 
        console.error(); 
    }  
    
   }
   //funcion 2
   async moverdocumentos(req:Request,res:Response):Promise<any>{
    mv('G:/My Drive/fdbs/PRUEBA.FDB', 'C:/FirebirdDB/PRUEBA.FDB', function(err:any) {
    res.json(err)
    });
   }
   async obtenerpg(req:Request,res:Response):Promise<any>{
    const resp =await pool.query(
        `select * from ventas`
    )
    res.json(resp)
}

   
}
// insert ventaas
// const resp =await pool.query(`
//         INSERT INTO public.ventas(sucursal, ventas_tarjeta, ventas_efectivo, ingreso_tarjeta, fondo, ingreso_efectivo, retiro_tarjeta, retiro_efectivo, total_venta, total_efe, total_tarj, total_ingreso, total_egr, gran_total)
//       VALUES ('${req.body.SUCURSAL}','${req.body.VENTAS_TARJETA}','${req.body.VENTAS_EFECTIVO}','${req.body.INGRESO_TARJETA}','${req.body.FONDO}','${req.body.INGRESO_EFECTIVO}','${req.body.RETIRO_TARJETA}','${req.body.RETIRO_EFECTIVO}','${req.body.TOTAL_VENTA}','${req.body.TOTAL_EFE}','${req.body.TOTAL_TARJ}','${req.body.TOTAL_INGRESO}','${req.body.TOTAL_EGR}','${req.body.GRAN_TOTAL}');`); 
export const documentosController=new DocumentosController();