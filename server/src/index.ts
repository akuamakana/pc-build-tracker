import { createConnection } from 'typeorm';
import express, { Application } from 'express';
import morgan from 'morgan';
require('dotenv').config();

const PORT = process.env.PORT;

export const app = async () => {
  const app: Application = express();
  await createConnection();

  app.use(morgan('combined'));

  app.get('/', async (_, res) => res.send('Hello from the server side'));

  return app;
};

/* istanbul ignore next */
app()
  .then((app) => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
