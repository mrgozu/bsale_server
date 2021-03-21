const {response} = require ('express');
const db = require('../db/connection');

const encabezados = 'p.id, p.name, p.url_image, p.price, p.discount, (p.price*(100-p.discount)/100) discountPrice, c.name tipo';
const inner = 'INNER JOIN bsale_test.category c ON  p.category= c.id';
const sql =`SELECT ${encabezados} FROM bsale_test.product p ${inner}` 

const listadoTienda= (req, res = response)=> {
  
  db.query(sql, (err, rows, fields) => {
    //  con.end();
    if (err) throw err;

    res.json(rows);

});


  }
const busqueda = (req, res = response)=> {
    let elemento = req.params.elemento
    console.log(elemento);
    let buscar = `${sql} WHERE p.name like '%${elemento}%'`;
    db.query(buscar, (err, rows, fields) => {
      //  con.end();
      if (err) throw err;
  
      res.json(rows);
    })
  }

module.exports = {
    listadoTienda,
    busqueda
}