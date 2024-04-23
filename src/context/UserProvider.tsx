import { useEffect, useState } from 'react';
import UserContext from './UserContext';
import { ContextType, NewsType } from '../types';

type NewsProviderProps = {
  children: React.ReactNode;
};

function UserProvider({ children }: NewsProviderProps) {
  const [news, setNews] = useState<NewsType[]>([]);
  const [inList, setInList] = useState(true);

  const URL = 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100';

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const request = await fetch(URL);
        const data = await request.json();
        setNews(data.items);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchApi();
  }, []);

  const handleInList = () => {
    if (inList) {
      setInList(false);
    } else {
      setInList(true);
    }
  };

  console.log(news);

  const contextValue: ContextType = {
    news,
    inList,
    handleInList,
  };

  return (
    <UserContext.Provider value={ contextValue }>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
