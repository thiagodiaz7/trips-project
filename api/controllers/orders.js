const mongoose = require("mongoose");

const Order = require('../models/order');
const Trip = require('../models/trip');

exports.orders_get_all = (req, res, next) => {
    Order.find()
    .select('trip quantity _id')
    .populate('trip', 'name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    trip: doc.trip,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8000/orders/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.orders_create_order = (req, res, next) => {
    Trip.findById(req.body.tripId)
        .then(trip => {
                if (!trip) {
                    return res.status(404).json({
                        message: "Trip not found bro"
                    });
                }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                trip: req.body.tripId
            });
            return order.save()
            
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    trip: result.trip,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/orders' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
    .populate('trip')
    .exec()
    .then(order => {
        if (!order) {
            return res.status(404).json({
                message:"order not found bro"
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:30/orders'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
 }

exports.orrders_delete_order = (req, res, next) => {
    Order.remove({
        _id: req.params.orderId
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:30/orders',
                body: { tripId: 'ID', quantity: 'Number'}
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}