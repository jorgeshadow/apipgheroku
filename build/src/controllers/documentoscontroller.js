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
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentosController = void 0;
const dbconexion_1 = require("../../dbconexion");
const { Pool } = require('pg');
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
class DocumentosController {
    // funcion 1
    obtenerDocumentos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametros = req.params;
            const result = yield dbconexion_1.bd.query(`select s.sucursal,
coalesce((select sum(v.total) from ventas_gral v where v.sucursal = s.sucursal and v.tipo = 'TARJETA' and v.estatus = 'A' and v.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) as VENTAS_TARJETA,
coalesce((select sum(v.total) from ventas_gral v where v.sucursal = s.sucursal and v.tipo = 'EFECTIVO' and v.estatus = 'A' and v.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) as VENTAS_EFECTIVO,
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo in ('ABONO','PAGOS') and m.metodo = 'TARJETA' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) as INGRESO_TARJETA,
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo in ('FONDO') and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) as FONDO,
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo in ('ABONO','PAGOS') and m.metodo = 'EFECTIVO' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) as INGRESO_EFECTIVO,
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo = ('RETIRO') and m.metodo = 'TARJETA' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) as RETIRO_TARJETA,
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo = ('RETIRO') and m.metodo = 'EFECTIVO' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) as RETIRO_EFECTIVO,

coalesce((select sum(v.total) from ventas_gral v where v.sucursal = s.sucursal and v.tipo = 'TARJETA' and v.estatus = 'A' and v.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) +
coalesce((select sum(v.total) from ventas_gral v where v.sucursal = s.sucursal and v.tipo = 'EFECTIVO' and v.estatus = 'A' and v.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) as TOTAL_VENTA,

coalesce((select sum(v.total) from ventas_gral v where v.sucursal = s.sucursal and v.tipo = 'EFECTIVO' and v.estatus = 'A' and v.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) +
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo in ('ABONO','PAGOS') and m.metodo = 'EFECTIVO' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0)+
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo in ('FONDO') and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) as TOTAL_EFE,

coalesce((select sum(v.total) from ventas_gral v where v.sucursal =  s.sucursal and v.tipo = 'TARJETA' and v.estatus = 'A' and v.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) +
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo in ('ABONO','PAGOS') and m.metodo = 'TARJETA' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) AS TOTAL_TARJ,

coalesce((select sum(v.total) from ventas_gral v where v.sucursal = s.sucursal and v.tipo = 'TARJETA' and v.estatus = 'A' and v.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) +
coalesce((select sum(v.total) from ventas_gral v where v.sucursal = s.sucursal and v.tipo = 'EFECTIVO' and v.estatus = 'A' and v.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) +
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo in ('ABONO','PAGOS') and m.metodo = 'TARJETA' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) +
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo in ('ABONO','PAGOS') and m.metodo = 'EFECTIVO' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) as TOTAL_INGRESO,

coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo = ('RETIRO') and m.metodo = 'TARJETA' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) +
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo = ('RETIRO') and m.metodo = 'EFECTIVO' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) as TOTAL_EGR,

(coalesce((select sum(v.total) from ventas_gral v where v.sucursal = s.sucursal and v.tipo = 'TARJETA' and v.estatus = 'A' and v.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) +
coalesce((select sum(v.total) from ventas_gral v where v.sucursal = s.sucursal and v.tipo = 'EFECTIVO' and v.estatus = 'A' and v.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) +
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo in ('ABONO','PAGOS') and m.metodo = 'TARJETA' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) +
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo in ('ABONO','PAGOS') and m.metodo = 'EFECTIVO' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0)) +

coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo in ('FONDO') and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) -

(coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo = ('RETIRO') and m.metodo = 'TARJETA' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0) +
coalesce((select sum(m.qty) from movimientos_gral m where m.sucursal = s.sucursal and m.tipo = ('RETIRO') and m.metodo = 'EFECTIVO' and m.estatus = 'A' and m.fecha_hora between '${parametros.dateant}' and '${parametros.datedes}' ),0)) as GRAN_TOTAL


from sucursales s                                               `);
            res.json(result);
        });
    }
    setdatespg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield pool.query(`
        UPDATE public.ventas
	    SET  ventas_tarjeta='${req.body.VENTAS_TARJETA}', ventas_efectivo='${req.body.VENTAS_EFECTIVO}', ingreso_tarjeta='${req.body.INGRESO_TARJETA}', fondo='${req.body.FONDO}', ingreso_efectivo='${req.body.INGRESO_EFECTIVO}', retiro_tarjeta='${req.body.RETIRO_TARJETA}', retiro_efectivo='${req.body.RETIRO_EFECTIVO}', total_venta='${req.body.TOTAL_VENTA}', total_efe='${req.body.TOTAL_EFE}', total_tarj='${req.body.TOTAL_TARJ}', total_ingreso='${req.body.TOTAL_INGRESO}', total_egr='${req.body.TOTAL_EGR}', gran_total='${req.body.GRAN_TOTAL}'
	    WHERE SUCURSAL='${req.body.SUCURSAL}';`);
                res.json({
                    resp
                });
            }
            catch (error) {
                console.error();
            }
        });
    }
    //funcion 2
    moverdocumentos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            mv('G:/My Drive/fdbs/PRUEBA.FDB', 'C:/FirebirdDB/PRUEBA.FDB', function (err) {
                res.json(err);
            });
        });
    }
    obtenerpg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield pool.query(`select * from ventas`);
            res.json(resp);
        });
    }
}
// insert ventaas
// const resp =await pool.query(`
//         INSERT INTO public.ventas(sucursal, ventas_tarjeta, ventas_efectivo, ingreso_tarjeta, fondo, ingreso_efectivo, retiro_tarjeta, retiro_efectivo, total_venta, total_efe, total_tarj, total_ingreso, total_egr, gran_total)
//       VALUES ('${req.body.SUCURSAL}','${req.body.VENTAS_TARJETA}','${req.body.VENTAS_EFECTIVO}','${req.body.INGRESO_TARJETA}','${req.body.FONDO}','${req.body.INGRESO_EFECTIVO}','${req.body.RETIRO_TARJETA}','${req.body.RETIRO_EFECTIVO}','${req.body.TOTAL_VENTA}','${req.body.TOTAL_EFE}','${req.body.TOTAL_TARJ}','${req.body.TOTAL_INGRESO}','${req.body.TOTAL_EGR}','${req.body.GRAN_TOTAL}');`); 
exports.documentosController = new DocumentosController();
