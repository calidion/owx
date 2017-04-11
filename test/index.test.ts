import 'mocha';
import * as express from 'express';
import * as request from 'supertest';
import model = require('../src/oauth/model');
import weixin = require('../src/weixin/');
import * as assert from 'assert';

let gModels;
let gApp = express();


describe('OWX', () => {
  it('should start', (done) => {
    let app = express.Router();
    model(app, function (error, models) {
      assert(!error);
      assert(models.User);
      assert(models.Client);
      assert(models.Token);
      gModels = models;
      done();
    });
  });

  it('should request', (done) => {
    weixin(gApp, gModels);
    request(gApp)
      .get('/weixin/qrscan/callback')
      .expect(200)
      .end(function (err, res) {
        console.log(err, res.text);
        assert(!err);
        assert(res.text === 'callback');
        done();
      });
  });

  it('should request', (done) => {
    request(gApp)
      .get('/weixin/pay/qrcode/2')
      .expect(200)
      .end(function (err, res) {
        console.log(err, res.text);
        
        done();
      });
  });

});