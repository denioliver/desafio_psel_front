import logoTrybe from '../../image/image.png';
import style from './index.module.css';
import LatestNews from '../LatestNews';
import Nav from '../nav';

function Header() {
  return (
    <div>
      <div className={ style.containerTitle }>
        <img
          src={ logoTrybe }
          alt="Logo-Trybe"
          className={ style.logo }
        />
        <div>
          <h1>TRYBE NEWS</h1>
        </div>
      </div>
      <LatestNews />
      <div className={ style.containerNav }>
        <Nav />
      </div>
    </div>
  );
}

export default Header;
