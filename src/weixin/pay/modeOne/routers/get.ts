export = async function (req, res) {
  console.log('callback');
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  var opts = {
    errorCorrectionLevel: 'M',
    type: 'image/jpeg',
    rendererOpts: {
      quality: 0.3
    }
  };
  let { pay, config, qrcode } = req.stocks;

  var string = pay.qrString(config.app, config.merchant, req.query.id || 'id');
  console.log(string);
  qrcode.toDataURL(string, opts, function (err, url) {
    if (err) throw err;
    res.end("<!DOCTYPE html/><html><head><title>node-qrcode</title></head><body><img src='" + url + "'/></body></html>")
  });
}