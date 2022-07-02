import React, {useRef, useState, useEffect, useCallback}  from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView, Alert, Switch, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MyDate from '../../components/datepicker';
import CadastroClienteDataService from '../../services/cadastrocliente';
import VeiculoDataService from '../../services/veiculo';
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont()

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Open Sans',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  }, 
  titulo: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom:5,
    color:'#fff',
    fontSize: 20,
    padding: 5,
    textAlign: 'left',
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
  erro: {
    fontFamily: 'Open Sans',
    color: '#fff',
    backgroundColor: '#ef2000',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#fc2000',
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
    marginBottom: 80,
    padding: 5,
    textAlign: 'center'
  },
  buscar:{
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#f2f2f2',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    fontSize: 40,
    marginTop: 10,
    width: Dimensions.get('window').width
  },
  toggle: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    fontFamily: 'Open Sans',
    color: '#fafafa',
    fontSize: 25,
    fontWeight: 'bold', 
    alignItems:'center'
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
    padding: 5,
    textAlign: 'left',
    width: Dimensions.get('window').width,
    height: 200
  }
});

export default function CadastrarVeiculos  ({ navigation }) {

  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.id);

  useEffect( () => { 
    async function PegaMarcas () {
      try{
      let api = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas`) 
        .then( response  =>  {               
           setFabricantes(response.data); 
        })
        api = await api;
      }
      catch (e){
        console.error(e);
      }     
    }   
    PegaMarcas();  
    PegaCliente(); 
    
  }, [])

  async function PegaCliente () {
    console.log('userid', userId);
    let respcliente = await CadastroClienteDataService.buscarusuario(userId)
    .then( response => {
      let temp = response.data.map( item => { return item.id})
      console.log('temp', temp[0]);
      setCliente(temp[0])      
    })    
    .catch( e =>  {
      console.error(e);
    })

    respcliente = await respcliente;
    console.log('cliente', cliente);
  }

  const [cliente, setCliente] = useState('');
  const [dados, setDados] = useState('');
  const [loadingdados, setLoadingDados] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const [avancado, setAvancado] = useState(false);
  const [fabricantes, setFabricantes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState(null)
  const searchRef = useRef(null);
  const searchRef2 = useRef(null);
  const searchRef3 = useRef(null);
  const kmRef = useRef('');
  const chassiRef = useRef('');
  const aquisicaoRef = useRef('');
  const gnvRef = useRef('');

  const [renavam, setRenavam] = useState('332838594');
  const [fabricante, setFabricante] = useState([]);
  const [modelo, setModelo] = useState([]);
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [marca, setMarca] = useState([]);
  const [idModeloapi, setIdModeloApi] = useState('');
  const [ano, setAno] = useState([]);
  const [combustivel, setCombustivel] = useState('');
  const [anocombustivel, setAnoCombustivel] = useState([]);
  const [idAno, setIdAno] = useState('');
  const [anoSelecionado,setAnoSelecionado] = useState('');
  const [aquisicao, setAquisicao] = useState('');
  const [placa, setPlaca] = useState('');
  const [km, setKm] = useState('');
  const [chassi, setChassi] = useState('');
  const [gnv, setGnv] = useState('');
  const [message, setMessage] = useState('');
  let idMarca = null;  
  let idModelo = null;
  let idano = null;
  let modelos = {};
  let anos = [];
  let anoscombustivel = [];
  

  const marcas = [{"id": "1", "title": "Acura"}, {"id": "2", "title": "Agrale"}, {"id": "3", "title": "Alfa Romeo"}, {"id": "4", "title": "AM Gen"}, {"id": "5", "title": "Asia Motors"}, {"id": "189", "title": "ASTON MARTIN"}, {"id": "6", "title": "Audi"}, {"id": "207", "title": "Baby"}, {"id": "7", "title": "BMW"}, {"id": "8", "title": "BRM"}, {"id": "123", "title": "Bugre"}, {"id": "238", "title": "BYD"}, {"id": "236", "title": "CAB Motors"}, {"id": "10", "title": "Cadillac"}, {"id": "161", "title": "Caoa Chery"}, {"id": "11", "title": "CBT Jipe"}, {"id": "136", "title": "CHANA"}, {"id": "182", "title": "CHANGAN"}, {"id": "12", "title": "Chrysler"}, {"id": "13", "title": "Citroën"}, {"id": "14", "title": "Cross Lander"}, {"id": "15", "title": "Daewoo"}, {"id": "16", "title": "Daihatsu"}, {"id": "17", "title": "Dodge"}, {"id": "147", "title": "EFFA"}, {"id": "18", "title": "Engesa"}, {"id": "19", "title": "Envemo"}, {"id": "20", "title": "Ferrari"}, {"id": "21", "title": "Fiat"}, {"id": "149", "title": "Fibravan"}, {"id": "22", "title": "Ford"}, {"id": "190", "title": "FOTON"}, {"id": "170", "title": "Fyber"}, {"id": "199", "title": "GEELY"}, {"id": "23", "title": "GM - Chevrolet"}, {"id": "153", "title": "GREAT WALL"}, {"id": "24", "title": "Gurgel"}, {"id": "152", "title": "HAFEI"}, {"id": "214", "title": "HITECH ELECTRIC"}, {"id": "25", "title": "Honda"}, {"id": "26", "title": "Hyundai"}, {"id": "27", "title": "Isuzu"}, {"id": "208", "title": "IVECO"}, {"id": "177", "title": "JAC"}, {"id": "28", "title": "Jaguar"}, {"id": "29", "title": "Jeep"}, {"id": "154", "title": "JINBEI"}, {"id": "30", "title": "JPX"}, {"id": "31", "title": "Kia Motors"}, {"id": "32", "title": "Lada"}, {"id": "171", "title": "LAMBORGHINI"}, {"id": "33", "title": "Land Rover"}, {"id": "34", "title": "Lexus"}, {"id": "168", "title": "LIFAN"}, {"id": "127", "title": "LOBINI"}, {"id": "35", "title": "Lotus"}, {"id": "140", "title": "Mahindra"}, {"id": "36", "title": "Maserati"}, {"id": "37", "title": "Matra"}, {"id": "38", "title": "Mazda"}, {"id": "211", "title": "Mclaren"}, {"id": "39", "title": "Mercedes-Benz"}, {"id": "40", "title": "Mercury"}, {"id": "167", "title": "MG"}, {"id": "156", "title": "MINI"}, {"id": "41", "title": "Mitsubishi"}, {"id": "42", "title": "Miura"}, {"id": "43", "title": "Nissan"}, {"id": "44", "title": "Peugeot"}, {"id": "45", "title": "Plymouth"}, {"id": "46", "title": "Pontiac"}, {"id": "47", "title": "Porsche"}, {"id": "185", "title": "RAM"}, {"id": "186", "title": "RELY"}, {"id": "48", "title": "Renault"}, {"id": "195", "title": "Rolls-Royce"}, {"id": "49", "title": "Rover"}, {"id": "50", "title": "Saab"}, {"id": "51", "title": "Saturn"}, {"id": "52", "title": "Seat"}, {"id": "183", "title": "SHINERAY"}, {"id": "157", "title": "smart"}, {"id": "125", "title": "SSANGYONG"}, {"id": "54", "title": "Subaru"}, {"id": "55", "title": "Suzuki"}, {"id": "165", "title": "TAC"}, {"id": "56", "title": "Toyota"}, {"id": "57", "title": "Troller"}, {"id": "58", "title": "Volvo"}, {"id": "59", "title": "VW - VolksWagen"}, {"id": "163", "title": "Wake"}, {"id": "120", "title": "Walk"}];
  
  async function PegaModelos (item) {
    idMarca = null;
    if (item.id) { 
      modelos = null;
      setLoading(true)
    } else {      
      idMarca = null;
      modelos = null;
    }

    setTimeout(() => {
      idMarca = item.id;  
      setFabricante(item.title);  
    }, 1000);

    if (idMarca) {
      setMarca(idMarca);
     
      let resp2 = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos`) 
      .then( response  =>  {                       
        modelos = response.data;
      })    
      .catch(e => {
      console.error(e);
      })   
      resp2 = await resp2;
      
      if (modelos) {
        setLoading(false)
        setLoading2(true);
        setModelo(modelos.modelos.map(itens =>  {  
          return {           
          id: ''+itens.codigo+'',
          title: itens.nome
        }})); 
        setLoading2(false);
      } 

    } else {
      idMarca = item.id;
      setMarca(idMarca);
      setFabricante(item.title);
      let resp2 = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos`) 
      .then( response  =>  {                       
        modelos = response.data;
      })    
      .catch(e => {
      console.error(e);
      })   
      resp2 = await resp2;
      
      if (modelos) {
        setLoading(false)
        setLoading2(true);
        setModelo(modelos.modelos.map(itens =>  {  
           return {           
           id: ''+itens.codigo+'',
           title: itens.nome
         }})); 
         setLoading2(false);

         setAnos(modelo.map(itens =>  {  
          return {           
          id: ''+itens.codigo+'',
          title: itens.nome
        }})); 
      }
    }    
  }

  async function PegaModelo(itens) {
    setIdAno('');
    idModelo = '';

    if (itens.id) {

      setTimeout(() => {
        idModelo = itens.id;  
        setModeloSelecionado(itens.title);     
        setIdModeloApi(idModelo);
      }, 500);

      if (idModelo) {
        setLoading3(true);
     
        let resp3 = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${idModelo}/anos`) 
        .then( response  =>  { anos = response.data; })
        .catch(e => { console.error(e); })   
        resp3 = await resp3;

        anoscombustivel = anos.map( itens =>  { return { id: ''+itens.codigo+'', title: itens.nome }});  
     
        setAnoCombustivel(anoscombustivel);
        setLoading3(false);

      } else {
        setLoading3(true);
        idModelo = itens.id;
        setModeloSelecionado(itens.title); 
        setIdModeloApi(idModelo);     

        let resp3 = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${idModelo}/anos`) 
        .then( response  =>  { anos = response.data; })    
        .catch(e => { console.error(e); })   
        resp3 = await resp3;

        anoscombustivel = anos.map(itens =>  {  return { id: ''+itens.codigo+'', title: itens.nome }});  
        
        setAnoCombustivel(anoscombustivel);
        setLoading3(false);
      }
    }  else {
      setLoading3(true);
      idModelo = itens.id;
      setModeloSelecionado(itens.title);      
      setIdModeloApi(idModelo);

      let resp3 = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${idModelo}/anos`) 
      .then( response  =>  { anos = response.data; })    
      .catch(e => { console.error(e); })   
      resp3 = await resp3;
      
      anoscombustivel = anos.map(itens =>  {  return { id: ''+itens.codigo+'', title: itens.nome }}); 

      setAnoCombustivel(anoscombustivel);
      setLoading3(false);
    }
  }

  async function PegaAno (item) {
    idano = item.id;
    let comb = item.title.replace(/[0-9]/g, '');
    let anosubst = item.title.substr(0,4);
    setCombustivel(comb);
    setIdAno(idano);
    setAnoSelecionado(anosubst);
 }
 

  async function buscar () {

   
      await  VeiculoDataService.buscarRenavam(renavam)
      .then( response  =>  {  
        setLoadingDados(true) ;
        if (response.data) {
          let tempdados = response.data;
          console.log('tempdados', tempdados);
          setDados(tempdados);
          carregaDados();
        } else {
          Alert.alert('RENAVAM não encontrado')
        }  
      })
      .catch (e => {
      console.error(e);
      });
               
      setBuscado(true);           
      setLoadingDados(false);
  
    
  }

  async function carregaDados () {
    if (dados) {
      console.log('dados', dados);
      setLoadingDados(true);
      let placatemp = await dados.veiculos_placas.map(item => { return item.placa });

      Alert.alert('Dados')
      setFabricante(dados.fabricante);
      setMarca(dados.idfabricante);
      setModelo(dados.modelo);   
      setIdModeloApi(dados.idmodelo);
      setAnoSelecionado(dados.ano);
      setIdAno(dados.idano);
      setPlaca(placatemp[0] );
      setChassi(dados.chassi);
      setGnv(dados.gnv);
      setLoadingDados(false);
    } else {
    }
  }

  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
    idMarca = null;
    modelos = [];
    setModelo([]);
    anos = [];
    anoscombustivel = [];
    setAnoCombustivel('');
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

  
 
  async function handleSubmit () {

    
    if (!dados) {
      var data = {

        fabricante: fabricante,
        idfabricante: marca,
        modelo: modeloSelecionado ,
        idmodelo: idModeloapi,
        ano: anoSelecionado,
        idano: idAno,
        combustivel: combustivel,
        gnv: gnv,
        situacao: 1,
        placa: placa,
        kmaquisicao: km,
        chassi: chassi,
        renavam: renavam,
        dataaquisicao: aquisicao,
        clienteId: cliente        
      }

      await VeiculoDataService.cadastrar(data)
      .then(response => {
        console.log('cadastro', response.data)
        setMessage(response.data)
      })
      .catch(e => {
        console.error(e)
      })  

    } else {
      var data = {

        fabricante: dados.fabricante,
        idfabricante: dados.idfabricante,
        modelo: dados.modelo ,
        idmodelo: dados.idmodelo,
        ano: dados.ano,
        idano: dados.idAno,
        combustivel: dados.combustivel,
        gnv: dados.gnv,
        situacao: 1,
        placa: dados.veiculos_placas[0].placa,
        kmaquisicao: km,
        chassi: dados.chassi,
        renavam: dados.renavam,
        dataaquisicao: aquisicao,
        clienteId: cliente  
      }

      await VeiculoDataService.novocliente(dados.id, data)
      .then(response => {
        console.log('novocliente', response.data)
        setMessage(response.data);
        Alert.alert(message);
      })
      .catch(e => {
        console.error(e)
      })  
    }

   

    console.log('data', data);
  }


  let mostraloading = null;
  if (loadingdados === true) {
    mostraloading = <View>
    <ActivityIndicator size="large" color="#fff" />
  </View>
  }
  


  return (
    <View style={styles.container}>
      <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          
           
         
          <View>
            {mostraloading}
            {buscado === true && <>
            <Text style={styles.titulo}>Renavam</Text>
            </>
            }

                        
            <Input       
            keyboardType="number-pad"         
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            placeholder="RENAVAM"
            returnKeyType="next"
            onSubmitEditing={() => buscar()}
            value={renavam}
            onChangeText={setRenavam}
            maxLength={11}
            />              
            
          </View>

          { (buscado === false || !dados) && avancado === false &&
            <Button style={styles.buscar} onPress={() => buscar()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Buscar </Button>
          }

          {buscado === false && <View>
            <Text  style={styles.titulo}>Se o veículo já estiver cadastrado no aplicativo,
            você terá o histórico. Caso contrário você pode cadastrá-lo a seguir           
            </Text>
          </View>
          }

          
          
          {buscado === true && dados.length === 0 && avancado === false && <>
          
            <Text style={{marginTop:10, marginBottom: 10,color: '#fff', fontSize: 18, backgroundColor: 'transparent'}}> Marcas</Text>
          
            <AutocompleteDropdown
            ref={searchRef}          
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            dataSet={marcas}
            onSelectItem={ item => PegaModelos(item) }
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
            onClear={onClearPress}
            loading={loading}
            useFilter={true}
            textInputProps={{
              placeholder: 'Digite 3 ou mais caracteres',
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

            <Text style={{marginTop:55, marginBottom: 10,color: '#fff', fontSize: 18, backgroundColor: 'transparent'}}> Modelos</Text>
            <AutocompleteDropdown
            ref={searchRef2}          
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            dataSet={modelo}
            onSelectItem={ itens => PegaModelo(itens) }
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
            onClear={onClearPress2}
            loading={loading2}
            useFilter={true}
            textInputProps={{
              placeholder: 'Digite 3 ou mais caracteres',
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

            <Text style={{marginTop:55, marginBottom: 10,color: '#fff', fontSize: 18, backgroundColor: 'transparent'}}> Anos</Text>
            <AutocompleteDropdown
            ref={searchRef3}          
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            dataSet={anocombustivel}
            onSelectItem={ item => PegaAno(item) }
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
            onClear={onClearPress3}
            loading={loading3}
            useFilter={false}
            textInputProps={{
              placeholder: 'Digite 3 ou mais caracteres',
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
            containerStyle={{ flexGrow: 1, flexShrink: 1, marginBottom: 30 }}
            renderItem={(item, text) => <Text style={{ color: '#fff', padding: 15 }}>{item.title}</Text>}
            ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
            ClearIconComponent={<Feather name="x-circle" size={20} color="#fff" />}
            inputHeight={50}
            showChevron={true}
            />

            <Button style={styles.buscar} onPress={() => setAvancado(true)}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Avançar </Button>
    
          </>
          }
          
          <ScrollView > 
            <View style={styles.container}>

              {buscado === true && dados !== '' && avancado === false && <View>
                <View style={styles.opcoes} >
                  <Text style={styles.title}>Marca: {dados.fabricante}</Text>
                  
                </View>
                <View style={styles.opcoes} >
                  <Text style={styles.title}>Modelo: {dados.modelo}</Text>
                </View>
                <View style={styles.opcoes} >
                  <Text style={styles.title}>Ano: {dados.ano}</Text>
                </View>
                <View style={styles.opcoes} >
                  <Text style={styles.title}>GNV: {dados.gnv === true ? 'Sim' : 'Não'}</Text>
                </View>
                <View style={styles.opcoes} >
                  <Text style={styles.title}>Chassi: {dados.chassi}</Text>
                </View>
                <Button style={styles.buscar} onPress={() => setAvancado(true)}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Avançar </Button>
              </View>  
              }

              {buscado === true && avancado === true && dados !== '' && <>
                <Input       
                keyboardType="default"         
                autoCorrect={false}
                autoCapitalize="none"
                style={{marginTop: 10, color: '#fff'}} 
                placeholder="Placa"
                returnKeyType="next"
                onSubmitEditing={() => kmRef.current.focus()}
                value={dados.veiculos_placas[0].placa}
                onChangeText={setPlaca} />

                <Input       
                keyboardType="number-pad"         
                autoCorrect={false}
                autoCapitalize="none"
                style={{marginTop: 10, color: '#fff'}} 
                ref={kmRef}
                placeholder="KM atual"
                returnKeyType="next"
                onSubmitEditing={() => gnvRef.current.focus()}
                value={km}
                onChangeText={setKm} />

                <Text style={styles.titulo}> Data aquisição </Text>  
                <MyDate onSetDate={date => { setAquisicao(date); }} /> 

                <View style={styles.toggle}>

                  <Text  style={styles.titulo} > GNV   <Switch  value={gnv} ref={gnvRef} onValueChange={setGnv} /> </Text>
                </View>
                <View>
                {message !== '' && <View> 
                  <Text style={styles.erro}> Veículo ainda ativo com outro proprietário. Envie a foto do CRLV para nosso suporte. </Text>
                </View> 
                }                  
                </View>
                <Button  onPress={() => handleSubmit()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Salvar </Button>


              </>
              }

              {buscado === true && avancado === true && dados.length === 0 && <>
              
                <Input       
                keyboardType="default"         
                autoCorrect={false}
                autoCapitalize="none"
                style={{marginTop: 10, color: '#fff'}} 
                placeholder="Placa"
                returnKeyType="next"
                onSubmitEditing={() => kmRef.current.focus()}
                value={placa.toUpperCase()}
                onChangeText={setPlaca} />

                <Input       
                keyboardType="number-pad"         
                autoCorrect={false}
                autoCapitalize="none"
                style={{marginTop: 10, color: '#fff'}} 
                ref={kmRef}
                placeholder="KM atual"
                returnKeyType="next"
                onSubmitEditing={() => chassiRef.current.focus()}
                value={km}
                onChangeText={setKm} />

                <Input       
                keyboardType="default"         
                autoCorrect={false}
                autoCapitalize="none"
                style={{marginTop: 10, color: '#fff'}} 
                ref={chassiRef}
                placeholder="Chassi"
                returnKeyType="next"
                onSubmitEditing={() => aquisicaoRef.current.focus()}
                value={chassi.toUpperCase()}
                onChangeText={setChassi} />

                
              <Text style={styles.titulo}> Data aquisição </Text>  
              <MyDate onSetDate={date => { setAquisicao(date); }} /> 

                <View style={styles.toggle}>

                  <Text  style={styles.titulo} > GNV   <Switch  value={gnv} ref={gnvRef} onValueChange={setGnv} /> </Text>
                </View>
                <Button  onPress={() => handleSubmit()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Salvar </Button>
                </>          
              }
            </View>
            
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  )
}