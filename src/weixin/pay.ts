import * as pay from 'node-weixin-pay';

export class WeiXinPay {
  config
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
    data.body = order.title;
    data.out_trade_no = String(order.no);
    data.total_fee = ((order.price - 0) * 100).toFixed(0);
  }

  prepareUserInfo(data, user) {
    data.openid = user.openid.openid;
  }

  qrPay(data, type, order, user, req) {
    this.preparePayType(data, type);
    this.prepareClientInfo(data, req);
    this.prepareOrderInfo(data, order);
    this.prepareUserInfo(data, user);
  }
}