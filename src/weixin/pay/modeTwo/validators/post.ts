export = {
  required: ['body'],
  body: {
    title: {
      type: 'string',
      required: true
    },
    no: {
      type: 'string',
      required: true
    },
    price: {
      type: 'number',
      required: true
    }
  }
};
