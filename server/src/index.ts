require('dotenv-safe').config();
import { createConnection } from 'typeorm';
import app from './app';

const main = async () => {
  const PORT = process.env.PORT;
  await createConnection();
  return app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
};

main().catch((err) => console.error(err));
