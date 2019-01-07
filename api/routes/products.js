const express = require('express');
const router = express.Router();

/** get */
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET Handling router products.'
    });
});

/** post */
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
    };
    res.status(201).json({
        message: 'POST Handling router products.',
        createdProduct: product
    });
});

/** get by id */
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    if(id === 'special'){
        res.status(200).json({
            message: 'id is special.',
            id: id
        })
    }else if(id === 'notspecial'){
        res.status(200).json({
            message: 'id is not special',
            id: id
        })
    }else{
        res.status(200).json({
            message: 'id is not special or notspecial'
        })
    }
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