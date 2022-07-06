import React, {useRef, useState, useEffect}  from 'react';
import { useSelector } from "react-redux";
import {Text, View, StyleSheet, Dimensions, ActivityIndicator, ScrollView, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MyDate from '../../components/datepicker';
import VeiculoDataService from '../../services/veiculo';
import CadastroClienteDataService from '../../services/cadastrocliente';
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

export default function Venda  ({ navigation }) {

  const [km, setKm] = useState('');
  const [venda, setVenda] = useState('');
  const [dados, setDados] = useState('');
  const [cliente, setCliente] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const veiculoclienteid = useSelector(state => state.veiculo.id);  
  const userId = useSelector(state => state.auth.id);
  const kmRef = useRef('');
  const vendaRef = useRef('');

  console.log('veiculoclienteId', veiculoclienteid);
  console.log('userId', userId);


   
 useEffect( () => { 
  /* async function PegaVeiculo () {
      try{
      let resp = await VeiculoDataService.buscarUm(veiculoid) 
        .then( response  =>  {    
          setLoading(true)           ;
           setDados(response.data.map(item => ({ ...item}) )); 
        })
        resp = await resp;
      }
      catch (e){
        console.error(e);
      }     
    }   
    PegaVeiculo();   
    PegaCliente();

    setLoading(false);
    */
   PegaVeiculoCliente()
    
    
  }, [])
  

  async function PegaCliente () {
    let respcliente = await CadastroClienteDataService.buscarusuario(userId)
    .then( response => {
      let temp = response.data.map( item => { return item.id})
      setCliente(temp[0])      
    })    
    .catch( e =>  {
      console.error(e);
    })

    respcliente = await respcliente;

    PegaVeiculoCliente();
  }

  async function PegaVeiculoCliente () {
    setLoading(true)
    let respcliente = await VeiculoDataService.veiculocliente(veiculoclienteid)
    .then( response => {
      let temp = response.data;//.map( item => { return item})
      setDados(temp) ;   
      console.log('temp', temp);
    })    
    .catch( e =>  {
      console.error(e);
    })

    respcliente = await respcliente;

    setLoading(false)
  }

  async function handleSubmit() {

    if (km < dados.kmaquisicao) {
      Alert.alert('Quilometragem menor do que a aferida na aquisição')
      kmRef.current.focus()
      return false
    }

    if (moment(venda) < moment(dados.dataaquisicao) ){
      Alert.alert('Data da venda menor que a data aquisição')
      kmRef.current.focus()
      return false
    }




    var data = {
      datavenda: venda,
      kmvenda: km,
      situacao: 0
    }

    if (veiculoclienteid) {
      await VeiculoDataService.editarrelacao(veiculoclienteid, data)
      .then(response => {
        console.log(response.data);
        navigation.navigate('Veiculos')
      })
      .catch(e => {
        console.error(e);
      })
    }
  }

  mostraloading = null;
  if (loading === true) {
    mostraloading = <View>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  }

  return (
    <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <ScrollView>        

        <Text> {mostraloading} </Text>

          {dados !== '' && <>
            <View style={styles.toogle}>
                <Text style={styles.titulo} key={dados.id} onPress={() => navigation.navigate('Detalhes')}>{dados.veiculo.fabricante} - {dados.veiculo.modelo}</Text>
                <Text style={styles.titulo} key={dados.id+'a'} onPress={() => navigation.navigate('Detalhes')} > <Entypo name="text-document" size={30} /> </Text>
            </View>
            <Input       
            keyboardType="number-pad"         
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            ref={kmRef}            
            autoFocus={true}
            placeholder="KM atual"
            returnKeyType="next"
            onSubmitEditing={() => vendaRef.current.focus()}
            value={km}
            onChangeText={setKm} 
            />

            
            <Text style={styles.titulo}  ref={vendaRef}> Data da venda </Text>  
            <MyDate onSetDate={date => { setVenda(date); }}  /> 


            <Button  onPress={() => handleSubmit()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Salvar </Button>

            </>
          }

          {!dados && <>

          <View>
            <Text style={styles.titulo}> Não há dados </Text>
          </View>
          </>
          }

        </ScrollView>
        </LinearGradient>
    </View>
)
}