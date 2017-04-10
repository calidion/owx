export = function (models) {
  var Token = models.Token;
  var Client = models.Client;
  var User = models.User;

  return {
    getAccessToken: function (bearerToken) {
      return Token.findOne({ accessToken: bearerToken });
    },
    getClient: function (clientId, clientSecret) {
      return Client.findOne({ id: clientId, secret: clientSecret });
    },
    generateAccessToken: function() {

    },
    saveAuthorizationCode: function() {
      
    }
    getUser: function (username, password) {
      return User.findOne({ username: username, password: password });
    },
    saveToken: function (token, client, user) {
      var accessToken = new Token({
        accessToken: token.accessToken,
        accessTokenExpiresOn: token.accessTokenExpiresOn,
        client: client.id,
        refreshToken: token.refreshToken,
        refreshTokenExpiresOn: token.refreshTokenExpiresOn,
        user: user.id
      });
      return accessToken.save();
    },
    validateScope: function (accessToken, scope) {
      console.log(arguments);
      return;
    },
    getRefreshToken: function (refreshToken) {
      return Token.findOne({ refreshToken: refreshToken });
    }
  };
}