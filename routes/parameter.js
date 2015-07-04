'use strict';

module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose');

  var Parameter = mongoose.models.Parameter,
  Product = mongoose.models.Product,
  api = {};

  api.parameters = function (req, res) {
    Parameter
      .find({'product': new mongoose.Types.ObjectId(req.param('product'))})
      .then(
        function(parameters){
          res.json(parameters);
        }
      ).catch(function(err){
        res.status(500).json(err);
      });
  };

// POST
  api.addParameter = function (req, res) {
    var parameter;
    if(typeof req.body === 'undefined'){
      return res.status(500).json({message: 'parameter is undefined'});
    }
    Product.findById(req.param('product')).then(
      function(product){
        parameter = new Parameter(req.body);
        console.log(req.param('product'));
        parameter.product = product;

        parameter.save(function (err) {
          if (!err) {
            res.status(201).json(parameter.toObject());
          } else {
             res.status(500).json(err);
          }
        });
        }
      )
    .catch(function(err){
        res.status(500).json(err);
    });
  };


  app.get('/api/parameters/:product', api.parameters);
  app.post('/api/parameters/:product', api.addParameter);
};
