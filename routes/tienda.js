const {Router} = require('express');
const { listadoTienda, busqueda, noEncontrada, obtenerCategoria } = require('../controllers/tienda');
const router = Router();

router.get('/completa',             listadoTienda);
router.get('/busqueda/:elemento',   busqueda);
router.get('/categoria/:id',   obtenerCategoria);
router.get('*',noEncontrada);
module.exports = router;