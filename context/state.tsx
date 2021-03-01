import { createContext, useContext, useState } from 'react';

//@ts-ignore
const AppContext = createContext();


export function AppWrapper({ children }) {

    const [state, setState] = useState<boolean>(false); //false indicates sign up



  return (

    <AppContext.Provider value={{state: state, setState: setState}}>

      {children}

    </AppContext.Provider>

  );

}


export function useAppContext() {

  return useContext(AppContext);

}