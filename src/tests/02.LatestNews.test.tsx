import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';
import { MockAPI } from '../mocks';
import UserContext from '../context/UserContext';
import LatestNews from '../components/LatestNews';

const mockContextValue = {
  news: MockAPI,
  inList: true,
  handleInList: vi.fn(),
};

describe('Renderização componente LatestNews', () => {
  test('Deve renderizar a imagem da "Notícia mais recente"', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={ mockContextValue }>
          <LatestNews />
        </UserContext.Provider>,
      );
    });

    const imgNoticia = screen.getByTestId('img-39868');
    expect(imgNoticia).toBeInTheDocument();
  });

  test('Deve renderizar um botao para favoritar a naticia', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={ mockContextValue }>
          <LatestNews />
        </UserContext.Provider>,
      );
    });

    const FavoritarNoticia = screen.getByTestId('btnFavorit-39868');
    expect(FavoritarNoticia).toBeInTheDocument();
  });

  test('Deve renderizar um paragrafo com o text "Notícia mais recente"', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={ mockContextValue }>
          <LatestNews />
        </UserContext.Provider>,
      );
    });

    const noticia = screen.getByText(/notícia mais recente/i);
    expect(noticia).toBeInTheDocument();
  });

  test('Deve renderizar o titulo da noticia mais recente', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={ mockContextValue }>
          <LatestNews />
        </UserContext.Provider>,
      );
    });
    const tituloNoticia = screen.getByTestId('titulo-39868');
    expect(tituloNoticia).toBeInTheDocument();
  });

  test('Deve renderizar a introdução da noticia mais recente', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={ mockContextValue }>
          <LatestNews />
        </UserContext.Provider>,
      );
    });
    const introNoticia = screen.getByTestId('introdução-39868');
    expect(introNoticia).toBeInTheDocument();
  });

  test('Deve renderizar a quantidade de dias da noticia', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={ mockContextValue }>
          <LatestNews />
        </UserContext.Provider>,
      );
    });
    const diasNoticia = screen.getByTestId('data-39868');
    expect(diasNoticia).toBeInTheDocument();
  });

  test('Deve renderizar um link com o text "Leia a notícia aqui", q deve redirecianar para o site da noticia', async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={ mockContextValue }>
          <LatestNews />
        </UserContext.Provider>,
      );
    });
    const diasNoticia = screen.getByTestId('btnRead-39868');
    expect(diasNoticia).toBeInTheDocument();
  });
});
