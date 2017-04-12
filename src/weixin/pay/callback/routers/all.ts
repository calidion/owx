export = async function (req, res) {
  console.log('callback');
  console.log(req.params);
  console.log(req.rawBody);
  console.log(req.query);
  console.log(String(req.body));
  // console.log(req.);
  let {pay, config} = req.stocks;
  let data = await pay.onNotify(config, req, res);
  console.log('callback, passed');
  console.log(data);
  // res.send('callback');
};
