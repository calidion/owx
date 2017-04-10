export = {
  identity: 'order',
  attributes: {
    externId: {
      columnName: 'extern_id',
      type: 'string',
      required: true
    },
    client: {
      model: 'client',
      required: true
    },
    price: {
      type: 'int',
      defaultsTo: 0
    },
    paied: {
      type: 'boolean',
      defaultsTo: false
    },
    createdAt: {
      columnName: 'created_at'
      type: 'datetime'
    },
    updatedAt: {
      columnName: 'updated_at'
      type: 'datetime'
    }
  }
};