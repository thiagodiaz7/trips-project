// Cadastro das Trips


const express = require ('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require("../controllers/orders");

// Lidando com GET para as orders das trips
router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_create_order);

router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

router.delete('/:orderId', OrdersController.orrders_delete_order);

module.exports = router;