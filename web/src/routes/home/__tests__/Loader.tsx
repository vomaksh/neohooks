import { render, screen } from '@testing-library/react';
import { Loader } from '../Loader';

test('Hook image and spinner init', () => {
  render(<Loader />);
  const loadingImage = screen.getByRole('img');
  const spinner = screen.getByTestId('home-loader');
  expect(spinner).toBeInTheDocument();
  expect(loadingImage.getAttribute('alt')).toBe('hook');
});
