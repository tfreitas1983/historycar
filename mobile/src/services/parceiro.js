
import http from "./config"

class ParceiroDataService {
    buscarTodos() {
        return http.get(`/parceiros`)
    }

    busca (uf, cidade, sexo) {
        return http.get(`/parceiros?uf=${uf}&cidade=${cidade}&sexo=${sexo}`)
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


}

export default new ParceiroDataService()