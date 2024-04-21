import { DBConfig } from 'ngx-indexed-db';

export const environment: {
  storageKey: string;
  dbConfig: DBConfig;
} = {
  storageKey: 'accessToken',
  dbConfig: {
    name: 'tcloud',
    version: 1,
    objectStoresMeta: [
      {
        store: 'drivers',
        storeConfig: { keyPath: 'id', autoIncrement: false },
        storeSchema: [
          { name: 'name', keypath: 'name', options: { unique: false } },
          { name: 'userName', keypath: 'userName', options: { unique: true } },
        ],
      },
      {
        store: 'vehicles',
        storeConfig: { keyPath: 'id', autoIncrement: false },
        storeSchema: [
          { name: 'name', keypath: 'name', options: { unique: false } },
        ],
      },
    ],
  },
};
