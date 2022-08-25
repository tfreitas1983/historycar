
import http from "./config"

class SuporteDataService {
    buscarTodos() {
        return http.get(`/suporte`)
    }

    buscarUm(id) {
        return http.get(`/suporte/${id}`)
    }

    buscarusuario(id) {
        return http.get(`/suporte?user=${id}`)
    }

    cadastrar(data) {
        return http.post("/suporte", data)
    }

    editar(id, data) {
        return http.put(`/suporte/${id}`, data)
    }


}

export default new SuporteDataService()