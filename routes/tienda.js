const {Router} = require('express');
const { listadoTienda, busqueda } = require('../controllers/tienda');
const router = Router();

router.get('/completa',listadoTienda);
router.get('/busqueda/:elemento', busqueda)

module.exports = router;