require('dotenv').config();

const logging = process.env.NODE_ENV === 'development';
const tsEntities = process.env.NODE_ENV === 'test' ? 'src/entities/**/*.ts' : '';

module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: logging,
  entities: ['build/src/entities/**/*.js', './src/entities/**/*.js', tsEntities],
  migrations: ['build/src/migration/**/*.js'],
  subscribers: ['build/src/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'entity',
    migrationsDir: 'migration',
    subscribersDir: 'subscriber',
  },
};
