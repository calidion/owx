import * as qrcode from 'qrcode'
export = async function (req, res) {
  var order = req.body;
  var data = {};
  var stocks = req.stocks;
  stocks.pay.qrPay(req, data, 'NATIVE', order);
  data['notify_url'] = process.env.WEIXIN_PAY_CALLBACK_URL || 'http://pay.t1bao.com/weixin/pay/callback';
  data['notify_url'] = 'https://weixinpay.localtunnel.me/weixin/pay/qrcode/callback';
  if (process.env.LOCAL_IP) {
    data['spbill_create_ip'] = process.env.LOCAL_IP;
  }
  let uniData = await stocks.pay.uniPay(stocks.config, data);
  var qrString = uniData['code_url'];
  console.log(qrString);
  var opts = {
    errorCorrectionLevel: 'M',
    type: 'image/jpeg',
    rendererOpts: {
      quality: 0.3
    }
  };
  qrcode.toDataURL(qrString, opts, function (err, url) {
    if (err) throw err;
    res.end("<!DOCTYPE html/><html><head><title>node-qrcode</title></head><body><img src='" + url + "'/></body></html>")
  });
};
