import React, {useRef, useState, useEffect, useCallback} from 'react';
import {Text, TextInput, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import SelectDropdown from 'react-native-select-dropdown';
import Button from '../../components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import ParceiroDataService from '../../services/parceiro';
import ParceiroPrecoDataService from '../../services/parceiropreco'
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
Feather.loadFont()

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Open Sans',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#a2a2a2',
    height: Dimensions.get('window').height * 0.5
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  }, 
  logo: {
    width: Dimensions.get('window').height * 0.128,
    height: Dimensions.get('window').height * 0.128,
    margin: 3,
    borderRadius: 90
  },
  link: {
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
    marginTop: 5,
    color:'#fff',
    fontSize: 15,
    textAlign: 'left',
    borderWidth: 2,
    borderColor: 'transparent',
    borderBottomColor: '#fff'
  },
  titulo: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom:5,
    color:'#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  item: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom:5,
    color:'#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  opcoes: {
    fontFamily: 'Open Sans',
    color: '#b2b2b2',
    backgroundColor: '#f2f2f2',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    fontSize: 20,
    marginTop: 20,
    padding: 5,
    textAlign: 'center',
    width: Dimensions.get('window').width
  },
  entrar:{
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#f2f2f2',
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    fontSize: 40,
    marginTop: 20,
    padding: 5,
    textAlign: 'center'
  },
  toogle: {      
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    fontFamily: 'Open Sans',
    color: '#fafafa',
    fontSize: 25,
    fontWeight: 'bold',       
    marginTop: 10
  },
  resumo: {
    fontFamily: 'Open Sans',
    color: '#b2b2b2',
    backgroundColor: '#f2f2f2',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    fontSize: 20,
    marginTop: 20,
    marginBottom:50,
    padding: 5,
    textAlign: 'left',
    width: Dimensions.get('window').width,
    height: 200
  },
  bordado : {
    fontFamily: 'Open Sans',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold', 
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    padding:8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#f2f2f2', 
    width: Dimensions.get('window').width,
  },
  ordenar: {
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
    color:'#fff',
    fontSize: 15,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#fff',
    padding: 2
  },
  notas : {
    fontFamily: 'Open Sans',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold', 
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 6,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#f2f2f2'
  },
  selecionada : {
    fontFamily: 'Open Sans',
    backgroundColor: '#fc4020',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold', 
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 6,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ff6060'
  },
});


