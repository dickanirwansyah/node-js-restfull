const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../../models/products');

/** get */
router.get('/', (req, res, next) => {
    
    Product.find()
        .select('name price _id')
        .exec()
        .then(productList => {

            const response = {
                count: productList.length,
                products: productList.map(prod => {
                    return {
                        name: prod.name,
                        price: prod.price,
                        _id: prod._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/'+prod._id
                        }
                    }
                })
            }
           res.status(200).json(response)
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
            message: 'Created Product Successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/'+result._id
                }
            }
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
        .select('_id name price')
        .exec()
        .then(result => {
            console.log(result);

            if(result){
                res.status(200).json({
                    product: result,
                    description: 'GET',
                    url: 'http://localhost:3000/products/'
                });
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
        /**untuk request di postman --> 
         * {
         *   "propName" : "name", "value" : "blabla",
         *   "propName" : "price", "value" : xxxx
         * }
         */
    }

   Product.update({_id: productId}, {$set : updateOps})
   .exec()
   .then(result => {
       console.log("update data : "+result);
       res.status(200).json({
           message: 'Product updated',
           request : {
               type: 'GET',
               url: 'http://localhost:3000/products/' + productId
           }
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
router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    Product.remove({_id : productId})
    .exec()
    .then(result => {
        console.log("data successfully delete : "+result);
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products',
                body: {name: 'String', price: 'Number'}
            }
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