import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from "react-redux";
import axios from 'axios';
import moment from 'moment';
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
  const [veiculoId, setVeiculo] = useState(null);
  const [dadosVeiculo, setDados] = useState(null);
  let veiculo = null;
  let veiculosdados = null;

console.log('useSelector', id);

  useEffect( () => { 
    
    PegaVeiculo();  
    
    
  }, [])

  async function PegaVeiculo () {
    let respcliente = await VeiculoDataService.veiculocliente(id)
    .then( response => {
      let veiculotemp = response.data.veiculo.id;
      console.log('veiculotemp', veiculotemp);
      veiculo = veiculotemp;
      console.log('veiculo', veiculo);
    })    
    .catch( e =>  {
      console.error(e);
    })
    respcliente = await respcliente;
    setVeiculo(veiculo) ;
    console.log('veiculoId', veiculoId);
    
    PegaSeguros(); 
  }   

  
  lista = null;

  async function PegaSeguros() {
    

    if (veiculoId !== '') {
      let respseguro = await VeiculoDataService.veiculoseguro(veiculo)
        .then( response => {
          let tempseguro = response.data;
          veiculosdados = tempseguro;
          
          console.log('dados', dadosVeiculo);
        })    
        .catch( e =>  {
          console.error(e);
        })

        setDados(veiculosdados) ;   

      respseguro = await respseguro;
      console.log('seguros', dadosVeiculo)

    } else {
      await VeiculoDataService.veiculocliente(id)
    .then( response => {
      let temp = response.data.veiculo.id;
      setVeiculo(temp) ;
    })
    .catch( e =>  {
      console.error(e);
    })

    console.log('veiculoIdselse', veiculoId);

    }    
  }



  if (dadosVeiculo) {
    lista = dadosVeiculo.map(item => {
      if (item.seguradora) {
        return (
          <View style={{borderWidth: 2, borderColor: '#fff', borderRadius: 15,padding: 15, marginBottom: 20}}>
          <View style={{}}>
            <Text style={styles.titulo} key={item.id}>
              {item.seguradora.descricao} - {moment(item.vigenciainicio).format('DD/MM/YYYY')} - {moment(item.vigenciafim).format('DD/MM/YYYY')}
            </Text>        
            
          </View>
          <Text  style={styles.titulo} key={item.id+'v'}> R$ {item.valor}  </Text>
          </View>
        )
      }
    })
  }

 
    return (
      <View>
          <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
          <ScrollView>
             {dadosVeiculo && <>
              {lista}
              <Text onPress={() => navigation.navigate('Seguro')} style={styles.entrar}> <Entypo name="level-down" size={30} /> Novo Seguro</Text>
              </>
            }
            {!dadosVeiculo && <>
              <Text onPress={() => navigation.navigate('Seguro')} style={styles.entrar}> <Entypo name="level-down" size={30} /> Novo Seguro</Text>
            </>
            }
          </ScrollView>
          </LinearGradient>
      </View>
    )
}