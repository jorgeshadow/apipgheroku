import key from "./dbconfig";
const odbc=require('odbc');

class Bd{
    constructor(){}
        async query(aSql:any,aParams:any=[]):Promise<any>{
            return new Promise(res=>{
                const conectionconfig={
                    connectionString:`DSN=ODBCtest;UID=${key.bd.user};PWD=${key.bd.password};DATABASE=${key.bd.host}/${key.bd.port}:${key.bd.database}`,
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
        }
    
}
export const bd=new Bd();