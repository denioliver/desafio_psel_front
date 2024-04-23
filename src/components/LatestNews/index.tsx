import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import style from './index.module.css';
import BtnRead from '../BtnRead';

function LatestNews() {
  const context = useContext(UserContext);
  const { news } = context;

  // Ordenar as notícias pela data de publicação
  const sortedNews = news
    .sort((a, b) => Number(new Date(b.data_publicacao))
    - Number(new Date(a.data_publicacao)));

  // Selecionar apenas a notícia mais recente (primeiro elemento após ordenação)
  const latestNews = sortedNews[0];

  let daysSincePublication = '';

  if (latestNews) {
    const publicationDate = parseDateString(latestNews.data_publicacao);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - publicationDate.getTime());
    const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (diffDays === 1) {
      daysSincePublication = `${diffDays} dia atrás.`;
    } else {
      daysSincePublication = `${diffDays} dias atrás.`;
    }
  }

  // Função auxiliar para converter a string de data no formato "DD/MM/AAAA HH:MM:SS" para um objeto Date
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

  // Função auxiliar para extrair a URL da imagem a partir do JSON
  function parseImageURL(imageJSON: string, imageType: string) {
    if (!imageJSON) return ''; // Retorna uma string vazia se não houver imagem
    const imageObj = JSON.parse(imageJSON);
    const imagePath = imageObj[imageType];
    if (!imagePath) return ''; // Retorna uma string vazia se o caminho da imagem for inválido
    return `http://agenciadenoticias.ibge.gov.br/${imagePath}`; // Constrói a URL completa
  }

  return (
    <div className={ style.container }>
      {
        latestNews && (
          <div
            key={ latestNews.id }
            className={ style.latestNews }
          >
            <div>
              <img
                src={ parseImageURL(
                  latestNews.imagens,
                  'image_intro'
                  || 'image_fulltext'
                  || 'image_intro_alt'
                  || 'image_intro_caption'
                  || 'float_fulltext'
                  || 'image_fulltext_alt'
                  || 'image_fulltext_caption',
                ) }
                alt={ latestNews.titulo }
              />
            </div>
            <div className={ style.descriptions }>
              <div>
                <p style={ { color: 'red' } }>Notícia mais recente</p>
                <div className={ style.containeFavoritar }>
                  <button className={ style.btnFavoritar }>Favoritar</button>
                </div>
              </div>
              <h1>{latestNews.titulo}</h1>
              <p>{latestNews.introducao}</p>
              <p>{latestNews.destaque}</p>
              <div>
                <p>{daysSincePublication}</p>
                <BtnRead link={ latestNews.link } />
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default LatestNews;
