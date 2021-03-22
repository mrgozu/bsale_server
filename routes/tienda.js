const {Router} = require('express');
const { listadoTienda, busqueda, noEncontrada, obtenerCategoria } = require('../controllers/tienda');
const router = Router();

router.get('/completa',             listadoTienda);
router.get('/busqueda/:elemento',   busqueda);
router.get('/busqueda/:categoria',   obtenerCategoria);
router.get('*',noEncontrada);
module.exports = router;