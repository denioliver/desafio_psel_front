import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import UserProvider from '../context/UserProvider';

describe('Renderização da barra de titulo do header', () => {
  test('Deve renderizar um titulo com o texto "TRYBE NEWS"', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>,
    );

    const titulo = screen.getByRole('heading', { name: /trybe news/i });
    expect(titulo).toBeInTheDocument();
  });
  test('Deve renderizar uma logo"', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>,
    );

    const logo = screen.getByRole('img', { name: /logo-trybe/i });
    expect(logo).toBeInTheDocument();
  });
});
