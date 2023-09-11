import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '181354',
        database: 'postgres',
        entities: [__dirname + '/../../modules/**/*.entity.{js,ts}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