export default function Despachante  ({ navigation })  {

  const URL = 'http://10.0.2.2:5099/files/'
  
  const userId = useSelector(state => state.auth.id);
  const [loadingdados, setLoadingDados] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);  
  const [mostraDetalhes, setMostraDetalhes] = useState(false);  
  const [suggestionsList, setSuggestionsList] = useState(null)
  const searchRef = useRef(null);
  const searchRef2 = useRef(null);
  const searchRef3 = useRef(null);
  const [cidades, setCidades] = useState('');
  const [cidade, setCidade] = useState('');
  const genero = ["Feminino", "Masculino"];
  const [sexo, setSexo] = useState('');
  const [ufselecionado, setUfSelecionado] = useState('');
  const [despachantes, setDespachantes]  = useState('');
  const [detalhesDespachante, setDetalhesDespachante] = useState('');
  const [parceiroEscolhido, setEscolhido] = useState('');  
  const [avaliacao, setAvaliacao] = useState(false);
  const [nota, setNota] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [comentario, setComentario] = useState('');

  const ufs = [
  { id: 'RJ', title: "Rio de Janeiro" },
  { id: 'SP', title: "São Paulo" },
  { id: "AC", title: "Acre" },
  { id: "AL", title: "Alagoas" },
  { id: "AP", title: "Amapá" },
  { id: "AM", title: "Amazonas" },
  { id: 'BA', title: "Bahia" },
  { id: 'CE', title: "Ceará" },
  { id: 'DF', title: "Distrito Federal" },
  { id: 'ES', title: "Espírito Santo" },
  { id: 'GO', title: "Goiás" },
  { id: 'MA', title: "Maranhão" },
  { id: 'MT', title: "Mato Grosso" },
  { id: 'MS', title: "Mato Grosso do Sul" },
  { id: 'MG', title: "Minas Gerais" },
  { id: 'PA', title: "Pará" },
  { id: 'PB', title: "Paraíba" },
  { id: 'PR', title: "Paraná" },
  { id: 'PE', title: "Pernambuco" },
  { id: 'PI', title: "Piauí" },  
  { id: 'RN', title: "Rio Grande do Norte" },
  { id: 'RS', title: "Rio Grande do Sul" },
  { id: 'RO', title: "Rondônia" },
  { id: 'RR', title: "Roraima" },
  { id: 'SC', title: "Santa Catarina" },  
  { id: 'SE', title: "Sergipe" },
  { id: 'TO', title: "Tocantins" }];


  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
    setSexo('');
    setCidade('');
    setUfSelecionado('');
  }, [])

  

  const onOpenSuggestionsList = useCallback(isOpened => {}, [])

  async function buscar () {
    setBuscado(true)
    await ParceiroDataService.busca(ufselecionado, cidade, sexo, 2)
    .then(response => {
      setDespachantes(response.data);
    })
    .catch(e => {
      console.error(e);
    })
  }


  let cidadesapi = null;
  async function PegaCidades(item) {

    let ufselecionado = item.id
    setUfSelecionado(item.id)
    setLoading(true)
    //setUfAtuacao(item.title);
    let resp = await axios.get(`http://enderecos.metheora.com/api/estado/${ufselecionado}/cidades`) 
      .then( response  =>  {                       
        cidadesapi = response.data.map(item => {return {
            id:item.Id,
            title: item.Nome
      }});
        setCidades(cidadesapi)
      })    
      .catch(e => {
      console.error(e);
      })   
      resp = await resp;
      
      setLoading(false)
  }

  async function SelecionaCidade (item) {
    setCidade(item.title);
    
  }

  let tempparceiro = null;
  async function SelecionaParceiro (id) {
    mostrar = null;

    await ParceiroDataService.buscarUm(id)
    .then(resp => {
      
      setEscolhido(resp.data);
      tempparceiro = resp.data.id;
    })
    .catch(e => {
      console.error(e);
    })
    
    await ParceiroPrecoDataService.parceiro(id)
    .then(response => {      
      setDetalhesDespachante(response.data);
    })
    .catch(e => {
      console.error(e);
    })

    pegaComentarios(id);
    setMostraDetalhes(true);
  }

  function limpa () {
    setBuscado(false);
    setDespachantes('');
    setEscolhido('');
    setDetalhesDespachante('');
    setMostraDetalhes(false);
    setUfSelecionado('');
    mostrar = null;
    mostradetalhes = null;
  }

  function handleSubmit() {
    
  }

  async function avaliar () {

    if (parceiroEscolhido.reputacao === 0) {
      var data = {
        comentario: comentario,
        nota: (parseInt(nota) + parceiroEscolhido.reputacao),
        parceiroId: parceiroEscolhido.id,
        userId: userId,
        situacao: 1
      }
    } else {
      var data = {
        comentario: comentario,
        nota: (parseInt(nota) + parceiroEscolhido.reputacao) / 2,
        parceiroId: parceiroEscolhido.id,
        userId: userId,
        situacao: 1
      }
    }


    await ParceiroDataService.editar(parceiroEscolhido.id, {reputacao: parseFloat(data.nota)})
    .then(response => {
      SelecionaParceiro(parceiroEscolhido.id)
    })
    .catch(e => {
      console.error(e)
    })

    await  ParceiroDataService.comentario(data)
    .then(response => {
      setAvaliacao(false);
    })
    .catch(e => {
      console.error(e)
    })
    
    tempparceiro = parceiroEscolhido.id;
    pegaComentarios(parceiroEscolhido.id);
    
  }


  let mostraloading = null;
  if (loadingdados === true) {
    mostraloading = <View>
    <ActivityIndicator size="large" color="#fff" />
  </View>
  }

 let mostradetalhes, mostracomentarios, mostrar = null;

  async function pegaComentarios () {
    
    await ParceiroDataService.todoscomentarios(tempparceiro)
    .then(response => {
      setComentarios(response.data);
    })
    .catch(e => {
      console.error(e);
    })
  }


  if (detalhesDespachante ) {

    if (comentarios) {
      mostracomentarios = comentarios.map(comment => {
        return (
        <View>
        <Text style={{borderTopWidth:2,  borderColor: '#fff'}}></Text>
          <Text style={styles.item}> {comment.comentario}   </Text> 
          <Text style={styles.item}> Em: {moment(comment.createdAt).format('DD/MM/YYYY')}   </Text> 
          <Text style={{borderBottomWidth:2,  borderColor: '#fff'}}></Text>
        </View>
        )
      });
    } 

    if (comentarios.length < 1) {
      mostracomentarios = <View>
           <Text style={styles.item}> Sem comentários no momento.   </Text>   
        </View>
    }

    mostradetalhes = detalhesDespachante.map(detalhe => {
      return (
        <View>
          <Text style={styles.item}> Consulta Dúvidas a partir de R$ {detalhe.presencial} </Text>
          <Text style={styles.item}> Consulta Remota  a partir de R$ {detalhe.remoto} </Text>
          <Text style={styles.bordado}> Serviços atendidos:</Text>
          <Text style={styles.item}> Conhecimento em mecânica: {parceiroEscolhido.mecanica === true ? 'Sim': 'Não'} </Text>
          <Text style={styles.item}> Conhecimento em funilaria: {parceiroEscolhido.funilaria === true ? 'Sim': 'Não'}  </Text>            
          <Text style={styles.item}> Realiza vistoria: {parceiroEscolhido.vistoria === true ? 'Sim': 'Não'} </Text> 
          <Text style={styles.item}> Pré compra: {parceiroEscolhido.precompra === true ? 'Sim': 'Não'}  </Text>
          <Text style={styles.item}> Equipamentos: {parceiroEscolhido.equipamentos === true ? 'Sim': 'Não'}   </Text>   
          <Text style={styles.titulo}> Resumo a respeito do meu trabalho </Text>
          <Text style={styles.resumo}>{parceiroEscolhido.resumo}</Text>

          <Text 
          style={{color:'#fff', textAlign: 'right', fontSize: 20, marginTop:-30, fontWeight: 'bold', marginRight: 20}}
          onPress={() => setAvaliacao(true)}>
            <Entypo name="pencil" size={20} /> Avalie meu serviço   
          </Text>
          <Text style={styles.titulo}> Comentários de clientes </Text>
          {mostracomentarios}
        </View>
      )
    })
  }

  if (despachantes && buscado === true && !parceiroEscolhido) {
    mostrar = despachantes.map(item => {
      return (
        <>
        
        <View style={styles.toogle}>
          <Image
          source={{uri: URL+item.foto}}
          style={styles.logo}
              resizeMode="cover"
          />
          <View >
              <Text style={styles.ordenar}> {item.nome} - {item.reputacao === 0 ? 'Novo!' : item.reputacao } </Text>           
              <Text style={styles.item}> {item.celular} </Text>
              <Text style={styles.link} onPress={() => SelecionaParceiro(item.id)}> + detalhes </Text>
          </View>
        </View>
        {mostradetalhes}
        </>
      )
    })
  }

  if (parceiroEscolhido && buscado === true) {
    mostrar = 
        <>
        
        <View style={styles.toogle}>
          <Image
          source={{uri: URL+parceiroEscolhido.foto}}
          style={styles.logo}
              resizeMode="cover"
          />
          <View>
              <Text style={styles.ordenar}> {parceiroEscolhido.nome} - {parceiroEscolhido.reputacao === 0 ? 'Novo!' : parceiroEscolhido.reputacao} </Text>
              <Text style={styles.item}> {parceiroEscolhido.celular} </Text>
              <Text style={styles.link} onPress={() => SelecionaParceiro(parceiroEscolhido.id)}> + detalhes </Text>
          </View>
        </View>
        {mostradetalhes}
        </>
      
  }
  
  if (avaliacao === true) {
    mostrar = <>
    <View style={{width: Dimensions.get('window').width*0.9}}>
      <Text style={styles.titulo}> {parceiroEscolhido.nome}  </Text>              
      <Text style={styles.item}> Gostou do serviço prestado? </Text>
      <TextInput style={{
        backgroundColor: 'transparent', 
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#dfdfdf', 
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: 10
      }}
      autoCorrect={false}
      value={comentario} 
      onChangeText={setComentario} 
      autoFocus={true}
      multiline={true}
      numberOfLines={5}
      placeholder='Avalie o despachante' 
      placeholderTextColor="#f2f2f2"                 
      /> 

      <Text style={styles.item}> Dê uma nota </Text>
    </View>
    <View style={styles.toogle}>
      <Text style={nota === 1 ? styles.selecionada : styles.notas} onPress={() => setNota(1)}> 1 </Text>
      <Text style={nota === 2 ? styles.selecionada : styles.notas} onPress={() => setNota(2)} > 2 </Text>
      <Text style={nota === 3 ? styles.selecionada : styles.notas} onPress={() => setNota(3)} > 3 </Text>
      <Text style={nota === 4 ? styles.selecionada : styles.notas} onPress={() => setNota(4)} > 4 </Text>
      <Text style={nota === 5 ? styles.selecionada : styles.notas} onPress={() => setNota(5)} > 5 </Text>
      <Text style={nota === 6 ? styles.selecionada : styles.notas} onPress={() => setNota(6)} > 6 </Text>
      <Text style={nota === 7 ? styles.selecionada : styles.notas} onPress={() => setNota(7)}> 7 </Text>
      <Text style={nota === 8 ? styles.selecionada : styles.notas} onPress={() => setNota(8)} > 8 </Text>
      <Text style={nota === 9 ? styles.selecionada : styles.notas} onPress={() => setNota(9)}> 9 </Text>
      <Text style={nota === 10 ? styles.selecionada : styles.notas} onPress={() => setNota(10)}> 10 </Text>
    </View>
    <Button onPress={() =>  avaliar()} > Salvar</Button>
    <Button onPress={() =>  setAvaliacao(false)} > Voltar</Button>
    </>
  }  



  

  return (


    <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
          <ScrollView>

            {buscado === false && <>

            
            <Text style={styles.titulo}> Deseja procurar um despachante de veículos? </Text>
            <Text style={styles.titulo}> Selecione os filtros: </Text>
            
            <AutocompleteDropdown
            ref={searchRef}          
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            dataSet={ufs}
            onSelectItem={ item => PegaCidades(item) }
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
            onClear={onClearPress}
            loading={loading}
            useFilter={true}
            textInputProps={{
              placeholder: 'Selecione o estado',
              autoCorrect: false,
              autoCapitalize: 'none',
              placeholderTextColor: '#fff',
              style: {
                borderRadius: 15,
                backgroundColor: '#fd8900',
                color: '#fff',
                paddingLeft: 18,
                width: Dimensions.get('window').width*0.6
              },
            }}
            rightButtonsContainerStyle={{
              right: 8,
              height: 30,
              alignSelf: 'center',
            }}
            inputContainerStyle={{
              backgroundColor: '#fd8900',
              borderRadius: 25,
            }}
            suggestionsListContainerStyle={{ backgroundColor: '#fd8900' }}
            containerStyle={{ flexGrow: 1, flexShrink: 1 }}
            renderItem={(item, text) => <Text style={{ color: '#fff', padding: 15 }}>{item.title}</Text>}
            ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
            ClearIconComponent={<Feather name="x-circle" size={20} color="#fff" />}
            inputHeight={50}
            showChevron={true}
            />

            <AutocompleteDropdown
            ref={searchRef2}          
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            dataSet={cidades}
            onSelectItem={ item => SelecionaCidade(item) }
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
            onClear={onClearPress}
            loading={loading2}
            useFilter={true}
            textInputProps={{
              placeholder: 'Selecione a cidade',
              autoCorrect: false,
              autoCapitalize: 'none',
              placeholderTextColor: '#fff',
              style: {
                borderRadius: 15,
                backgroundColor: '#fd8900',
                color: '#fff',
                paddingLeft: 18,
                width: Dimensions.get('window').width*0.6
              },
            }}
            rightButtonsContainerStyle={{
              right: 8,
              height: 30,
              alignSelf: 'center',
            }}
            inputContainerStyle={{
              backgroundColor: '#fd8900',
              borderRadius: 25,
            }}
            suggestionsListContainerStyle={{ backgroundColor: '#fd8900' }}
            containerStyle={{ flexGrow: 1, flexShrink: 1 }}
            renderItem={(item, text) => <Text style={{ color: '#fff', padding: 15 }}>{item.title}</Text>}
            ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
            ClearIconComponent={<Feather name="x-circle" size={20} color="#fff" />}
            inputHeight={50}
            showChevron={true}
            />

          
            <SelectDropdown
              data={genero.map(item => {return item})}
              defaultButtonText="Selecione o sexo"              
              buttonStyle={styles.bordado}
              buttonTextStyle={{color: '#fff', fontWeight: 'bold'}}
              onSelect={(selectedItem, index) => {
                
                setSexo(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />

            <Text onPress={() =>  buscar()} style={styles.entrar}> Pesquisar</Text>
            </>
            }   
            {buscado === true && !parceiroEscolhido && <>
              <Text style={styles.titulo}>Despachantes na sua região</Text>
              <View style={{marginBottom:150}}>
             {mostrar}
             <Text onPress={() =>  limpa() } style={styles.bordado}> Pesquisar novamente</Text>
             </View>
             </>
            }   
           
            {buscado === true && despachantes === '' && <>

             <Text style={styles.titulo}> ** Não foi encontrado nenhum despachante ** </Text>
             <Text onPress={() =>  limpa()} style={styles.bordado}> Pesquisar novamente</Text>
            </>
            }

            {buscado === true && parceiroEscolhido !== '' && <>            
              {mostrar}
              <View style={{marginBottom:150}}>
                <Button onPress={() =>  limpa()} > Pesquisar novamente</Button>
              </View>
              </>
            }

            {avaliacao === true && <>
              {mostrar}
              </>
            }
           
          </ScrollView>
        </LinearGradient>
    </View>
)

}