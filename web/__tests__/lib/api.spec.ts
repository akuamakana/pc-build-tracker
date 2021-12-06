/**
 * @jest-environment node
 */

import { register } from '@lib/api';
const nock = require('nock');

describe('register', () => {
  it('should return a promise', async () => {
    const scope = nock('http://localhost:4000').persist().post('/auth/register').reply(201, true);
    const _register = await register({ username: '', email: '', password: '' });
    expect(register({ username: '', email: '', password: '' })).toBeInstanceOf(Promise);
    expect(_register).toBe(true);
    scope.done();
  });
});
