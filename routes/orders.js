const express = require('express'),
      router = express.Router(),
      OrderController = require('../controllers/order.controller');

// List all orders
router.get('/', OrderController.index);

// Store a new order
router.post('/', OrderController.store);

// Retrieve an order by ID
router.get('/:Id', OrderController.show); // Changed :id to :orderId

// Delete an order by ID
router.delete('/:Id', OrderController.destroy); // Changed :id to :orderId

module.exports = router;
