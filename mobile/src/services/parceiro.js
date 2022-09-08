
import http from "./config"

class ParceiroDataService {
    buscarTodos() {
        return http.get(`/parceiros`)
    }

    busca (uf, cidade, sexo, ramo) {
        return http.get(`/parceiros?uf=${uf}&cidade=${cidade}&sexo=${sexo}&ramo=${ramo}`)
    }

    buscarUm(id) {
        return http.get(`/parceiros/${id}`)
    }

    cadastrar(data) {
        return http.post("/parceiros", data)
    }

    editar(id, data) {
        return http.put(`/parceiros/${id}`, data)
    }

    comentario(data) {
        return http.post("/comentarios", data)
    }

    todoscomentarios (id) {
        return http.get(`/comentarios?parceiro=${id}`)
    }


}

export default new ParceiroDataService()