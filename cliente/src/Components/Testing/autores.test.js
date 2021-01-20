import { render, screen } from '@testing-library/react';
import Autores from '../Vistas/autores';

test('prueba de renderizacion del link de autores', () => {
  render(<Autores />);
  const linkElement = screen.getByText(/autores/i);
  expect(linkElement).toBeInTheDocument();
});
