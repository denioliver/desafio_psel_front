import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import style from './index.module.css';
import BtnRead from '../BtnRead';

function Card() {
  const [visibleNewsCount, setVisibleNewsCount] = useState(6);

  const context = useContext(UserContext);
  const { news, inList } = context;

  function parseImageURL(imageJSON: string, imageType: string) {
    if (!imageJSON) return ''; // Retorna uma string vazia se não houver imagem
    const imageObj = JSON.parse(imageJSON);
    const imagePath = imageObj[imageType];
    if (!imagePath) return ''; // Retorna uma string vazia se o caminho da imagem for inválido
    return `http://agenciadenoticias.ibge.gov.br/${imagePath}`; // Constrói a URL completa
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
        news.slice(1, visibleNewsCount + 1).map((element) => (
          <div
            key={ element.id }
            className={ inList ? style.card : style.cardList }
          >
            <div>
              {!inList && (
                <img
                  src={ parseImageURL(
                    element.imagens,
                    'image_intro'
                    || 'image_fulltext'
                    || 'image_intro_alt'
                    || 'image_intro_caption'
                    || 'float_fulltext'
                    || 'image_fulltext_alt'
                    || 'image_fulltext_caption',
                  ) }
                  alt={ element.titulo }
                  className={ inList ? style.img : style.imgList }
                />
              )}
            </div>
            <div className={ inList ? style.descritions : style.descritionsList }>
              <h1>{element.titulo}</h1>
              <p>{element.introducao}</p>
              <p>{element.destaque}</p>
              <div className={ style.containeBtn }>
                <p>
                  {calculateDaysSincePublication(element.data_publicacao)}
                </p>
                <BtnRead link={ element.link } />
              </div>
              <div className={ style.containeFavoritar }>
                <button
                  className={ style.btnFavoritar }
                >
                  Favoritar
                </button>
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
