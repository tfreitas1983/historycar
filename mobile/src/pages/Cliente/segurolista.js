import React, {useState, useEffect} from 'react';

import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from "react-redux";
import axios from 'axios';
import moment from 'moment'

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

export default function SeguroLista  ({ navigation }) {

  const id = useSelector(state => state.veiculo.id);
  const [dados, setDados] = useState('');


  useEffect( () => { 
    async function SegurosClientes () {
      try{
      let resp = await axios.get(`http://10.0.2.2:5099/api/veiculosseguros?veiculo=${id}`) 
        .then( response  =>  {               
           setDados(response.data.map(item => ({ ...item}) )); 
        })
        resp = await resp//map(item => ({...item})) 
      }
      catch (e){
        console.error(e);
      }     
    }   
    SegurosClientes();   
    
  }, [])

  console.log('seguros', dados)

  lista = null;

  if (dados) {
    lista = dados.map((item, index) => {
      if (item.seguradora) {
        return (
          <View style={styles.toogle}>
            <Text style={styles.titulo} key={item.id} onPress={() => navigation.navigate('SeguroDetalhe')}>{item.seguradora.descricao} - {moment(item.vigenciafim).format('DD/MM/YYYY')}</Text>
            <Text style={styles.titulo} key={item.id+'a'} onPress={() => navigation.navigate('SeguroDetalhe')} > <Entypo name="text-document" size={30} /> </Text>
          </View>
        )
      }
    })
  }

  if (dados !== "") {
    return (
      <View>
          <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
          <ScrollView>
             <Text style={styles.titulo}> {dados[0].veiculo.modelodescricao} </Text>
              {lista}
              <Text onPress={() => navigation.navigate('Seguro')} style={styles.entrar}> <Entypo name="level-down" size={30} /> Novo Seguro</Text>
          </ScrollView>
          </LinearGradient>
      </View>
    )
  } else {
    return (
      <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
          <ScrollView>
            <Text onPress={() => navigation.navigate('Seguro')} style={styles.entrar}> <Entypo name="level-down" size={30} /> Novo Seguro</Text>
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
  
}