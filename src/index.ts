import express,{Application} from 'express';
const cors = require('cors')
import documentosRoute from "./routes/documentosRoute";
class Server{
    public app:Application

    constructor(){
        this.app=express();
        this.onConfig();
        this.onRoutes()
    }
    onConfig():void{
        this.app.set('port',process.env.PORT || 5000)
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({extended:false}))
    }
    onRoutes():void{
        this.app.use('/',documentosRoute)
    }
    onStart(): void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('corriendo en el puerto 3000',this.app.get('port'));
        });
}
}
const server =new Server();
server.onStart();