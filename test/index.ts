import 'mocha';
import model = require('../src/oauth/model')
import * as assert from 'express';

let app = express();

describe('OWX', () => {
  it('should start', (done) => {
    model(app, function (error, models) {
      assert(!error);
      done();
    });

  });

});