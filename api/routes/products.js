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
    res.status(200).json({
        message: 'POST Handling router products.'
    });
});

module.exports = router;