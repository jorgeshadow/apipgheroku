const cors = require('cors')
import express, { Application, Request, Response } from "express";
const {Pool } =require('pg')
const app: Application = express();

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
    // funcion 1
   

// res.json({ message: "Hello world!" });
app.set("port", process.env.PORT || 3000);

app.get("/", (_req: Request, res: Response) => {
    res.json({"ASF":"ASF"})
});
app.post('/setv',(_req: Request, res: Response)=>{
   
});
    app.get('/datepg',async(_req: Request, res: Response)=>{
        const resp =await pool.query(
            `select * from ventas`
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