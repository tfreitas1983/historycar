
import http from "./config"

class CadastroClienteDataService {
    buscarTodos() {
        return http.get(`/clientes`)
    }

    buscarUm(id) {
        return http.get(`/clientes/${id}`)
    }

    cadastrar(data) {
        return http.post("/clientes", data)
    }

    editar(id, data) {
        return http.put(`/clientes/${id}`, data)
    }


}

export default new CadastroClienteDataService()