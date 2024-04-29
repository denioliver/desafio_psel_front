import { Link } from 'react-router-dom';
import { MdViewModule } from 'react-icons/md';
import { BsViewStacked } from 'react-icons/bs';
import { useContext } from 'react';
import style from './index.module.css';
import UserContext from '../../context/UserContext';

function Nav() {
  const context = useContext(UserContext);
  const { inList, handleInList } = context;
  return (
    <div className={ style.containe }>
      <nav className={ style.nav }>
        <Link to="/">Mais recentes </Link>
        <Link to="/release">Release </Link>
        <Link to="/noticia">Notícia </Link>
        <Link to="/favorite">Favoritas </Link>
      </nav>
      <button
        data-testid="inList"
        className={ style.btn }
        onClick={ handleInList }
      >
        { inList ? <BsViewStacked /> : <MdViewModule /> }

      </button>
    </div>

  );
}

export default Nav;
