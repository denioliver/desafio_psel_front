export type NewsType = {
  id: number,
  tipo: string,
  titulo: string,
  introducao: string,
  data_publicacao: string
  produto_id: number,
  produtos: string,
  editorias: string,
  imagens: string,
  produtos_relacionados: string
  destaque: boolean,
  link: string,
};

export type ContextType = {
  news: NewsType[],
  inList: boolean,
  handleInList: () => void,
};

export type FavoriteType = {
  id: number,
  img: string,
  title: string,
  intro: string,
  destaque: boolean,
  data_publicacao: string,
  link: string
};
