import api from "../api";
import ILista from "../types/ILista";

class ListaService{
    async getAll() {
        return await api.get<ILista[]>("/listas")
    }
    
    async get(id: string) {
        return await api.get<ILista>(`/listas/${id}`)
    }

    async create(data: ILista) {
        return await api.post<ILista>("/listas", data)
    }

    async update(id: string, data: ILista) {
        return await api.put<any>(`/listas/${id}`, data)
    }

    async delete(id: string) {
        return await api.delete<any>(`/listas/${id}`)
    }
} 

export default new ListaService();