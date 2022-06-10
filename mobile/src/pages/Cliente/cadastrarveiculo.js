import React, {useRef, useState, useEffect, useCallback}  from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView, Alert, Switch, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { dataMask } from '../../components/masks';
import axios from 'axios';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
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
  titulo: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom:5,
    color:'#fff',
    fontSize: 15,
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
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    fontSize: 40,
    marginTop: 20,
    padding: 5,
    textAlign: 'center'
  },
  toggle: {      
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
    padding: 5,
    textAlign: 'left',
    width: Dimensions.get('window').width,
    height: 200
  },
});

export default function CadastrarVeiculos  ({ navigation }) {

  const [marcas, setMarcas] = useState(null);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [dados, setDados] = useState([]);

  const [loading, setLoading] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const dropdownController = useRef(null)
  const searchRef = useRef(null);
  const kmRef = useRef('');
  const chassiRef = useRef('');
  const aquisicaoRef = useRef('');
  const gnvRef = useRef('');

  const [renavam, setRenavam] = useState('');
  const [marca, setMarca] = useState('');
  const [idMarca, setIdMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [idModelo, setIdModelo] = useState('');
  const [ano, setAno] = useState([]);
  const [idAno, setIdAno] = useState('');
  const [aquisicao, setAquisicao] = useState('');
  const [placa, setPlaca] = useState('');
  const [km, setKm] = useState('');
  const [chassi, setChassi] = useState('');
  const [gnv, setGnv] = useState('');

  //let marcas = null;
  let resp = null;
  useEffect( () => { 
    async function PegaMarcas () {
      try {
       resp = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas') 
        .then( response  =>  {                       
          setMarcas(response.data.map(item => ( {             
            id: item.codigo,
            title: item.nome,
          })))           
        })
      }
      catch (e){
        console.error(e);
      }     
    }   


    PegaMarcas(); 

    if (marcas) {
      console.log('resp', resp + ' ' + moment().format())
      console.log('marcas', marcas)
      } else {
        Alert.alert("Sem resposta da tabela FIPE")
      }
    
  }, [])

 

 console.log(idMarca)
 

  async function buscar () {

    try{
      await  VeiculoDataService.buscarRenavam(renavam)
      .then( response  =>  {   
        setDados(response.data)            
        carregaDados();
     })
    }
    catch (e){
     console.error(e);
    }     
  }

  function carregaDados () {
   //.map(item => ({ ...item}) )); 
        if (dados) {
          setMarca(dados.fabricante)
          setModelo(dados.modelo)
          console.log('dados', dados)
          console.log('marcarenavam', marca)
        } else {
          Alert.alert('RENAVAM não encontrado! Insira os dados do veículo');
        }
  }

  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase()
    console.log('getSuggestions', q)
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null)
      return
    }
    setLoading(true)
   // const response = marcas;
   // const items = await response.json()
    const suggestions = marcas;
    setSuggestionsList(suggestions)
    setLoading(false)
  }, [])

  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
  }, [])

  const onOpenSuggestionsList = useCallback(isOpened => {}, [])
  
 /*let mostrar = null;
  if (marcas) {
   mostrar = <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={true}
            closeOnSubmit={false}
            initialValue={{ id: 2 }} // or just '2'
            onSelectItem={setSelectedItem}
            dataSet={marcas}
          />
  } */

  async function handleSubmit () {
  }
  


  return (
    <View>
      <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
        <ScrollView>
          <Input       
          keyboardType="number-pad"         
          autoCorrect={false}
          autoCapitalize="none"
          style={{marginTop: 10, color: '#fff'}} 
          placeholder="RENAVAM"
          returnKeyType="next"
          onSubmitEditing={() => buscar()}
          value={renavam}
          onChangeText={setRenavam} />
            
          <Button style={styles.buscar} onPress={() => buscar()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Buscar </Button>
          <Text  style={styles.titulo}>Se o veículo já estiver cadastrado no aplicativo,
           você terá o histórico. Caso contrário você pode cadastrá-lo abaixo
          </Text>
          

          <AutocompleteDropdown
          ref={searchRef}
          controller={controller => {
            dropdownController.current = controller
          }}
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          initialValue={{ id: '1' }}
          dataSet={marcas}
          onSelectItem={item => {item && setIdMarca(item.id)}}
          textInputProps={{
            placeholder: 'Digite mais de 3 caracteres',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 15,
              backgroundColor: '#fd8900',
              color: '#fefefe',
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

          <Text style={styles.toggle}> GNV   <Switch value={gnv} ref={gnvRef} onValueChange={setGnv} /> </Text>
            
          <Button style={{marginBottom: 150}} onPress={() => handleSubmit()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Salvar </Button>
        </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  )
}