'use strict';

module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose');

  var Product = mongoose.models.Product, api = {};

  // ALL
  //unorthodox - we are posting car/customer to get the list
  api.products = function (req, res) {
    Product
      .find()
      .then(
        function(products){
          res.json(products);
        }
      ).catch(function(err){
        res.status(500).json(err);
      });
  };

   //unorthodox - we are posting car/customer to get an item
  api.product = function (req, res) {
    Product.findById(req.body._id)
    .then(function(product){
      res.status(200).json(product);
    }).catch(function(err){
      res.status(404).json(err);
    });
  };

  // PUT unorthodoc this will add or update a product
  api.editProduct = function (req, res) {
    if(typeof req.body === 'undefined'){
      return res.status(500).json({message: 'product is undefined'});
    }
    Product.findById(req.body.id)
    .then(function(product){
      if(typeof req.body.title !== 'undefined'){
        product.title = req.body.title;
      }

      if(typeof req.body.created !== 'undefined'){
        product.created = req.body.created;
      }

      return product.save(function (err) {
        if (!err) {
          return res.status(200).json(product.toObject());
        } else {
         return res.status(200).json(err);
        }
      });
    }).catch(function(){
      var product = new Product(req.body);

      product.save(function (err) {
        if (!err) {
          console.log('created product');
          return res.status(201).json(product.toObject());
        } else {
           return res.status(500).json(err);
        }
      });
    });
  };


  // DELETE
  api.deleteProduct = function (req, res) {
    var id = req.params.id;
    Product.findById(id)
      .then(function (product) {
        return product.remove(function (err) {
          if (!err) {
            return res.sendStatus(204);
          } else {
            console.log(err);
            return res.status(500).json(err);
          }
        });
    });
  };


  app.post('/api/products', api.products);
  app.post('/api/product', api.product);
  app.put('/api/product', api.editProduct);
  app.delete('/api/product', api.deleteProduct);
};
