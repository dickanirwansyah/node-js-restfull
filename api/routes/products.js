const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../../models/products');

/** get */
router.get('/', (req, res, next) => {
    
    Product.find()
        .exec()
        .then(productList => {
            if(productList.length >= 0){
                console.log("data product : "+productList);
                res.status(200).json(productList);
            }else{
                console.log("data not found");
                res.status(404).json({
                    message: 'sorry data product not found.'
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error,
                message: 'upps..server error.'
            });
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
        res.status(201).json({
            message: 'successfully created product',
            createdProduct: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'FAILED',
            error: err
        });
    });
});

/** get by id */
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(result => {
            console.log(result);

            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({
                    message: 'sorry id not found.'
                });
            }

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message: 'FAILED'
            });
        });
});

/**patch */
router.patch('/:productId', (req, res, next) => {
   const productId = req.params.productId;
   const updateOps = {};

    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

   Product.update({_id: productId}, {$set : updateOps})
   .exec()
   .then(result => {
       console.log("update data : "+result);
       res.status(200).json({
           message: 'success',
           data: result
       })
   })
   .catch(error => {
       console.log("ups..server error.")
       res.status(500).json({
           message: 'FAILED',
           error: error
       })
   })

});

/** delete */
router.delete('/:productId', (req, res, nexr) => {
    const productId = req.params.productId;
    Product.remove({_id : productId})
    .exec()
    .then(result => {
        console.log("data successfully delete : "+result);
        res.status(200).json({
            message: 'data has been delete.'
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'ups..server error.'
        })
    });
});

module.exports = router;