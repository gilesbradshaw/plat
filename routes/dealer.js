'use strict';
module.exports = function(app) {
  // Module dependencies.
    var mongoose = require('mongoose');
    var Item = mongoose.models.Dealer,
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


  app.get('/api/dealers', api.list);
  app.get('/api/dealer/:id', api.get);
  app.post('/api/dealer', api.add);
  app.put('/api/dealer/:id', api.edit);
  app.delete('/api/dealer/:id', api.delete);
};
