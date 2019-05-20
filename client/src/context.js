import { createContext } from 'react';

const Context = createContext({
  isAuth: false,
  currentUser: null,
  draft: null,
  pins: [],
  currentPin: null
});

export default Context;
