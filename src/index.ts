import * as express from 'express';
import oauthModel = require('./oauth/model');
import weixin = require('./weixin/');
import site = require('./config/site');
let app = express();
let router = express.Router();

oauthModel(router, function (error, models) {
  weixin(app, models);
  app.use('/oauth', router);
  app.listen(site.port, function () {
    console.log('weixin server started');
  });
});
