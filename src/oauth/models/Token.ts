export = {
  identity: 'token',
  attributes: {
    userId: {
      columnName: 'user',
      model: 'user',
      required: true
    },
    clientId: {
      columnName: 'client',
      model: 'client',
      required: true
    },
    accessToken: {
      columnName: 'access_token',
      type: 'string',
    },
    accessTokenExpiresOn: {
      columnName: 'access_token_expires_on',
      type: 'datetime'
    },
    refreshToken: {
      columnName: 'access_token',
      type: 'string',
    },
    refreshTokenExpiresOn: {
      columnName: 'access_token_expires_on',
      type: 'datetime'
    }
  }
};