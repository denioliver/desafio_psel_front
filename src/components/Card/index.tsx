import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import style from './index.module.css';
import BtnRead from '../BtnRead';
import BtnFavorite from '../BtnFavorite';

function Card() {
  const [visibleNewsCount, setVisibleNewsCount] = useState(6);

  const context = useContext(UserContext);
  const { news, inList } = context;

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
        news.slice(1, visibleNewsCount + 1).map((key) => (
          <div
            key={ key.id }
            className={ inList ? style.card : style.cardList }
          >
            <div>
              <img
                data-testid={ `img-${key.id}` }
                src={ parseImageURL(key.imagens, 'image_fulltext') }
                alt={ key.titulo }
                className={ inList ? style.img : style.imgList }
              />
            </div>
            <div
              className={ inList ? style.descritions : style.descritionsList }
            >
              <h1 data-testid={ `titulo-${key.id}` }>{key.titulo}</h1>
              <p data-testid={ `intro-${key.id}` }>{key.introducao}</p>
              <div className={ style.containeBtn }>
                <p>
                  {calculateDaysSincePublication(key.data_publicacao)}
                </p>
                <BtnRead dataTestId={ `data-${key.id}` } link={ key.link } />
              </div>
              <div className={ style.containeFavoritar }>
                <BtnFavorite
                  cardDate={ {
                    id: key.id,
                    img: key.imagens,
                    title: key.titulo,
                    intro: key.introducao,
                    destaque: key.destaque,
                    data_publicacao: key.data_publicacao,
                    link: key.link,
                  } }
                  testId={ `test-id-${key.id}` }
                />
              </div>
            </div>
          </div>
        ))
      }
      </div>
      <div className={ style.containeBtnMais }>
        <button
          className={ style.btnMais }
          onClick={ () => setVisibleNewsCount(visibleNewsCount + 6) }
        >
          MAIS NOTÍCIAS
        </button>
      </div>
    </div>
  );
}

export default Card;
