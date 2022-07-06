import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from "react-redux";
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
    marginBottom:15,
    color:'#fff',
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
    borderBottomColor: '#f2f2f2',
    
  },
  item: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom:5,
    color:'#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  entrar:{
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#f2f2f2',
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    fontSize: 30,
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

export default function Detalhes ({navigation}){
  
  const id = useSelector(state => state.veiculo.id);
  const [dados, setDados] = useState('');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('veiculoId', id);

  useEffect( () => { 
    async function VeiculosClientes () {
      try{
      let resp = await axios.get(`http://10.0.2.2:5099/api/veiculosclientes/${id}`) 
        .then( response  =>  {               
           setDados(response.data);
        })
        resp = await resp;
      }
      catch (e){
        console.error(e);
      }    
     
    }   
    VeiculosClientes(); 
    PegaValor();
    
  }, [])

  console.log('dados', dados);

  async function PegaValor() {

    

    if (dados) {
      setLoading(true);
      console.log('fabricante', dados.veiculo.idfabricante.toString());
      console.log('modelo', dados.veiculo.idmodelo);
      console.log('ano', dados.veiculo.idano);
   
      
      await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas/'+dados.veiculo.idfabricante+'/modelos/'+dados.veiculo.idmodelo+'/anos/'+dados.veiculo.idano)
      .then(response => {
        let temp = response.data;
        console.log('temp', temp);
        setValor(temp);

        setLoading(false)
      })
      .catch(e => {
        console.error(e);
      })
    } else {
      console.log('Sem dados');
    }

    
  }
  
  mostraloading = null;
  if (loading === true) {
    mostraloading = <>
      <ActivityIndicator size="large" color="#fff" />
    </>
  }
  
  if (dados.length > 0 || dados) {
    

   if( dados && (dados !== "" || dados !== null)) {  
   
    
      return(
        <View>
            <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
            <ScrollView>   
                
              
                <Text style={styles.titulo}> {dados.veiculo.modelo} </Text>
                <View style={styles.toogle}>
                    <Text style={styles.item}> Valor FIPE </Text>
                    <Text style={styles.item}> {mostraloading} {valor.Valor} </Text>
                </View>
                <View style={styles.toogle}>
                    <Text style={styles.item}> Última Km registrada </Text>
                    <Text style={styles.item}> {dados.kmaquisicao} </Text>
                </View>
                <View style={styles.toogle}>
                    <Text style={styles.item}> Recall </Text>
                    <Text style={styles.item}> Não </Text>
                </View>
                <View style={styles.toogle}>
                    <Text style={styles.item}> Última manutenção </Text>
                    <Text style={styles.item}> 15/09/2021 </Text>
                </View>
                <View style={styles.toogle}>
                    <Text style={styles.item}> Segurado </Text>
                    <Text style={styles.item}> Sim </Text>
                </View>
                <View style={styles.toogle}>
                    <Text style={styles.item}> Renavam </Text>
                    <Text style={styles.item}> {dados.veiculo.renavam} </Text>
                </View>
                <Text  onPress={() => navigation.navigate('Manutencao')} style={styles.entrar}> <Entypo name="tools" size={30} /> Registrar Manutenção</Text>
                <Text  onPress={() => navigation.navigate('SeguroLista')} style={styles.entrar}> <MaterialCommunityIcons name="shield-car" size={37} /> Novo Seguro</Text>
                <Text  onPress={() => navigation.navigate('Venda')} style={styles.entrar}>  <Entypo name="swap" size={30} /> Comunicar Venda</Text>
            </ScrollView>
            </LinearGradient>
        </View>
      )
    
  } else {
    return (
    <View>
    <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
    <ScrollView>       
        <Text style={styles.titulo}> Não há dados para este veículo </Text>
    </ScrollView>
    </LinearGradient>
    </View>
    )
  }
  } else {
    return (
    <View>
    <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
    <ScrollView>       
        <Text style={styles.container}> Não há dados para este veículo </Text>
    </ScrollView>
    </LinearGradient>
    </View>
    )
  }
}