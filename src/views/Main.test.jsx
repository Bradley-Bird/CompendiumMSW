import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Main from './Main';

describe('main', () => {
  it('should display a list of characters from every movie', async () => {
    render(<Main />);
    // const loading =
    screen.getByText(/loading/i);
    // await waitForElementToBeRemoved(loading);
    //check to see if the list === characters.length
    await waitFor(
      () => {
        screen.getByText('Haku');
      },
      {},
      { timeout: 5000 }
    );
  });
});
