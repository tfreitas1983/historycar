import React, {useRef, useState, useEffect}  from 'react';
import {Text, View, StyleSheet, Dimensions, StatusBar, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { dataMask } from '../../components/masks';
import axios from 'axios';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import Input from '../../components/Input';
import Button from '../../components/Button';
import VeiculoDataService from '../../services/veiculo';

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
    padding: 5,
    textAlign: 'left',
    width: Dimensions.get('window').width,
    height: 200
  },
});

export default function CadastrarParceiro  ({ navigation }) {

  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [dados, setDados] = useState([]);

  const [renavam, setRenavam] = useState('');
  const [marca, setMarca] = useState('');
  const [idMarca, setIdMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [idModelo, setIdModelo] = useState('');
  const [ano, setAno] = useState([]);
  const [idAno, setIdAno] = useState('');
  const [aquisicao, setAquisicao] = useState('');
  const [km, setKm] = useState('');
  const [chassi, setChassi] = useState('');


  useEffect( () => { 
    async function PegaMarcas () {
      try{
      let resp = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas') 
        .then( response  =>  {               
           setMarcas(response.data); 
        })
        resp = await resp//map(item => ({...item})) 
      }
      catch (e){
        console.error(e);
      }     
    }   
    PegaMarcas();   
    
  }, [])

  console.log('marcas', marcas)

  async function buscar () {

    try{
      await  VeiculoDataService.buscarRenavam(renavam)
      .then( response  =>  {               
        setDados(response.data.map(item => ({ ...item}) )); 
     })
    }
    catch (e){
     console.error(e);
    }     
  }

  async function handleSubmit () {
  }
  


  return (
    <View>
      <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
      <ScrollView>
          <Text style={styles.opcoes}> RENAVAM</Text>
          
          <Button style={styles.buscar} onPress={() => buscar()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Salvar </Button>
          <Text  style={styles.titulo}>Se o veículo já estiver cadastrado no aplicativo, você terá o histórico.</Text>
          <Text  style={styles.titulo}> Caso contrário você pode cadastrá-lo abaixo</Text>
          <Text style={styles.opcoes}> Chevrolet</Text>
          <Text style={styles.opcoes}> Celta VHC 1.4</Text>
          <Text style={styles.opcoes}> 2008 Gasolina</Text>
          <Text style={styles.opcoes}> Placa</Text>
          <Text style={styles.opcoes}> Km atual</Text>
          <Text style={styles.opcoes}> Data aquisição</Text>
          
          <Button style={{marginBottom: 150}} onPress={() => handleSubmit()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Salvar </Button>
      </ScrollView>
      </LinearGradient>
    </View>
  )
}