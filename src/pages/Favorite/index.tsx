import { useContext, useEffect, useState } from 'react';
import { MdOutlineFavorite } from 'react-icons/md';
import UserContext from '../../context/UserContext';
import style from './index.module.css';
import { FavoriteType } from '../../types';
import BtnRead from '../../components/BtnRead';
import Header from '../../components/Header';

function Favorite() {
  const [favorites, setFavorites] = useState<FavoriteType[]>([]);
  const context = useContext(UserContext);
  const { inList } = context;

  useEffect(() => {
    const data = () => {
      if (typeof (Storage) !== 'undefined') {
        const dataFromStorage = localStorage.getItem('NewsFavorite');
        if (dataFromStorage !== null) {
          const favoritesFromStorage = JSON.parse(dataFromStorage) as FavoriteType[];
          setFavorites(favoritesFromStorage);
        } else {
          setFavorites([]);
        }
      }
    };
    data();
  }, []);

  const handleClickUnFavorite = (idToRemove: number) => {
    // Obtém os favoritos do localStorage
    const favoritesFromStorage = localStorage.getItem('NewsFavorite');

    // Se existirem favoritos no localStorage
    if (favoritesFromStorage !== null) {
      // Converte a string de favoritos de volta para um array de objetos
      const favoritesArray = JSON.parse(favoritesFromStorage) as FavoriteType[];

      // Filtra o array de favoritos para remover o favorito com o ID correspondente
      const updatedFavorites = favoritesArray
        .filter((favorite) => (favorite.id) !== idToRemove);

      // Atualiza os favoritos no localStorage
      localStorage.setItem('NewsFavorite', JSON.stringify(updatedFavorites));

      // Atualiza o estado de favoritos no componente
      setFavorites(updatedFavorites);
    }
  };

  function parseImageURL(imagens: string, chaveImagens: string) {
    const imageObj = JSON.parse(imagens);
    const imagePath = imageObj[chaveImagens];
    return `http://agenciadenoticias.ibge.gov.br/${imagePath}`;
  }

  function parseDateString(dateString: string) {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hour, minute, second] = timePart.split(':');
    return new Date(
      year as any,
      month as any - 1,
      day as any,
      hour as any,
      minute as any,
      second as any,
    );
  }

  function calculateDaysSincePublication(publicationDate: string) {
    const publicationDateObj = parseDateString(publicationDate);
    if (Number.isNaN(publicationDateObj.getTime())) {
      return 'Data inválida';
    }
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - publicationDateObj.getTime());
    const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (diffDays === 1) {
      return `${diffDays} dia atrás.`;
    }
    return `${diffDays} dias atrás.`;
  }

  if (favorites.length === 0) {
    return (
      <div>
        <Header />
        <div style={ { width: '100%', textAlign: 'center', margin: '40px auto' } }>
          <h1>Nenhum favorito foi adicionado.</h1>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className={ style.containe }>
        {
          favorites.map((key) => (
            <div
              key={ key.id }
              className={ inList ? style.Favorite : style.FavoriteList }
            >
              <div>
                <img
                  src={ parseImageURL(key.img, 'image_fulltext') }
                  alt={ key.title }
                  className={ inList ? style.img : style.imgList }
                />
              </div>
              <div
                className={ inList ? style.descritions : style.descritionsList }
              >
                <h1 data-testid={ `tituloFavorito-${key.id}` }>{key.title}</h1>
                <p data-testid={ `introFavorito-${key.id}` }>{key.intro}</p>
                <div className={ style.containeBtn }>
                  <p>
                    {calculateDaysSincePublication(key.data_publicacao)}
                  </p>
                  <BtnRead dataTestId={ `btnRead-${key.id}` } link={ key.link } />
                </div>
                <div className={ style.containeFavoritar }>
                  <button
                    data-testid="desfavoritar"
                    onClick={ () => handleClickUnFavorite(key.id) }
                    aria-label="Desfavoritar"
                  >
                    <MdOutlineFavorite />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Favorite;
