import React, {useRef, useState, useEffect, useCallback}  from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView, Alert, Switch, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { dataMask } from '../../components/masks';
import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Input from '../../components/Input';
import Button from '../../components/Button';
import VeiculoDataService from '../../services/veiculo';
import Feather from 'react-native-vector-icons/Feather'
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
    let respcliente = await axios.get(`http://10.0.2.2:5099/api/clientes?userId=${userId}`)
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
  const [dados, setDados] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [avancado, setAvancado] = useState(false);
  const [fabricantes, setFabricantes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const dropdownController = useRef(null)
  const searchRef = useRef(null);
  const searchRef2 = useRef(null);
  const searchRef3 = useRef(null);
  const kmRef = useRef('');
  const chassiRef = useRef('');
  const aquisicaoRef = useRef('');
  const gnvRef = useRef('');

  const [renavam, setRenavam] = useState('');
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

    try{
      await  VeiculoDataService.buscarRenavam(renavam)
      .then( response  =>  {   
        setDados(response.data);    
        setBuscado(true);        
        carregaDados();
     })
    }
    catch (e){
     console.error(e);
    }     
  }

  function carregaDados () {
        if (dados) {
          setMarca(dados.fabricante)
          setModelo(dados.modelo)
        } else {
          Alert.alert('RENAVAM não encontrado! Insira os dados do veículo');
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
      dataaquisicao: aquisicao.replace('/','-').replace('/','-'),
      clienteId: cliente

    }

    console.log('data', data);
  }
  


  return (
    <View style={styles.container}>
      <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          <View>
            {buscado === true && <>
            <Text style={styles.titulo}>Renavam</Text>
            </>}
            
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
          {(buscado === false || !dados) && !fabricante &&
            <Button style={styles.buscar} onPress={() => buscar()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Buscar </Button>
          }
          {buscado === false && <View>
            <Text  style={styles.titulo}>Se o veículo já estiver cadastrado no aplicativo,
            você terá o histórico. Caso contrário você pode cadastrá-lo abaixo           
            </Text>
          </View>
          }
          
          {buscado === true && !dados && avancado === false && <>
          
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
              {avancado === true && buscado === true && <>
              
                <Input       
                keyboardType="default"         
                autoCorrect={false}
                autoCapitalize="none"
                style={{marginTop: 10, color: '#fff'}} 
                placeholder="Placa"
                returnKeyType="next"
                onSubmitEditing={() => kmRef.current.focus()}
                value={placa.toUpperCase()}
                onChangeText={setPlaca}
                style={{marginTop:30}} />

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

                <Input       
                keyboardType="number-pad"         
                autoCorrect={false}
                autoCapitalize="none"
                style={{marginTop: 10, color: '#fff'}} 
                ref={aquisicaoRef}
                placeholder="Data aquisição"
                returnKeyType="next"
                onSubmitEditing={() => gnvRef.current.focus()}
                value={dataMask(aquisicao)}
                onChangeText={setAquisicao} />
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