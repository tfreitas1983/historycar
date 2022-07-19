import React, {useState, useEffect} from 'react';
import VeiculoDataService from '../../services/veiculo';
import {View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from "react-redux";
import axios from 'axios';
import moment from 'moment';
import ManutencaoDataService from '../../services/manutencoes';

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
  const [dadosVeiculo, setDados] = useState(null);
  const [valor, setValor] = useState('');
  const [manutencoes, setManutencoes] = useState('');
  const [seguros, setSeguros] = useState('');
  const [recall, setRecall] = useState('');
  const [loading, setLoading] = useState(false);
  const [segurado, setSegurado] = useState(false);
  let dados = null;
 
  useEffect( () => { 

    async function VeiculosClientes () {
      
      await VeiculoDataService.veiculocliente(id) 
        .then( response  =>  {  
          let tempdados = response.data;
          dados = tempdados;
          setDados(dados);
          
        })
        .catch(e => {
          console.error(e);
        })
       

        PegaValor();
        PegaManutencao();
        PegaSeguro();
    }

    VeiculosClientes(); 
    
  }, [])

      
  async function PegaManutencao() {
    await ManutencaoDataService.buscaveiculo(dados.veiculo.id)
    .then( response => {
      let tempmanutencao = response.data.shift()
      let todas = response.data.filter(item => {
        return item.tipo === 2
      })
      setRecall(todas);
      console.log('recall', todas);
       setManutencoes(tempmanutencao);
    })
    .catch(e => {
      console.error(e);
    })
  }

  async function PegaSeguro() {
    await VeiculoDataService.veiculoseguro(dados.veiculo.id)
        .then( response => {
          let tempseguro = response.data.map(item => {return item.vigenciafim});      
          
          setSeguros(tempseguro) ;   

          function compare(a,b) {
            return a < b;
          }
          
          setSegurado(tempseguro.sort(compare).shift());
          

        })    
        .catch( e =>  {
          console.error(e);
        })
    
  }

  

  async function PegaValor() {

    if (dados !== '') {
      setLoading(true);
      console.log('fabricante', dados.veiculo.idfabricante);
      console.log('modelo', dados.veiculo.idmodelo);
      console.log('ano', dados.veiculo.idano);
   
      
      await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas/'+dados.veiculo.idfabricante+'/modelos/'+dados.veiculo.idmodelo+'/anos/'+dados.veiculo.idano)
      .then(response => {
        let tempvalor = response.data.Valor
        console.log('tempvalor', tempvalor);
        setValor(tempvalor);

        setLoading(false)
      })
      .catch(e => {
        console.error(e);
      })
    } else {
      console.log('Sem dados');
      setLoading(true)

      let resp = await VeiculoDataService.veiculocliente(id) 
      .then( response  =>  {   
        let tempdados = response.data  
        console.log('tempdadoselse',tempdados);       
        setDados(tempdados);
      })
      .catch(e => {
        console.error(e);
      })
      resp = await resp;
      console.log('dadoselse', dados);

     
        
        PegaValor2();

    }
    
  }

  async function PegaValor2() {
    console.log('fabricante2', dados.veiculo.idfabricante);
    console.log('modelo2', dados.veiculo.idmodelo);
    console.log('ano2', dados.veiculo.idano);
  
    
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
  }
  
  mostraloading = null;
  if (loading === true) {
    mostraloading = <>
      <ActivityIndicator size="large" color="#fff" />
    </>
  }      
    
  return(
    <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <ScrollView>    

          {dadosVeiculo !== null && <>
          
            <Text style={styles.titulo}> {dadosVeiculo.veiculo.modelo} </Text>
            <View style={styles.toogle}>
                <Text style={styles.item}> Valor FIPE </Text>
                <Text style={styles.item}> {mostraloading} {valor} </Text>
            </View>
            <View style={styles.toogle}>
                <Text style={styles.item}> Última Km registrada </Text>
                <Text style={styles.item}> {manutencoes.km} </Text>
            </View>
            <View style={styles.toogle}>
                <Text style={styles.item}> Recall </Text>
                <Text style={styles.item}> {recall.length > 0 ? 'Sim' : 'Não'} </Text>
            </View>
            <View style={styles.toogle}>
                <Text style={styles.item}> Última manutenção </Text>
                <Text style={styles.item}> {moment(manutencoes.datamanutencao).format('DD/MM/YYYY')} </Text>
            </View>
            <View style={styles.toogle}>
                <Text style={styles.item}> Segurado </Text>
                <Text style={styles.item}> {moment(segurado) >= moment.now() ? 'Sim' : 'Não' } </Text>
            </View>
            <View style={styles.toogle}>
                <Text style={styles.item}> Renavam </Text>
                <Text style={styles.item}> {dadosVeiculo.veiculo.renavam} </Text>
            </View>
            <Text  onPress={() => navigation.navigate('Manutencao')} style={styles.entrar}> <Entypo name="tools" size={30} /> Registrar Manutenção</Text>
            <Text  onPress={() => navigation.navigate('SeguroLista')} style={styles.entrar}> <MaterialCommunityIcons name="shield-car" size={37} /> Novo Seguro</Text>
            <Text  onPress={() => navigation.navigate('Venda')} style={styles.entrar}>  <Entypo name="swap" size={30} /> Comunicar Venda</Text>
            </>               
          }
          {!dadosVeiculo && <>
            <Text style={styles.titulo}> Não há dados para este veículo </Text>
          </>
          }
        </ScrollView>
        </LinearGradient>
    </View>
  )
  
}