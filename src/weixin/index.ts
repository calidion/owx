import * as express from 'express';
import config = require('../config/weixin');
import * as qrcode from 'qrcode'
import * as path from 'path';
import { WeiXinPay } from './pay';
import { VHandler, VService } from 'vig';

var pay = new WeiXinPay(config);

export = function (app, models) {
  let router = express.Router();
  router.use(function(req, res, next) {
    req.stocks = {
      pay: pay,
      qrcode: qrcode,
      config: config
    };
    next();
  });

  let modeTwoPath = path.resolve(__dirname, './pay/modeTwo/');
  let modeTwo = new VHandler(['/pay/qrcode/2'], modeTwoPath);
  modeTwo.attach(router);

  let modeOnePath = path.resolve(__dirname, './pay/modeOne/');
  let modeOne = new VHandler(['/pay/qrcode/1'], modeOnePath);
  modeOne.attach(router);
  
  let callbackPath = path.resolve(__dirname, './pay/callback/');
  let callback = new VHandler(['/pay/qrcode/callback'], callbackPath);
  callback.attach(router);
  app.use('/weixin', router);
}
