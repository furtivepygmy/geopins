import { createContext } from 'react';

const Context = createContext({
  isAuth: false,
  currentUser: null,
  draft: null
});

export default Context;
