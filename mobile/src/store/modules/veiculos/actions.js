export function pegaVeiculo (id, kmaquisicao, situacao, clienteId, veiculoId) {
    return{
        type: '@veiculo/PEGAVEICULO',
        payload: {id, kmaquisicao, situacao, clienteId, veiculoId}
    }
}