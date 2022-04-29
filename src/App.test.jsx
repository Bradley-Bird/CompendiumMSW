import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('main', () => {
  it('should display a list of characters based on dropdown selection', async () => {
    render(<App />);
    const loading = screen.getByText(/loading/i);
    await waitForElementToBeRemoved(loading);
    //check to see if the list === characters.length
    userEvent.selectOptions(
      await screen.findByRole('combobox'),
      await screen.findByRole('option', { name: 'Spirited Away' })
    );
    expect(screen.getByRole('option', { name: 'Spirited Away' }).selected).toBe(
      true
    );
    //   await waitFor(
    //     () => {
    //       screen.getByText('Haku');
    //     },
    //     {
    //       timeout: 5000,
    //     }
    //   );
  });
});
