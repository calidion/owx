import * as express from 'express';
import oauthModel = require('./oauth/model');
let app = express();
oauthModel(app, function (error, models) {
  app.use(function (req, res) {
    res.send('Secret area');
  });
  app.listen(3000, function () {
    console.log('server started');
  });
});
