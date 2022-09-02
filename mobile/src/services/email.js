
import http from "./config";
import api from "./api";

class EmailDataService {
    buscarTodos() {
        return http.get(`/veiculosmanutencoes`)
    }

    buscaveiculo(id) {
        return http.get(`/veiculosmanutencoes?veiculo=${id}`)
    }

    buscarUm(id) {
        return http.get(`/veiculosmanutencoes/${id}`)
    }

    existe(email){
        return api.get(`/usuarios?email=${email}`)
    }

    esqueci(email, acao){
        return http.get(`/email?email=${email}&acao=${acao}`)
    }

    cadastrar(data) {
        return http.post("/veiculosmanutencoes", data)
    }

    editar(id, data) {
        return http.put(`/veiculosmanutencoes/${id}`, data)
    }
	
	cadastrarImagem(file) {
        return http.post("/veiculosmanutencoes/files", file)
    } 


}

export default new EmailDataService()