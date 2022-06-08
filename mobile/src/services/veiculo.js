
import http from "./config"

class VeiculoDataService {
    buscarTodos() {
        return http.get(`/veiculos`)
    }

    buscarUm(id) {
        return http.get(`/veiculos/${id}`)
    }

    buscarRenavam (renavam) {
        return http.get(`/veiculos/renavam/${renavam}`)
    }

    cadastrar(data) {
        return http.post("/veiculos", data)
    }

    editar(id, data) {
        return http.put(`/veiculos/${id}`, data)
    }


}

export default new VeiculoDataService()