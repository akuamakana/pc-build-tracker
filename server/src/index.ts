import express, { Application } from 'express';
import morgan from 'morgan';

const PORT = process.env.PORT || 5000;

export const app = async (port: number) => {
  const app: Application = express();
  app.use(morgan('dev'));

  app.get('/', async (_, res) => {
    res.send({
      message: 'Hello from the server side',
    });
  });

  return app.listen(port, () => {
    console.log('Server is running on port', port);
  });
};

(port = PORT) => {
  if (process.env.NODE_ENV === 'TEST') {
    return;
  }
  app(port).catch((err) => console.error(err));
};
