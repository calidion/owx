import * as express from 'express';
import * as OAuthServer from 'express-oauth-server';
import { VService, VHandler, VModel } from 'vig';

let service = new VService();
let model = new VModel();
let app = express();

let oauth = new OAuthServer({
  model: {

  }, // See https://github.com/thomseddon/node-oauth2-server for specification
  grants: ['password'],
  debug: true
});

app.use(oauth.authorize());
app.use(function (req, res) {
  res.send('Secret area');
});
app.listen(3000, function () {
  console.log('server started');
});