import style from './index.module.css';

type BtnProps = {
  link: string
};

function BtnRead(props: BtnProps) {
  const { link } = props;
  return (
    <div className={ style.btn }>
      <a
        href={ link }
        target="_blank"
        rel="noreferrer"
      >
        Leia a notícia aqui
      </a>
    </div>

  );
}

export default BtnRead;
