import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import {Text, View, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MyDate from '../../components/datepicker';
import SelectDropdown from 'react-native-select-dropdown'
import Input from '../../components/Input'
import { moedaMask } from '../../components/masks';

import SeguroDataService from '../../services/segurosveiculos'

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
  bordado : {
    fontFamily: 'Open Sans',
    color: '#fafafa',
    fontSize: 25,
    fontWeight: 'bold', 
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding:8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    width: Dimensions.get('window').width,
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
  periodo: {      
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontFamily: 'Open Sans',
    color: '#fafafa',
    fontSize: 25,
    fontWeight: 'bold',       
    marginTop: 10
  },
  datas: {
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
    width: Dimensions.get('window').width * 0.45
  },
});




export default function Seguro  ({ navigation }) {

  const id = useSelector(state => state.veiculo.id);
  const [dados, setDados] = useState('');
  const [selecionada, setSelecionada] = useState('');
  const [idSelecionada, setIdSelecionada] = useState('');
  const [datainicio, setInicio] = useState('');
  const [datafim, setFim] = useState('');
  const [valormoeda, setValorMoeda] = useState('');
  const [valor, setValor] = useState('');
  
  useEffect( () => { 
    async function Seguradoras () {
      try{
      let resp = await axios.get(`http://10.0.2.2:5099/api/seguradoras`) 
        .then( response  =>  {               
           setDados(response.data.map(item => { return { descricao: item.descricao, id: item.id}} )); 
        })
        resp = await resp//map(item => ({...item})) 
      }
      catch (e){
        console.error(e);
      }     
    }   
    Seguradoras();   
    
  }, [])

  
  if (selecionada !== '') {
    dados.filter(item => {
      if (item.descricao === selecionada) {
        setIdSelecionada(item.id);
        setSelecionada('')
      } else {
        return null
      }
    })
  }

  
  if (!dados) { 
    return (
    <View>
      <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <ScrollView>
              
          <Text style={styles.titulo}> Não há dados disponíveis </Text>
        </ScrollView>
      </LinearGradient>
    </View>
    )
  }




  async function handleSubmit  ()  {

    if (valormoeda !== '') {
      var number  = parseFloat(valormoeda.replace('R$ ','').replace(',','').slice(0, -2))
      var cents = parseFloat(valormoeda.slice(-2))
      setValor(number+(cents/100)) 
    } 


    var data = {
      veiculoId: id,
      seguradoraId: idSelecionada,
      valor: valor,
      vigenciainicio: datainicio, 
      vigenciafim: datafim,
      situacao: 1
    }

    
    
    await SeguroDataService.cadastrar(data)
    .then( response  =>  {
      navigation.navigate('SeguroLista')
    })
    .catch(e => {
      console.error(e)
    })

  }

  
  
    return(
      <View>
          <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
          <ScrollView>
              
              <Text style={styles.titulo}> Seguradora </Text>
  
              <SelectDropdown
                data={dados.map(item => {return item.descricao})}
                defaultButtonText="Selecione a seguradora"
                buttonStyle={styles.bordado}
                buttonTextStyle={{color: '#fff', fontWeight: 'bold'}}
                onSelect={(selectedItem, index) => {
                  setSelecionada(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item
                }}
              />
             
  
  
              <Text style={styles.bordado}> Vigência </Text>           
              <Text style={styles.titulo}> Início </Text>  
              <MyDate onSetDate={date => { setInicio(date); }} /> 
              <Text style={styles.titulo}> Fim </Text>               
              <MyDate onSetDate={date => { setFim(date); }} />              
              <Text style={styles.titulo}> Valor </Text>  
             <Input 
             keyboardType="number-pad"    
             autoCorrect={false}
             autoCapitalize="none"
             style={{marginTop: 10, color: '#fff'}} 
             placeholder="R$"             
             returnKeyType="next"
             onSubmitEditing={() => handleSubmit()}
             value={'R$ ' + moedaMask(valormoeda)}
             onChangeText={setValorMoeda} 
             />
              <Text onPress={() => handleSubmit()} style={styles.entrar}> <Entypo name="level-down" size={30} /> Salvar</Text>
          </ScrollView>
          </LinearGradient>
      </View>
    )
  } 

