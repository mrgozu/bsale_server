const {Router} = require('express');
const { listadoTienda, busqueda, noEncontrada } = require('../controllers/tienda');
const router = Router();

router.get('/completa',             listadoTienda);
router.get('/busqueda/:elemento',   busqueda);
router.get('*',noEncontrada);
module.exports = router;