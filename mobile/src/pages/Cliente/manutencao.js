import React, {useEffect, useState} from 'react';
import VeiculoDataService from '../../services/veiculo';
import ManutencaoDataService from '../../services/manutencoes';
import {Text, View, StyleSheet, Dimensions, StatusBar, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import TimeLine from '../../components/timeline';
import moment from 'moment';
import { useSelector } from "react-redux";

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
    width: Dimensions.get('window').width
  },   
  item: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom:5,
    color:'#fff',
    fontSize: 20,
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

export default function Manutencao  ({ navigation }) {

  const id = useSelector(state => state.veiculo.id);
  //const [veiculo, setVeiculo] = useState('');
  const [data, setData] = useState('');


  let veiculo = null;
  let dados = null;


  useEffect( () => { 

    async function BuscaVeiculo () {
      
      await VeiculoDataService.veiculocliente(id) 
        .then( response  =>  {  
          veiculo = response.data.veiculo.id
          console.log('testeveiculo',veiculo);
          
          VeiculosManutencoes(); 
        })
        .catch(e => {
          console.error(e);
        })
    }
   
    BuscaVeiculo ();

    
  }, [])


  async function VeiculosManutencoes () {
      
    if (veiculo !== '') {
      await ManutencaoDataService.buscaveiculo(veiculo) 
      .then( response  =>  {  
        let tempdados = response.data
        console.log('tempdados', tempdados);
        dados = tempdados;
        Vetor();
      })
      .catch(e => {
        console.error(e);
      })
     
      console.log('dados', dados);
      
    }
    
  }

  async function Vetor() {

     let dadosmanutencao = dados[0].map(item => {
      return  {title: item.detalhes, description: moment(item.datamanutencao).format('DD/MM/YYYY')}
     })
     await setData(dadosmanutencao);

     
  }

  console.log('data', data);
  
  return (
    <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <ScrollView>
        <Text style={styles.titulo}>Chevrolet Celta VHC 1.4</Text>
        <TimeLine data={data}/>
            <Text onPress={() => navigation.navigate('Registro')} style={styles.entrar}> <Entypo name="level-down" size={30} /> Novo registro</Text>
        </ScrollView>
        </LinearGradient>
    </View>
)

}