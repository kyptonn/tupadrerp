import React, {useContext, useState, useEffect} from 'react'


export const GlobalCoins = React.createContext(0);

export default ({children}) => {
    const [monedas, setMonedas] = useState(0)

    return(
        <GlobalCoins.Provider value={[monedas, setMonedas]}>
            {children}
        </GlobalCoins.Provider>
    );

}
