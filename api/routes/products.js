const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../../models/products');

/** get */
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET Handling router products.'
    });
});

/** post */
router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'POST Handling router products.',
        createdProduct: product
    });
});

/** get by id */
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => console.log(err));
});

/**patch */
router.patch('/:productId', (req, res, next) => {
   res.status(200).json({
        message: 'Updated Products.'
    });
});

/** delete */
router.delete('/:productId', (req, res, nexr) => {
    res.status(200).json({
        message: 'Delete Products.'
    });
});

module.exports = router;