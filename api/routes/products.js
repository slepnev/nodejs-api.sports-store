const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET /products'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Handling POST /products'
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special'){
    res.status(200).json({
      message: 'Special ID',
      id: id
    });
  }else {
    res.status(200).json({
      message: 'Passed ID'
    });
  }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
      message: 'Update product',
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
      message: 'Delete product',
    });
});

module.exports = router;