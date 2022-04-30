import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

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

  //const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.id);
  
  const [veiculos, setVeiculos] = useState([]);
 // const [vinculo, setVinculo] = useState([]);
  const [cliente, setCliente] = useState('');
  let clienteId = null

  useEffect( () => { 
    axios.get(`http://10.0.2.2:5099/api/clientes?user=${userId}`)
         .then(async  response => {            
             setCliente(response.data.map(item => ({clienteId: item.id})));               
             await  pegaVeiculos();
         }); 
  }, []); 
   
    

    function pegaVeiculos () {
      if (cliente) { 
        clienteId = cliente.map(item => {return item.clienteId}).pop();
      }      
      
      axios.get('http://10.0.2.2:5099/api/veiculosclientes?cliente='+clienteId)
         .then(response => {            
             setVeiculos(response.data.map((item => ({id: item.id, situacao: item.situacao, veiculo:item.veiculo}))))
            // setVinculo(response.data.map(dados => ({id: dados.id, situacao: dados.situacao})));
             console.log('veiculo', veiculos)
         });  
    }

    let lista = null
    let inativos = null


    if (veiculos) {
       lista = veiculos.map((item, index) => {
          if (item.situacao === true) {
          return (
            <View style={styles.toogle} onPress={() => navigation.navigate('Detalhes')}>
              <Text style={styles.titulo} key={index} onPress={() => navigation.navigate('Detalhes')}>  {item.veiculo.modelodescricao} </Text> 
              <Text style={styles.titulo} key={item.id} onPress={() => navigation.navigate('Detalhes')} > <Entypo name="text-document" size={30} /> </Text>
            </View>
          )} else{
            return (
              <View>
                <Text style={styles.titulo}>Veículos com baixa</Text>
                <View style={styles.toogle} onPress={() => navigation.navigate('Detalhes')}>
                  <Text style={styles.titulo} key={index} onPress={() => navigation.navigate('Detalhes')}>  {item.veiculo.modelodescricao} </Text> 
                  <Text style={styles.titulo} key={item.id} onPress={() => navigation.navigate('Detalhes')} > <Entypo name="text-document" size={30} /> </Text>
                </View>
              </View>
              )
          }
        })}       

      
  
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