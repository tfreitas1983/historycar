import React, {useRef, useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import SelectDropdown from 'react-native-select-dropdown';
import Button from '../../components/Button';
import ParceiroDataService from '../../services/parceiro';
import ParceiroPrecoDataService from '../../services/parceiropreco'
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
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
});

export default function Cacador  ({ navigation }) {

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
  const [cacadores, setCacadores]  = useState('');
  const [detalhesCacador, setDetalhesCacador] = useState('');
  const [parceiroEscolhido, setEscolhido] = useState('');

  const ufs = [
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
  { id: 'RJ', title: "Rio de Janeiro" },
  { id: 'RN', title: "Rio Grande do Norte" },
  { id: 'RS', title: "Rio Grande do Sul" },
  { id: 'RO', title: "Rondônia" },
  { id: 'RR', title: "Roraima" },
  { id: 'SC', title: "Santa Catarina" },
  { id: 'SP', title: "São Paulo" },
  { id: 'SE', title: "Sergipe" },
  { id: 'TO', title: "Tocantins" }];


  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
    setSexo('');
    setCidade('');
    setUfSelecionado('');
  }, [])

  const onClearPress2 = useCallback(() => {
    setSuggestionsList(null)
    setModelo([]);
    anos = [];    
    anoscombustivel = [];
    setAnoCombustivel('');
  }, [])

  const onClearPress3 = useCallback(() => {
    setSuggestionsList(null);
    idano = '';
    setAno('');
    anoscombustivel = '';
    setAnoCombustivel('');
    setIdAno('');
    setAnoSelecionado('');
  }, [])

  const onOpenSuggestionsList = useCallback(isOpened => {}, [])

  async function buscar () {
    setBuscado(true)
    await ParceiroDataService.busca(ufselecionado, cidade, sexo, 1)
    .then(response => {
      setCacadores(response.data);
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
      console.log('resp', resp);
      setLoading(false)
  }

  async function SelecionaCidade (item) {
    setCidade(item.title);
    console.log('cidade', cidade);
  }

  async function SelecionaParceiro (id) {
    mostrar = null;

    await ParceiroDataService.buscarUm(id)
    .then(resp => {
      console.log('parceiro',resp.data);
      setEscolhido(resp.data);
     // setCacadores(resp.data)
    })
    .catch(e => {
      console.error(e);
    })
    
    await ParceiroPrecoDataService.parceiro(id)
    .then(response => {
      console.log('preco',response.data);
      setDetalhesCacador(response.data);
    })
    .catch(e => {
      console.error(e);
    })

    setMostraDetalhes(true);
    
   
  }

  function limpa () {
    setBuscado(false);
    setCacadores('');
    setEscolhido('');
    setDetalhesCacador('');
    setMostraDetalhes(false);
    setUfSelecionado('');
    mostrar = null;
    mostradetalhes = null;
  }

  function handleSubmit() {
    
  }

  let mostraloading = null;
  if (loadingdados === true) {
    mostraloading = <View>
    <ActivityIndicator size="large" color="#fff" />
  </View>
  }

  let mostrar = null;
  let mostradetalhes = null;

  if (detalhesCacador ) {
    mostradetalhes = detalhesCacador.map(detalhe => {
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
        </View>
      )
    })
  }

  if (cacadores && buscado === true && !parceiroEscolhido) {
    mostrar = cacadores.map(item => {
      return (
        <>
        
        <View style={styles.toogle}>
          <Image
          source={require('../../img/parceiro.png')}
          style={styles.logo}
              resizeMode="cover"
          />
          <View >
              <Text style={styles.ordenar}> {item.nome} - {item.reputacao} </Text>              
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
          source={require('../../img/parceiro.png')}
          style={styles.logo}
              resizeMode="cover"
          />
          <View>
              <Text style={styles.ordenar}> {parceiroEscolhido.nome} - {parceiroEscolhido.reputacao} </Text>              
              <Text style={styles.item}> {parceiroEscolhido.celular} </Text>
              <Text style={styles.link} onPress={() => SelecionaParceiro(parceiroEscolhido.id)}> + detalhes </Text>
          </View>
        </View>
        {mostradetalhes}
        </>
      
  }
  


  

  return (


    <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
          <ScrollView>

            {buscado === false && <>

            
            <Text style={styles.titulo}> Deseja procurar um caçador de veículos? </Text>
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
              <Text style={styles.titulo}>Caçadores na sua região</Text>
              <View style={{marginBottom:150}}>
             {mostrar}
             <Text onPress={() =>  limpa() } style={styles.bordado}> Pesquisar novamente</Text>
             </View>
             </>
            }   
           
            {buscado === true && cacadores === '' && <>

             <Text style={styles.titulo}> ** Não foi encontrado nenhum caçador ** </Text>
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
           
          </ScrollView>
        </LinearGradient>
    </View>
)

}