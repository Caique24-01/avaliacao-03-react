import api from "../api";
import IItem from "../types/IItem";

class ItemService {

    async getAll(listaId: string) {
        return await api.get<IItem[]>(`/itens/lista/${listaId}`)
    }

    async create(listaId: string, data: IItem) {
        return await api.post(`/itens/lista/${listaId}`, data)
    }

    async update(listaId: string, data: IItem,  itemId: number) {
        return await api.put(`/itens/${itemId}/lista/${listaId}`, data)
    }

    async delete(itemId: number) {
        return await api.delete(`/itens/${itemId}`)
    }

    async alterarParaDesconcluido( itemId: number) {
        return await api.put(`/itens/${itemId}/desconcluir`)
    }

    async alterarParaConcluido( itemId: number) {
        return await api.put(`/itens/${itemId}/concluir`)
    }
}

export default new ItemService();