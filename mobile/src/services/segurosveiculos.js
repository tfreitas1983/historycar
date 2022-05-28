
import http from "./config"

class SeguroDataService {
    buscarTodos() {
        return http.get(`/veiculosseguros`)
    }

    buscarUm(id) {
        return http.get(`/veiculosseguros/${id}`)
    }

    cadastrar(data) {
        return http.post("/veiculosseguros", data)
    }

    editar(id, data) {
        return http.put(`/veiculosseguros/${id}`, data)
    }


}

export default new SeguroDataService()