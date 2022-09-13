import React, {useEffect, useState} from 'react';
import VeiculoDataService from '../../services/veiculo';
import {Text, View, StyleSheet, Dimensions, ScrollView, Image,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import TimeLine from '../../components/timeline';
import { useSelector } from "react-redux";
import ManutencaoDataService from '../../services/manutencoes';
import moment from 'moment';

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
  bordado: {      
    flex: 1,
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
  linha: {      
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    fontFamily: 'Open Sans',
    color: '#fafafa',
    fontSize: 25,
    fontWeight: 'bold',  
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
  const [veiculo, setVeiculo] = useState('');
  const [detalhes, setDetalhes] = useState(false);
  const [lista, setLista] = useState('');
  const URL = 'http://10.0.2.2:5099/files/'

  let veiculodados = null;
  let manutencoes = '';


  useEffect( () => { 

    async function BuscaVeiculo () {
      
      await VeiculoDataService.veiculocliente(id) 
        .then( response  =>  {  
          veiculodados = response.data;
          setVeiculo(veiculodados.veiculo)
          
        })
        .catch(e => {
          console.error(e);
        })
    }
    BuscaVeiculo();
   
    VeiculosManutencoes ();

    
  }, [])

  async function VeiculosManutencoes () {
      
    if (veiculo !== '') {
      await ManutencaoDataService.buscaveiculo(veiculo.id) 
      .then( response  =>  {  
        let tempdados = response.data;
        manutencoes = tempdados;
       
      })
      .catch(e => {
        console.error(e);
      })
     
      setLista(manutencoes);      
    }
    
  }

  let mostrar = null;
  if (detalhes === true && lista) {
    mostrar = lista.map(item => {
    return (
    <>
    <View style={styles.toogle}>
      <Text style={styles.item}>Data: </Text>
      <Text style={styles.item}>{moment(item.datamanutencao).format('DD/MM/YYYY')}</Text>
      <Text style={styles.item}>Garantia: </Text>
      <Text style={styles.item}>{moment(item.garantia).format('DD/MM/YYYY')}</Text>
    </View>
    <View style={styles.toogle}>
      <Text style={styles.item}>Detalhes: </Text>
      <Text style={styles.item}>{item.detalhes.toUpperCase()}</Text>
    </View>
    <View style={styles.bordado}>
      <View style={styles.linha}>
        <Text style={styles.item}>Oficina: </Text>
        <Text style={styles.item}>{item.mecanica.toUpperCase()}  </Text>        
      </View>
      <Text style={styles.item}>
        {item.endereco.toUpperCase()} - {item.numero} - {item.bairro.toUpperCase()} - {item.cidade.toUpperCase()}
      </Text>
    </View>
    <Text style={{marginBottom:20}}> </Text>
    {(lista && item.fotokm)  && <>
      <Image source={{ uri: URL+item.fotokm}}
      style={{height:200, marginBottom:30}}
      resizeMode="cover" />
      </>
    }
    {(lista && item.fotonf)  && <>
      <Image source={{ uri:URL+item.fotonf}}
      style={{height:200, marginBottom:30}}
      resizeMode="cover" />
     </>
    }

    {(lista && item.fotonf2)  && <>
      <Image source={{ uri:URL+item.fotonf2}}
      style={{height:200, marginBottom:30}}
      resizeMode="cover" />
     </>
    }

    {(lista && item.fotonf3)  && <>
      <Image source={{ uri:URL+item.fotonf3}}
      style={{height:200, marginBottom:30}}
      resizeMode="cover" />
     </>
    }

    {(lista && item.fotonf4)  && <>
      <Image source={{ uri:URL+item.fotonf4}}
      style={{height:200, marginBottom:30}}
      resizeMode="cover" />
     </>
    }

    {(lista && item.fotonf5)  && <>
      <Image source={{ uri:URL+item.fotonf5}}
      style={{height:200, marginBottom:30}}
      resizeMode="cover" />
     </>
    }

    {(lista && item.fotoservico)  && <>
      <Image source={{ uri:URL+item.fotoservico}}
      style={{height:200, marginBottom:30}}
      resizeMode="cover" />
      </>
    }
    
    {(lista && item.fotoservico2)  && <>
      <Image source={{ uri:URL+item.fotoservico2}}
      style={{height:200, marginBottom:30}}
      resizeMode="cover" />
      </>
    }

    {(lista && item.fotoservico3)  && <>
      <Image source={{ uri:URL+item.fotoservico3}}
      style={{height:200, marginBottom:30}}
      resizeMode="cover" />
      </>
    }


    {(lista && item.fotoservico4)  && <>
      <Image source={{ uri:URL+item.fotoservico4}}
      style={{height:200, marginBottom:30}}
      resizeMode="cover" />
      </>
    }


    {(lista && item.fotoservico5)  && <>
      <Image source={{ uri:URL+item.fotoservico5}}
      style={{height:200, marginBottom:30}}
      resizeMode="cover" />
      </>
    }
    <View style={{borderBottomColor: '#fff', borderBottomWidth: 10, marginTop: 20, marginBottom: 20}}>
    <Text style={styles.titulo}> ***************************** </Text>
    </View>
    
    </>
  )})
  }

  return (
    <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <ScrollView>
        <Text style={styles.titulo}> {veiculo.modelo}</Text>
        {detalhes === false && <>
          <Text onPress={() => setDetalhes(true)} style={styles.item}> Ver mais...</Text>
          <TimeLine />
          <Text onPress={() => navigation.navigate('Registro')} style={styles.entrar}> <Entypo name="level-down" size={30} /> Novo registro</Text>
          <Text style={{marginBottom: 150}}></Text>
          </>
        }
        {detalhes === true  && <>
          <Text  style={styles.titulo}>Manutenções</Text>
          <Text  style={{marginBottom: 20}}></Text>
          {mostrar}
          <Button  style={{marginBottom: 80}} onPress={() => setDetalhes(false)}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Voltar </Button>
          <View style={{borderBottomColor: '#fff', borderBottomWidth: 3, marginTop: 20, marginBottom: 20}}>
          </View>
        </>
        }
        </ScrollView>
        </LinearGradient>
    </View>
)

}