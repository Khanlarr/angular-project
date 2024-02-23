import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig  = {
    name: 'MyDb',
    version: 3,
    objectStoresMeta: [{
      store: 'users',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: false } },
        { name: 'surname', keypath: 'surname', options: { unique: false } },
        { name: 'number', keypath: 'number', options: { unique: false } },
      ]
    }],
  };