import style from './index.module.css';

type BtnProps = {
  link: string,
  dataTestId: string
};

function BtnRead(props: BtnProps) {
  const { link, dataTestId } = props;
  return (
    <div className={ style.btn }>
      <a
        data-testid={ dataTestId }
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
