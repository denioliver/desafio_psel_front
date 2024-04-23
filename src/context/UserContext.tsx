import { createContext } from 'react';
import { ContextType } from '../types';

const UserContext = createContext<ContextType>({
  news: [],
  inList: true,
  handleInList(): void {
    throw new Error('Function not implemented.');
  },
});

export default UserContext;
