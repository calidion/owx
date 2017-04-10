import * as express from 'express';
import * as pay from 'node-weixin-pay';
import config = require('../config/weixin');
import * as qrcode from 'qrcode'

export = function (app, models) {
  let router = express.Router();
  router.use('/pay/qrcode', function (req, res) {
    console.log('callback');
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    var opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 0.3
      }
    };
    var string = pay.qrcode(config.app, config.merchant, req.query.id || 'id');
    console.log(string);
    qrcode.toDataURL(string, opts, function (err, url) {
      if (err) throw err;
      res.end("<!DOCTYPE html/><html><head><title>node-qrcode</title></head><body><img src='" + url + "'/></body></html>")
    });
  });
  
  router.use('/pay/callback', function (req, res) {
    console.log('callback');
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send('callback');
  });
  app.use('/weixin', router);
}
