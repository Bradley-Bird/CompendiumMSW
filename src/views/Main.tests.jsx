import { render, screen } from '@testing-library/react';
import App from '../App';
import characters from '../fixtures/characters';

describe('main', () => {
  it('should display a list of characters from every movie', async () => {
    render(<App />);
  });
  //check to see if the list === characters.length
  const charList = screen.getByRole('listbox');
  expect(charList.children.length).toEqual(characters.length);
  //check to see if dropdown === all
});
