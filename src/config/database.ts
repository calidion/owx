var mysqlConf = {
  adapter: 'mysql',
  host: process.env.VIG_MYSQL_DB_HOST || process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
  port: process.env.VIG_MYSQL_DB_PORT || process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
  user: process.env.VIG_MYSQL_DB_USER || process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'vig',
  password: process.env.VIG_MYSQL_DB_PASSWORD || process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'vig',
  database: process.env.VIG_MYSQL_DB_NAME || process.env.OPENSHIFT_APP_NAME || 'vig',
  prefix: process.env.VIG_MYSQL_DB_PREFIX || ''
};

var mongoConf = {
  adapter: 'mongo',
  url: process.env.VIG_MONGO_DB_URI || 'mongodb://127.0.0.1:27017/vig'
};
var mongoAdapter = require('sails-mongo');
var mysqlAdapter = require('sails-mysql');

var connections = {
  mysql: mysqlConf,
  mongo: mongoConf
};

var dbArray = ['mysql', 'mongo'];
var idx = 0;
if (process.env.VIG_DATABASE_CONNECTION > 0) {
  idx = process.env.VIG_DATABASE_CONNECTION % 2;
}
var db = connections[dbArray[idx]];
export = {
  default: 'waterline',
  env: process.env.VIG_DATABASE_ENV || 'dev',
  adapters: {
    waterline: {
      prod: {
        adapters: {
          mongo: mongoAdapter,
          mysql: mysqlAdapter
        },
        connections: {
          default: db
        },
        defaults: {
          migrate: process.env.VIG_DATABASE_MIGRATE || 'safe'
        }
      },
      dev: {
        adapters: {
          mongo: mongoAdapter,
          mysql: mysqlAdapter
        },
        connections: {
          default: db
        }
      },
      defaults: {
        migrate: process.env.VIG_DATABASE_MIGRATE || 'alter'
      }
    }
  }
};
