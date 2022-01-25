const cors = require('cors')
import express, { Application, Request, Response } from "express";
const {Pool } =require('pg')
const app: Application = express();
const odbc=require('odbc');
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
const bd={
    host:'localhost',
    port:3050,
    database:'C:\\MO\\WeUp_GV.fdb',
    user:'SYSDBA',
    password:'masterkey'
}

const pool=new Pool(config)

var mv = require('mv');
    // funcion 1
   
    app.use(cors());
// res.json({ message: "Hello world!" });
app.set("port", process.env.PORT || 3000);

app.get("/", (_req: Request, res: Response) => {
    res.json({"ASF":"ASF"})
});
app.post('/setv',(aSql:any,aParams:any=[])=>{
    return new Promise(res=>{
        const conectionconfig={
            connectionString:`DSN=ODBCtest;UID=${bd.user};PWD=${bd.password};DATABASE=${bd.host}/${bd.port}:${bd.database}`,
            connectionTimeout:10,
            loginTimeout:10

        }
        const  connection=odbc.connect(conectionconfig,(error:any,connection:any)=>{
            if (error) {
                console.log(error);res(error)
            }
            connection.query(aSql,aParams,(error:any,result:any)=>{
                if (error) {
                    console.log(error);res(error)
                } 
                res(result)

                connection.close((error:any)=>{
                    if (error) {
                        return;
                    }
                })
            })
        })
    });
});
    app.get('/datepg',async(_req: Request, res: Response)=>{
        const resp =await pool.query(
            `select * from ventas where dia_consa='${_req.params.date}'`
        )
        res.json(resp)
    });
    app.get('/movedb',(_req: Request, res: Response)=>{
        mv('G:/My Drive/fdbs/PRUEBA.FDB', 'C:/FirebirdDB/PRUEBA.FDB', function(err:any) {
            res.json(err)
            });
    });  

app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}/`);
});