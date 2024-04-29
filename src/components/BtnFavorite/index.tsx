import { useState } from 'react';
import { GrFavorite } from 'react-icons/gr';
import { MdOutlineFavorite } from 'react-icons/md';
import style from './index.module.css';
import { FavoriteType } from '../../types';

interface BtnFavoriteProps {
  cardDate: FavoriteType,
  testId: string,
}

function BtnFavorite(props: BtnFavoriteProps) {
  const { cardDate, testId } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClickFavorite = () => {
    if (!isFavorite) {
      setIsFavorite(true);
      const favorites = localStorage.getItem('NewsFavorite');
      const novoFavorito = {
        id: cardDate.id,
        img: cardDate.img,
        title: cardDate.title,
        intro: cardDate.intro,
        destaque: cardDate.destaque,
        data_publicacao: cardDate.data_publicacao,
        link: cardDate.link,
      };

      let favoritesArray: FavoriteType[];

      if (favorites === null) {
        favoritesArray = [novoFavorito];
      } else {
        favoritesArray = JSON.parse(favorites);
        const exists = favoritesArray.some((favorite) => favorite.id === novoFavorito.id);

        if (!exists) {
          favoritesArray.push(novoFavorito);
        }
      }

      localStorage.setItem('NewsFavorite', JSON.stringify(favoritesArray));
    } else {
      // Remove o objeto da lista de favoritos se já estiver marcado como favorito
      setIsFavorite(false);
      const favorites = localStorage.getItem('NewsFavorite');
      let favoritesArray: FavoriteType[];

      if (favorites !== null) {
        favoritesArray = JSON.parse(favorites);
        // Filtra a lista de favoritos para remover o objeto com o mesmo id
        favoritesArray = favoritesArray.filter((favorite) => favorite.id !== cardDate.id);
        localStorage.setItem('NewsFavorite', JSON.stringify(favoritesArray));
      }
    }
  };

  return (
    <div className={ style.container }>
      <button
        data-testid={ testId }
        onClick={ handleClickFavorite }
      >
        {isFavorite ? <MdOutlineFavorite /> : <GrFavorite />}
      </button>
    </div>
  );
}

export default BtnFavorite;
