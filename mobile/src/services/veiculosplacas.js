
import http from "./config"

class PlacaDataService {
    buscarTodos() {
        return http.get(`/veiculosplacas`)
    }

    buscaplaca(id) {
        return http.get(`/veiculosplacas?veiculo=${id}`)
    }

    buscarUm(id) {
        return http.get(`/veiculosplacas/${id}`)
    }

    cadastrar(data) {
        return http.post("/veiculosplacas", data)
    }

    editar(id, data) {
        return http.put(`/veiculosplacas/${id}`, data)
    }


}

export default new PlacaDataService()