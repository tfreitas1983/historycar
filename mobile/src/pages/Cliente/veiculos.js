import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import CadastroClienteDataService from '../../services/cadastrocliente';
import VeiculoDataService from '../../services/veiculo';
import {pegaVeiculo} from '../../store/modules/veiculos/actions';
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
    fontSize: 20,
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
    marginTop: 10,
    padding:8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    width: Dimensions.get('window').width,
  },
  inativo: {      
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    fontFamily: 'Open Sans',
    backgroundColor: '#aaaaaa',
    color: '#b2b2b2',
    fontSize: 25,
    fontWeight: 'bold',       
    marginTop: 10,
    padding:8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#909090',
    width: Dimensions.get('window').width,
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

export default function Veiculos  ({ navigation }) {

  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.id);
  
  const [veiculos, setVeiculos] = useState([]);
  let cliente = null;
  const [loading, setLoading] = useState(false);
  

   useEffect( () => {   
      PegaCliente();
                
  }, []);      

  async function PegaCliente () {
   
    let respcliente = await CadastroClienteDataService.buscarusuario(userId)
    .then( response => {       
      temp = response.data.map(item =>  {return item.id});          
    })
    .catch( e => {
      console.error(e);
    })     
    respcliente = await respcliente;   
    
    let idcliente = temp[0];
    
    cliente = idcliente;      
            
    pegaVeiculos();
  }

  async function pegaVeiculos () {
     

    if (cliente) {
      setLoading(true);
      let resp = await VeiculoDataService.buscaveiculocliente(cliente)
      .then(response => {            
          setVeiculos(response.data.map((item => ({id: item.id, situacao: item.situacao, veiculo:item.veiculo}))));
      })
      .catch(e => {
        console.error(e);
      })
  
      resp = await resp; 
      setLoading(false)  
    } else {
      setLoading(true);

      let respcliente = await CadastroClienteDataService.buscarusuario(userId)
      .then( response => {       
        temp = response.data.map(item =>  {return item.id});          
      })
      .catch( e => {
        console.error(e);
      })     
      respcliente = await respcliente;   
      
      let idcliente = temp[0];      
      cliente = idcliente;  

      let resp = await VeiculoDataService.buscaveiculocliente(cliente)
      .then(response => {            
          setVeiculos(response.data.map((item => ({id: item.id, situacao: item.situacao, veiculo:item.veiculo}))));
      })
      .catch(e => {
        console.error(e);
      })
  
      resp = await resp; 
      setLoading(false)
    }
  
  }

  let lista = null;
  let inativos = null;

  if (loading == true) {
    lista = <View>
      <ActivityIndicator size="large" color="#fff" />
    </View>

  }

  if (veiculos && loading == false) {
      lista = veiculos.map((item, index) => {
        if (item.situacao === true) {
        return (
          <View>
            <Text style={styles.titulo}>Veículos ativos</Text>
            <View style={styles.toogle} >
              
              <Text style={styles.titulo} key={index} onPress={() => Detalhes(item.id)}>  {item.veiculo.modelo} - {item.veiculo.ano} </Text> 
              <Text style={styles.titulo} key={item.id+'a'} onPress={() => navigation.navigate('Detalhes')} > <Entypo name="text-document" size={30} /> </Text>
            </View>
          </View>
        )} else{
          return (
            <View>
              <Text style={styles.titulo}>Veículos com baixa</Text>
              <View style={styles.inativo}>
                <Text style={styles.titulo} key={index+'b'} onPress={() => Detalhes(item.id)}>  {item.veiculo.modelo} - {item.veiculo.ano} </Text> 
                <Text style={styles.titulo} key={item.id+'bx'} onPress={() => Detalhes(item.id)} > <Entypo name="text-document" size={30} /> </Text>
              </View>
            </View>
            )
        }
      })}   

        
    function Detalhes (id) {
     dispatch(pegaVeiculo(id));
     navigation.navigate('Detalhes')
    }
    
  
  return (
    <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <ScrollView>           
            
              {lista}
              {inativos}

            <Text onPress={() => navigation.navigate('CadastrarVeiculos')} style={styles.entrar}> <Entypo name="level-down" size={30} /> Novo veículo</Text>
        </ScrollView>
        </LinearGradient>
    </View>
)}