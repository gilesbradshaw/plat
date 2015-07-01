module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Sbv = mongoose.models.Sbv,
      api = {};

  // ALL
  api.sbvs = function (req, res) {
    Sbv.find(function(err, sbvs) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(sbvs);
      }
    });
  };

  // GET
  api.sbv = function (req, res) {
    var id = req.params.id;
    Sbv.findOne({ '_id': id }, function(err, sbv) {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(sbv);
      }
    });
  };

  // POST
  api.addSbv = function (req, res) {
    var sbv;
    if(typeof req.body === 'undefined'){
      return res.status(500).json({message: 'sbv is undefined'});
    }

    sbv = new Sbv(req.body);

    sbv.save(function (err) {
      if (!err) {
        console.log('created sbv');
        return res.status(201).json(sbv.toObject());
      } else {
         return res.status(500).json(err);
      }
    });

  };

  // PUT
  api.editSbv = function (req, res) {
    var id = req.params.id;

    Sbv.findById(id, function (err, sbv) {
      if(typeof req.body["title"] !== 'undefined'){
        sbv['title'] = req.body.sbv['title'];
      }

      if(typeof req.body['created'] !== 'undefined'){
        sbv['created'] = req.body.sbv['created'];
      }  
    

      return sbv.save(function (err) {
        if (!err) {
          console.log("updated post");
          return res.status(200).json(sbv.toObject());
        } else {
         return res.status(200).json(err);
        }
        return res.json(sbv);
      });
    });

  };

  // DELETE
  api.deleteSbv = function (req, res) {
    var id = req.params.id;
    Sbv.findById(id, function (err, sbv) {
      return sbv.remove(function (err) {
        if (!err) {
          console.log('removed sbv');
          return res.sendStatus(204);
        } else {
          console.log(err);
          return res.status(500).json(err);
        }
      });
    });

  };


  app.get('/api/sbvs', api.sbvs);
  app.get('/api/sbv/:id', api.sbv);
  app.post('/api/sbv', api.addSbv);
  app.put('/api/sbv/:id', api.editSbv);
  app.delete('/api/sbv/:id', api.deleteSbv);
};
