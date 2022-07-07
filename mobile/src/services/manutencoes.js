
import http from "./config"

class ManutencaoDataService {
    buscarTodos() {
        return http.get(`/veiculosmanutencoes`)
    }

    buscaveiculo(id) {
        return http.get(`/veiculosmanutencoes?veiculo=${id}`)
    }

    buscarUm(id) {
        return http.get(`/veiculosmanutencoes/${id}`)
    }

    cadastrar(data) {
        return http.post("/veiculosmanutencoes", data)
    }

    editar(id, data) {
        return http.put(`/veiculosmanutencoes/${id}`, data)
    }


}

export default new ManutencaoDataService()