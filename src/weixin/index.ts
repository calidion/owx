import * as express from 'express';
// import * as pay from 'node-weixin-pay';
import config = require('../config/weixin');
import * as qrcode from 'qrcode'

import { WeiXinPay } from './pay';

var pay = new WeiXinPay(config);

export = function (app, models) {
  let router = express.Router();
  router.use('/pay/qrcode/1', function (req, res) {
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
    var string = pay.qrString(config.app, config.merchant, req.query.id || 'id');
    console.log(string);
    qrcode.toDataURL(string, opts, function (err, url) {
      if (err) throw err;
      res.end("<!DOCTYPE html/><html><head><title>node-qrcode</title></head><body><img src='" + url + "'/></body></html>")
    });
  });

  router.use('/pay/qrcode/2', function (req, res) {
    console.log('callback');
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);

    var data = {
      body: 'sdofsofd',
      out_trade_no: '8283232323',
      total_fee: 1110,
      spbill_create_ip: '127.0.0.1',
      notify_url: 'https://helloworld.com',
      trade_type: 'JSSDK'
    };
    var order = {
      title: '红包充值',
      no: new Date().getTime(),
      price: 1
    };
  });

  router.use('/qrscan/callback', function (req, res) {
    console.log('callback');
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send('callback');
  });
  app.use('/weixin', router);
}
