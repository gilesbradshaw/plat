'use strict';
module.exports = function(app) {
  // Module dependencies.
    var mongoose = require('mongoose');
    var Item = mongoose.models.Product,
    api = {};

  // ALL
  api.list = function (req, res) {
    Item.find(function(err, items) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(items);
      }
    });
  };

  api.listByCategory = function (req, res) {
    Item
      .find({'category': new mongoose.Types.ObjectId(req.param('id'))})
      .then(
        function(items){
          res.json(items);
        }
      ).catch(function(err){
        res.status(500).json(err);
      });
  };


  // GET
  api.get = function (req, res) {
    var id = req.params.id;
    Item.findOne({ '_id': id }, function(err, item) {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(item);
      }
    });
  };

  // POST
  api.add = function (req, res) {
    var item;
    if(typeof req.body === 'undefined'){
      return res.status(500).json({message: 'undefined'});
    }

    item = new Item(req.body);
    item.save(function (err) {
      if (!err) {
        return res.status(201).json(item.toObject());
      } else {
         return res.status(500).json(err);
      }
    });
  };

  // PUT
  api.edit = function (req, res) {
    var id = req.params.id;

    Item.findById(id, function (err, item) {
      if (err) {
        res.status(500).json(err);
      }
      if(typeof req.body.title !== 'undefined'){
        item.title = req.body.title;
      }

      if(typeof req.body.created !== 'undefined'){
        item.created = req.body.created;
      }

      return item.save(function (saveErr) {
        if (!saveErr) {
          return res.status(200).json(item.toObject());
        } else {
         return res.status(200).json(saveErr);
        }
        return res.json(item);
      });
    });

  };

  // DELETE
  api.delete = function (req, res) {
    var id = req.params.id;
    Item.findById(id, function (err, item) {
      if (err) {
        return res.status(500).json(err);
      }
      return item.remove(function (deleteErr) {
        if (!deleteErr) {
          return res.sendStatus(204);
        } else {
          return res.status(500).json(deleteErr);
        }
      });
    });

  };

  app.get('/api/category/:id/products', api.listByCategory);
  app.get('/api/products', api.list);
  app.get('/api/product/:id', api.get);
  app.post('/api/product', api.add);
  app.put('/api/product/:id', api.edit);
  app.delete('/api/product/:id', api.delete);
};
