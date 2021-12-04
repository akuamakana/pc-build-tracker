require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: true,
  entities: ['build/src/entities/**/*.js', './src/entities/**/*.js'],
  migrations: ['build/src/migration/**/*.js'],
  subscribers: ['build/src/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'entity',
    migrationsDir: 'migration',
    subscribersDir: 'subscriber',
  },
};
