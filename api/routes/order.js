const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../../models/order');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'get orders'
    });
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order.save()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error,
            message: 'failed'
        });
    });
});

router.get('/:orderId', (req, res, next) => {

    res.status(200).json({
        message: 'Order Details.',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    Order.remove({_id: orderId})
        .exec()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'Data Orders successfully deleted',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/orders',
                        body: {productId: 'String', quantity: 'Number'}
                    }
                })
            }).catch(error => {
                console.log(error);
                res.status(500).json({
                    message: 'delete failed',
                    error: error
                });
            });
});

module.exports = router;