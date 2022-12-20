import ILista from "./ILista"

export default interface IItem {
    id?: number | null
    titulo: string
    concluido: boolean
    lista: ILista
}