import { render, screen, within } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';
import App from '../App';
import { MockAPI } from '../mocks';
import UserContext from '../context/UserContext';

const mockHandleInList = vi.fn();

const mockContextValue = {
  news: MockAPI,
  inList: true,
  handleInList: mockHandleInList(),
};

describe('Renderização componente Nav', () => {
  test('Deve renderizar 4 links oara as paginas "Mais recentes", "Release", "Notícias" e "Favoritas"', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={ mockContextValue }>
          <App />
        </UserContext.Provider>
      </BrowserRouter>,
    );

    const maisRecentes = screen.getByRole('link', { name: /mais recentes/i });
    const release = screen.getByRole('link', { name: /release/i });
    const noticia = screen.getByRole('navigation'); within(noticia).getByRole('link', { name: /notícia/i });
    const favoritas = screen.getByRole('link', { name: /favoritas/i });

    expect(maisRecentes).toBeInTheDocument();
    expect(release).toBeInTheDocument();
    expect(noticia).toBeInTheDocument();
    expect(favoritas).toBeInTheDocument();
  });

  test('ao clicar no lins para a pagina "Release", a pagina deve esta em manutenção', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <UserContext.Provider value={ mockContextValue }>
            <App />
          </UserContext.Provider>
        </BrowserRouter>,
      );
    });

    const release = screen.getByRole('link', { name: /release/i });

    expect(release).toBeInTheDocument();

    await userEvent.click(release);

    const serviceUnavailable = await screen.findByRole('heading', { name: /503 service unavailable/i });

    expect(serviceUnavailable).toBeInTheDocument();
  });

  test('ao clicar no lins para a pagina "Notícias", a pagina deve esta em manutenção', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <UserContext.Provider value={ mockContextValue }>
            <App />
          </UserContext.Provider>
        </BrowserRouter>,
      );
    });

    const noticia = screen.getByRole('navigation'); within(noticia).getByRole('link', { name: /notícia/i });

    expect(noticia).toBeInTheDocument();

    await userEvent.click(noticia);

    const serviceUnavailable = await screen.findByRole('heading', { name: /503 service unavailable/i });

    expect(serviceUnavailable).toBeInTheDocument();
  });

  test('ao clicar no lins para a pagina "Favoritas", deve renderizar o text "Nenhum favorito foi adicionado.", caso não tenha cido nenhuma noticia favoritada', async () => {
    act(() => {
      render(
        <BrowserRouter>
          <UserContext.Provider value={ mockContextValue }>
            <App />
          </UserContext.Provider>
        </BrowserRouter>,
      );
    });

    const favoritas = screen.getByRole('link', { name: /favoritas/i });

    expect(favoritas).toBeInTheDocument();

    await userEvent.click(favoritas);

    const serviceUnavailable = await screen.findByRole('heading', { name: /Nenhum favorito foi adicionado./i });

    expect(serviceUnavailable).toBeInTheDocument();
  });

  test('se a url foi de uma rota inesistente, deverar renderizar a pagina de NotFound', async () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={ ['/*'] }>
          <UserContext.Provider value={ mockContextValue }>
            <App />
          </UserContext.Provider>
        </MemoryRouter>,
      );
    });

    const notFound = screen.getByRole('heading', { name: /404 not found/i });
    expect(notFound).toBeInTheDocument();
  });

  test('renderiza um botão para colocar os cards um abaixo do outro ou um do lado do outro', async () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <UserContext.Provider value={ mockContextValue }>
          <App />
        </UserContext.Provider>
      </MemoryRouter>,
    );

    const inList = await screen.findByTestId('inList');
    expect(inList).toBeInTheDocument();

    await userEvent.click(inList);
  });
});
