import { createContext, useState } from "react";
import ILista from "../types/ILista";

interface IListaContextData {
    listaContexto: ILista
    setListaContexto: React.Dispatch<React.SetStateAction<ILista>>
}

interface IListaProviderProps {
    children: React.ReactNode
}

export const ListaContext = createContext<IListaContextData>({} as IListaContextData)

export const ListaProvider: React.FC<IListaProviderProps> = ({ children }) => {
    
    const [listaContexto, setListaContexto] = useState<ILista>({} as ILista)


    return (
        <ListaContext.Provider value={{
            listaContexto: listaContexto,
            setListaContexto: setListaContexto
        }}>
            {children}
        </ListaContext.Provider>
    )
}