import * as pay from 'node-weixin-pay';
import * as randomstring from 'randomstring';

export class WeiXinPay {
  config
  api = pay
  constructor(config) {
    this.config = config;
  }

  qrString(app, merchant, productId) {
    return pay.qrcode(app, merchant, productId);
  }

  preparePublicPay(data) {
    data.trade_type = 'JSSDK';
  }

  prepareQRScanPay(data) {
    data.trade_type = 'NATIVE';
  }

  preparePayType(data, type = 'JSSDK') {
    data.trade_type = type;
  }
  prepareClientInfo(data, req) {
    var ip = req.headers['x-forwarded-for'] ||
      (req.connection ? req.connection.remoteAddress : null) || req.ip;
    ip = ip.split(',')[0];
    data.spbill_create_ip = ip;
  }
  prepareOrderInfo(data, order) {
    data.body = encodeURIComponent(order.title);
    data.out_trade_no = String(order.no);
    data.total_fee = parseInt(((order.price - 0) * 100).toFixed(0));
  }

  prepareUserInfo(data, user) {
    data.openid = user.openid.openid;
  }

  qrPay(req, data, type, order, user = null) {
    this.prepareClientInfo(data, req);
    this.preparePayType(data, type);
    this.prepareOrderInfo(data, order);
    if (user) {
      this.prepareUserInfo(data, user);
    }
  }
  uniPay(config, data) {
    // let sign = pay.sign(config.merchant, data);
    // data.sign = sign;
    console.log(data);
    return new Promise(function (resovle, reject) {
      pay.api.order.unified(config, data, function (error, data) {
        if (error) {
          console.error(error, data);
          return reject(error);
        }
        resovle(data);
      });
    });
  }
}