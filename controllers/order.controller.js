const Order = require('../models/order');
const Product = require('../models/product');

// List all orders
function index(req, res) {
    Order.find({})
        .populate('product.productId') // Populate each product inside the products array
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    status: "success",
                    method: "GET",
                    url: "http://localhost:8000/orders",
                    numberOfOrders: result.length,
                    orders: result.map((orderObj) => {
                        return {
                            _id: orderObj._id,
                            products: orderObj.product.map(p => ({
                                productId: p.productId, // The ID of the product
                                quantity: p.quantity // The quantity of that product in the order
                            }))
                        };
                    })
                });
            } else {
                res.status(404).json({
                    message: "No Orders Yet!"
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || "An error occurred while fetching orders."
            });
        });
}

// Store a new order
function store(req, res) {
    Product.findById(req.body.product.productId)
        .then(product => {
            if (product) {
                const order = new Order({
                    product: req.body.product.productId,
                    quantity: req.body.product.quantity
                });
                order.save().then(result => {
                    res.status(201).json({
                        success: "Order Stored Successfully",
                        statusCode: 201,
                        order: {
                            product: result.product,
                            quantity: result.quantity
                        }
                    });
                });
            } else {
                res.status(404).json({
                    message: "Order Not Added! Product not found."
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: error.message || "An error occurred while saving the order."
            });
        });
}

// Retrieve an order by ID
function show(req, res) {
    Order.findById(req.params.id)
        .populate('product.productId')
        .then(order => {
            if (order) {
                res.status(200).json({
                    status: "success",
                    order: {
                        _id: order._id,
                        products: order.product.map(p => ({
                            productId: p.productId,
                            quantity: p.quantity
                        }))
                    }
                });
            } else {
                res.status(404).json({
                    message: "Order not found."
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: error.message || "An error occurred while retrieving the order."
            });
        });
}

// Delete an order by ID
function destroy(req, res) {
    Order.findByIdAndRemove(req.params.id)
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "Order deleted successfully."
                });
            } else {
                res.status(404).json({
                    message: "Order not found."
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: error.message || "An error occurred while deleting the order."
            });
        });
}

module.exports = {
    index,
    store,
    show,
    destroy
};
