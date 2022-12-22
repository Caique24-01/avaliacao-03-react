import { createContext, useState } from "react";
import IItem from "../types/IItem";

interface IItemContextData {
    itemContexto: IItem
    setItemContexto: React.Dispatch<React.SetStateAction<IItem>>
}

interface IItemProviderProps {
    children: React.ReactNode
}

export const ItemContext = createContext<IItemContextData>({} as IItemContextData)

export const ItemProvider: React.FC<IItemProviderProps> = ({ children }) => {
    
    const [itemContexto, setItemContexto] = useState<IItem>({} as IItem)


    return (
        <ItemContext.Provider value={{
            itemContexto: itemContexto,
            setItemContexto: setItemContexto
        }}>
            {children}
        </ItemContext.Provider>
    )
}