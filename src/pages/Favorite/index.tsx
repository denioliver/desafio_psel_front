import { useContext, useEffect, useState } from 'react';
import { GrFavorite } from 'react-icons/gr';
import { MdOutlineFavorite } from 'react-icons/md';
import UserContext from '../../context/UserContext';
import style from './index.module.css';
import { FavoriteType } from '../../types';
import BtnRead from '../../components/BtnRead';

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
  }, [favorites]);

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

  return (
    <div>
      <div className={ style.containe }>
        {
        favorites.map((key) => (
          <div
            key={ key.id }
            className={ inList ? style.Favorite : style.FavoriteList }
          >
            <div style={ { width: '50%' } }>
              {!inList && (
                <img
                  src={ parseImageURL(key.img, 'image_fulltext') }
                  alt={ key.title }
                  className={ inList ? style.img : style.imgList }
                />
              )}
            </div>
            <div
              className={ inList ? style.descritions : style.descritionsList }
            >
              <h1>{key.title}</h1>
              <p>{key.intro}</p>
              <p>{key.destaque}</p>
              <div className={ style.containeBtn }>
                <p>
                  {calculateDaysSincePublication(key.data_publicacao)}
                </p>
                <BtnRead link={ key.link } />
              </div>
              <div className={ style.containeFavoritar }>
                <button
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
