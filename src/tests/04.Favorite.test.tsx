import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { MockAPI } from '../mocks';
import UserContext from '../context/UserContext';
import App from '../App';

const mockContextValue = {
  news: MockAPI,
  inList: true,
  handleInList: vi.fn(),
};

describe('Renderização componente LatestNews', () => {
  test('Ao clicar no botão de favoritar deve renderizar o card na pagina de favoritos"', async () => {
    render(
      <UserContext.Provider value={ mockContextValue }>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext.Provider>,
    );

    const FavoritarNoticia = screen.getByTestId('test-id-39866');
    const pageFavotitas = screen.getByRole('link', { name: /favoritas/i });
    expect(FavoritarNoticia).toBeInTheDocument();
    expect(pageFavotitas).toBeInTheDocument();

    expect(localStorage).toHaveLength(0);

    await userEvent.click(FavoritarNoticia);
    expect(localStorage).toHaveLength(1);

    await userEvent.click(pageFavotitas);

    const tituloFavoritado = await screen.findByTestId('tituloFavorito-39866');
    const introFavoritado = screen.getByTestId('introFavorito-39866');
    const btnDesfavoritar = screen.getByTestId('desfavoritar');

    expect(tituloFavoritado).toBeInTheDocument();
    expect(introFavoritado).toBeInTheDocument();
    expect(btnDesfavoritar).toBeInTheDocument();

    await userEvent.click(btnDesfavoritar);

    expect(tituloFavoritado).not.toBeInTheDocument();
    expect(introFavoritado).not.toBeInTheDocument();
    expect(btnDesfavoritar).not.toBeInTheDocument();
  });
});
