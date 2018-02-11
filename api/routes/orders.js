const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET /order'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Handling POST /order'
  });
});

router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: 'Order details',
    id: id
  });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
      message: 'Delete order',
    });
});

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
      message: 'Patch order',
    });
});

module.exports = router;