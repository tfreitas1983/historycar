
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

    buscaveiculocliente(id) {
        return http.get(`/veiculosclientes?cliente=${id}`)
    }

    veiculocliente(id) {
        return http.get(`/veiculosclientes/${id}`)
    }

    vendaveiculo (veiculo, cliente) {
        return http.get(`/veiculosclientes?veiculo=${veiculo}&cliente=${cliente}`)
    }

    cadastrar(data) {
        return http.post("/veiculos", data)
    }

    editar(id, data) {
        return http.put(`/veiculos/${id}`, data)
    }

    editarrelacao(id, data) {
        return http.put(`/veiculosclientes/${id}`, data)
    }

    novocliente(id, data) {
        return http.put(`/veiculos/novocliente/${id}`, data)
    }

    veiculoseguro(id) {
        return http.get(`/veiculosseguros?veiculo=${id}`)
    }


}

export default new VeiculoDataService()