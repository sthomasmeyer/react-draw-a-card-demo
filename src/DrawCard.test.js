import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import DrawCard from './DrawCard';

// Smoke test:
it('renders without crashing', () => {
  render(<DrawCard />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<DrawCard />);
  expect(asFragment()).toMatchSnapshot();
});

it('draws a card effectively on-click', () => {
  render(<DrawCard />);

  const drawCardBtn = screen.getByRole('button', {
    name: /Draw a Card/i
  });
  fireEvent.click(drawCardBtn);

  const playingCard = screen.queryByAltText('playing card');
  expect(playingCard).toBeInTheDocument();
});
