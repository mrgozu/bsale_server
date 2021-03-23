const {response} = require ('express');
const db = require('../db/connection');

const encabezados = 'p.id, p.name, p.url_image, p.price, p.discount, (p.price*(100-p.discount)/100) discountPrice, c.name tipo, c.id categoriaId';
const inner = 'INNER JOIN bsale_test.category c ON  p.category= c.id';
const sql =`SELECT ${encabezados} FROM bsale_test.product p ${inner} ` 

const listadoTienda= (req, res = response)=> {
  let listaOrdenada = `${sql} order by c.id`
  db.query(listaOrdenada, (err, rows, fields) => {
    //  con.end();
    if (err) throw err;

    res.json(rows);

});


  }
const busqueda = (req, res = response)=> {
    let elemento = req.params.elemento
    let buscar = `${sql} WHERE p.name like '%${elemento}%' order by c.id`;
    db.query(buscar, (err, rows, fields) => {
      //  con.end();
      if (err) throw err;
  
      res.json(rows);
    })
  }
  const obtenerCategoria= (req, res = response)=> {
     //(1.Energetica, 2.pisco, 3.ron, 4.bebida, 5.snak, 6.cerveza, 7.vodka)
     let id = req.params.id
    let categoria = `${sql} WHERE c.id=${id} order by c.id`; 
    db.query(categoria, (err, rows, fields) => {
      //  con.end();
      if (err) throw err;
  
      res.json(rows);
  
  });
}
  

  const noEncontrada = ( req, res = response) =>{
    res.sendFile(process.cwd()+'/public/404.html' )
    // res.json('Ruta no encontrada')
  }

module.exports = {
    listadoTienda,
    busqueda,
    noEncontrada,
    obtenerCategoria
}