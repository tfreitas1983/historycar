
import http from "./config"

class ParceiroPrecoDataService {
    buscarTodos() {
        return http.get(`/parceirosprecos`)
    }

    buscarUm(id) {
        return http.get(`/parceirosprecos/${id}`)
    }

    cadastrar(data) {
        return http.post("/parceirosprecos", data)
    }

    editar(id, data) {
        return http.put(`/parceirosprecos/${id}`, data)
    }


}

export default new ParceiroPrecoDataService()