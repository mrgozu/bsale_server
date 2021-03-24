const express = require('express');
const cors = require('cors');
const db = require('../db/connection');


class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT ||8000;
        
        this.middlewares();
        this.routes();
        this.dbConnection();
    }

    //Metodos
    middlewares(){
        this.app.use(cors()); 
        this.app.use(express.static('public')); //Aplicacion
    }
    //Rutas
    routes(){
       this.app.use('/', require ('../routes/tienda'));          
    }
    //Base de datos
    //  dbConnection(){
       
            
    //         db.connect((err)=>{
    //             if(err) throw err;
    //             console.log('bdd conectada');          
    //         });

       
    // }    


    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor funcionando en el puerto "${this.port}"`);
        });
    }
}

module.exports = Server;