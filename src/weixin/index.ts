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

  router.use('/pay/qrcode/2', async function (req, res) {
    var order = {
      title: '红包充值',
      no: new Date().getTime(),
      price: 1
    };
    var data = {};
    pay.qrPay(req, data, 'NATIVE', order);
    data['notify_url'] = 'http://pay.t1bao.com/weixin/pay/callback';
    // data['spbill_create_ip'] = '115.183.164.187';
    let uniData = await pay.uniPay(config, data);
    var qrString = 'weixin://wxpay/bizpayurl?sr=' + uniData['code_url'];
    res.end('ok');
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
