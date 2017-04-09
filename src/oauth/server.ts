import * as express from 'express';
import * as OAuthServer from 'express-oauth-server';

export = function(app, model) {
  let oauth = new OAuthServer({
    model: model, // See https://github.com/thomseddon/node-oauth2-server for specification
    grants: ['password'],
    debug: true
  });
  app.use(oauth.authorize());
};
