import NodeEnvironment from 'jest-environment-node';
import type { Config } from '@jest/types';
import app, { redisClient } from '../../src/app';
import { createConnection } from 'typeorm';
import { Server } from 'http';
const PORT = process.env.PORT;

let server: Server;
class TestEnvironment extends NodeEnvironment {
  constructor(config: Config.ProjectConfig) {
    super(config);
  }

  public async setup(): Promise<void> {
    await super.setup();

    console.log('SETTING UP...');
    await createConnection();
    server = app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }

  public async teardown(): Promise<void> {
    await super.teardown();
    console.log('TEARING DOWN!');
    await redisClient.flushall();
    await redisClient.disconnect();
    await redisClient.quit();
    server.close();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

export default TestEnvironment;
