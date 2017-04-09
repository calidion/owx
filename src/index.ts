import * as express from 'express';
import * as OAuthServer from 'express-oauth-server';
import * as path from 'path';
import { VService, VHandler, VModel } from 'vig';

let modelPath = path.resolve(__dirname, './src/oauth/models');
let service = new VService();
let model = new VModel(modelPath);
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