export = {
  identity: 'user',
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    username: {
      type: 'string'
    },
    password: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    }
  }
};