
import http from "./config"

class CadastroParceiroDataService {
    buscarTodos() {
        return http.get(`/parceiros`)
    }

    buscarUm(id) {
        return http.get(`/parceiros/${id}`)
    }

    buscarusuario(id) {
        return http.get(`/parceiros?user=${id}`)
    }

    cadastrar(data) {
        return http.post("/parceiros", data)
    }

    editar(id, data) {
        return http.put(`/parceiros/${id}`, data)
    }


}

export default new CadastroParceiroDataService()