const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

// All product
router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      console.log(docs);
      // if (docs.length >= 0){
      res.status(200).json(docs);
      // }else{
      //   res.status(404).json({
      //     message: 'No entries found'
      //   });
      // }

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    })
});

// Create product
router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product.save()
    .then(result => {
      console.log("From database", doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
  res.status(201).json({
    message: 'Handling POST /products',
    createProduct: product
  });
});

// Product by Id
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({message: 'No valid ID'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

// Update product
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json({
        product: doc,
        message: 'Update product',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });

});

// Remove product
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({_id: id})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

module.exports = router;