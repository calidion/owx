import * as express from 'express';
import * as OAuthServer from 'express-oauth-server';

export = function(app, model) {
  let oauth = new OAuthServer({
    // See https://github.com/thomseddon/node-oauth2-server for specification
    model: model, 
    grants: ['password'],
    debug: true
  });
  app.use(oauth.authorize());
};
