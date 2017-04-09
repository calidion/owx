import * as express from 'express';
import * as path from 'path';
import { VModel } from 'vig';
import database = require('../config/database');
import modelApi = require('./api');
import server = require('./server');

let modelPath = path.resolve(__dirname, '../component');
let model = new VModel(modelPath);
let config = database.adapters[database.default][database.env];

export = function (app, next) {
  model.init(config, {
    connection: 'default'
  }, function (error, models) {
    if (error) {
      return next(true, new Error(error + models));
    }
    server(app, modelApi(models));
    next(false, models);
  });
}
