import { setupServer } from 'mws/node';
import { rest } from 'msw';
import characters from './fixtures/characters';
global.fetch = (...args) =>
  import('cross-fetch').then(({ default: fetch }) => fetch(...args));

export const server = setupServer(
  rest.get('https://ghibliapi.herokuapp.com/people', (req, res, ctx) => {
    res(ctx.json(characters));
  })
);

beforeAll(() => server.listen);
afterEach(() => server.resetHandlers());
afterAll(() => server.close);
