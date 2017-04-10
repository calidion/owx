import * as express from 'express';

export = function(app, models) {
  let router = express.Router();

  router.use('/callback', function(req, res) {
    console.log('callback');
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send('callback');
  });
  app.use('/weixin', router);
}