import Header from '../../components/Header';
import style from './index.module.css';

function Unavailable() {
  return (
    <div>
      <Header />
      <div className={ style.container }>
        <h1>503 Service Unavailable</h1>
        <p>
          Desculpe, esta página está temporariamente indisponível devido a
          manutenção programada. Por favor, tente novamente mais tarde.
        </p>
      </div>
    </div>
  );
}

export default Unavailable;
