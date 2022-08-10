import React, {useRef, useState, useEffect, useCallback}  from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView, Alert, Switch, KeyboardAvoidingView, ActivityIndicator, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
//import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from 'react-native-image-picker';
//import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MyDate from '../../components/datepicker';
import TextArea from '../../components/TextArea';
import CadastroClienteDataService from '../../services/cadastrocliente';
import VeiculoDataService from '../../services/veiculo';
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont()

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Open Sans',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
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
    padding: 5,
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
  erro: {
    fontFamily: 'Open Sans',
    color: '#fff',
    backgroundColor: '#ef2000',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#fc2000',
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
    marginBottom: 80,
    padding: 5,
    textAlign: 'center'
  },
  buscar:{
    fontFamily: 'Open Sans',
    textAlign: 'center',
    color: '#f2f2f2',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    fontSize: 40,
    marginTop: 10,
    width: Dimensions.get('window').width
  },
  adicionar:{
  fontFamily: 'Open Sans',
  textAlign: 'center',
  color: '#f2f2f2',
  borderWidth: 5,
  borderRadius: 10,
  borderColor: '#f2f2f2',
  fontSize: 10,
  marginTop: 10,
  width: Dimensions.get('window').width
  },
  toggle: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    fontFamily: 'Open Sans',
    color: '#fafafa',
    fontSize: 25,
    fontWeight: 'bold', 
    alignItems:'center'
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
  }
});

export default function PesquisarVeiculos  ({ navigation })  {

  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.id);

  
  const [dados, setDados] = useState('');
  const [loadingdados, setLoadingDados] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const [avancado, setAvancado] = useState(false);
  const [fabricantes, setFabricantes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState(null)
  const searchRef = useRef(null);
  const searchRef2 = useRef(null);
  const searchRef3 = useRef(null);
  const kmRef = useRef('');
  const chassiRef = useRef('');
  const aquisicaoRef = useRef('');
  const gnvRef = useRef('');
  const descricaoRef = useRef('');
  const fotoRef = useRef('');

  const [renavam, setRenavam] = useState('332838594');
  const [fabricante, setFabricante] = useState([]);
  const [modelo, setModelo] = useState([]);
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [marca, setMarca] = useState([]);
  const [idModeloapi, setIdModeloApi] = useState('');
  const [ano, setAno] = useState([]);
  const [combustivel, setCombustivel] = useState('');
  const [anocombustivel, setAnoCombustivel] = useState([]);
  const [idAno, setIdAno] = useState('');
  const [anoSelecionado,setAnoSelecionado] = useState('');
  const [aquisicao, setAquisicao] = useState('');
  const [placa, setPlaca] = useState('');
  const [km, setKm] = useState('');
  const [chassi, setChassi] = useState('');
  const [gnv, setGnv] = useState('');
  const [message, setMessage] = useState('');
  const [cliente, setCliente] = useState([]);
  const [adicionado, setAdicionado] = useState(false);
  const [idCliente, setIdCliente] = useState('');
  const [transferencia, setTransferencia] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [crv, setCrv] = useState(null);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [descricao, setDescricao]  = useState('');

  const createFormData = (photo, body = {}) => {
    const data = new FormData();
  
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
  };


  useEffect ( () => {
   
      BuscaCliente();
   
  }, [dados])

  async function PegaCliente () {
    let respcliente = await CadastroClienteDataService.buscarusuario(userId)
    .then( response => {
      let temp = response.data.map( item => { return item.id})
      setIdCliente(temp[0])      
    })    
    .catch( e =>  {
      console.error(e);
    })

    respcliente = await respcliente;
  }
  
  

  async function buscar () {

      await  VeiculoDataService.buscarRenavam(renavam)
      .then( response  =>  {  
        setLoadingDados(true) ;
        if (response.data) {
          let tempdados = response.data;
          console.log('tempdados', tempdados);
          setDados(tempdados);
          carregaDados();
        } else {
          Alert.alert('RENAVAM não encontrado')
        }  
      })
      .catch (e => {
      console.error(e);
      });
               
      setBuscado(true);           
      setLoadingDados(false);
      PegaCliente(); 
    
  }

  let tempcliente = null;
  let tempnome = null;
  let tempcpf = null;

  async function BuscaCliente () {
    await  VeiculoDataService.buscacliente(dados.id)
    .then(response => {
      tempcliente = response.data[0].cliente;
	  tempnome = response.data[0].cliente.nome;
	  tempcpf = response.data[0].cliente.cpf;
	  setNome(tempnome);	  
	  setCpf(tempcpf);
      setCliente(tempcliente);
      console.log('tempcliente', tempcliente);     
      
    })
    .catch(e => {
      console.error(e);
    })
  }

  async function carregaDados () {
    if (dados) {
      console.log('dados', dados);
      setLoadingDados(true);
      let placatemp = await dados.veiculos_placas.map(item => { return item.placa });

      
      setFabricante(dados.fabricante);
      setMarca(dados.idfabricante);
      setModelo(dados.modelo);   
      setIdModeloApi(dados.idmodelo);
      setAnoSelecionado(dados.ano);
      setIdAno(dados.idano);
      setPlaca(placatemp[0] );
      setChassi(dados.chassi);
      setGnv(dados.gnv);



      
      setLoadingDados(false);


    } else {

    }
  }


  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  async function handleUploadPhoto  () {

    /*console.log('foto',createFormData(photo) );*/
    var foto =  new FormData();
    foto.append('file', {
    name: photo.assets.fileName,
    type: photo.assets.type,
    uri: photo.assets.uri,
  })
    console.log('foto', foto);
    
	  await ManutencaoDataService.cadastrarImagem(foto)
	  /*
   fetch(`${SERVER_URL}/api/veiculosmanutencoes/files`, {
      method: 'POST',
      body: createFormData(photo.assets[0]),
    })*/
      //.then((response) => response.json())
      .then((response) => {
        console.log('response', response);
        setFotoKm(response.name)
      })
      .catch((error) => {
        console.log('error', error);
        setFotoKm(error.name)
      });
  };

  let mostraloading = null;
  if (loadingdados === true) {
    mostraloading = <View>
    <ActivityIndicator size="large" color="#fff" />
  </View>
  }
  

  async function handleSubmit () {
    var data = {

      situacao: 1,      
      kmaquisicao: km,     
      dataaquisicao: aquisicao,
      veiculoId: dados.id,
      clienteId: idCliente        
    }

    var edicao = {
      gnv: gnv
    }

    await VeiculoDataService.novocliente(dados.id, data)
    .then(response => {
      console.log('novocliente',response.data);
    })
    .catch(e => {
      console.error(e)
    })  

    await VeiculoDataService.editar(dados.id, edicao)
    .then(response => {
      navigation.navigate('Veiculos');
    })
    .catch(e => {
      console.error(e)
    })  
  }

  async function SolicitarTransferencia () {

    if (!foto ) {
      Alert.alert('É obrigatório o envio da foto do CRV')
    }

    /*Envio de e-mail com o texto e a foto

    var data = {
      foto,
      descricao
    }
    await VeiculoDataService.enviar(id, data)
    .then(response => {
      console.log('resposta do email',response.data);
    })
    .catch(e => {
      console.error(e)
    })
    */
  }

  
  return (
    <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
       

        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          
           
         
          <View>
            {mostraloading}
            {buscado === true && transferencia === false && <>
            <Text style={styles.titulo}>Digite o Renavam</Text>
            </>
            }

                        
            <Input       
            keyboardType="number-pad"         
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            placeholder="RENAVAM"            
            autoFocus={true}
            returnKeyType="next"
            onSubmitEditing={() => buscar()}
            value={renavam}
            onChangeText={setRenavam}
            maxLength={11}
            />              
            
          </View>

          { (buscado === false || !dados) && avancado === false &&
            <Button style={styles.buscar} onPress={() => buscar()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Buscar </Button>
          }

          {buscado === false && <View>
            <Text  style={styles.titulo}>Se o veículo já estiver cadastrado no aplicativo,
            você verá os dados.          
            </Text>
          </View>
          }

          
          
         
          
          <ScrollView > 
            <View >

              {buscado === true && dados !== '' && avancado === false && transferencia === false && <View>
                <View style={styles.opcoes} >
                  <Text style={styles.title}>Marca: {dados.fabricante}</Text>
                  
                  </View>
                  <View style={styles.opcoes} >
                    <Text style={styles.title}>Modelo: {dados.modelo}</Text>
                  </View>
                  <View style={styles.opcoes} >
                    <Text style={styles.title}>Ano: {dados.ano}</Text>
                  </View>
                  <View style={styles.opcoes} >
                    <Text style={styles.title}>GNV: {dados.gnv === true ? 'Sim' : 'Não'}</Text>
                  </View>
                  <View style={styles.opcoes} >
                    <Text style={styles.title}>Chassi: {dados.chassi}</Text>
                  </View>
                  <View style={styles.opcoes} >
                    <Text style={styles.title}>Placa: {dados.veiculos_placas[0].placa}</Text>
                  </View>
                </View> 
              }

              {buscado === true && tempcliente !== ''  && nome !== '' && cpf !== '' && transferencia === false && <View style={{marginBottom: 50}} >
                <Text style={styles.titulo}> Dados do proprietário</Text>
                <Text style={styles.opcoes}> {'Nome: '+nome.split(' ').slice(0, 1)+'*****'}</Text>
                <Text style={styles.opcoes}> {'CPF: '+ cpf.slice(0, 3) + '*****' }</Text>
                <Text style={styles.titulo}> Venda não comunicada! </Text>
                <Text style={styles.titulo}> Para a transferência de proprietário clique no botão abaixo e envie a foto do CRV do veículo.</Text>
                <Button onPress={() => setTransferencia(true)} > Solicitar</Button>
                </View>              
              }

              {buscado === true && dados !== '' && cliente.length < 1 && adicionado === false && <>
                <Text style={styles.titulo}> Veículo cadastrado em nosso app! </Text>
                <Button onPress={() => setAdicionado(true)} > Cadastrar</Button>
              </>

              }

              {buscado === true && adicionado === true && transferencia === false &&  <View style={{marginBottom: 50}}>
              
                <Input       
                keyboardType="number-pad"         
                autoCorrect={false}
                autoCapitalize="none"
                style={{marginTop: 10, color: '#fff'}} 
                ref={kmRef}
                placeholder="KM atual"
                returnKeyType="next"
                onSubmitEditing={() => gnvRef.current.focus()}
                value={km}
                onChangeText={setKm} />

                <Text style={styles.titulo}> Data aquisição </Text>  
                <MyDate onSetDate={date => { setAquisicao(date); }} /> 

                <View style={styles.toggle}>
                  <Text  style={styles.titulo} > GNV   <Switch  value={gnv} ref={gnvRef} onValueChange={setGnv} /> </Text>
                </View>

                <Button  onPress={() => handleSubmit()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Salvar </Button>

              </View>

              }

              {buscado === true && transferencia === true && <View style={{marginBottom: 50}}>
                <Text style={styles.titulo}>Informe os dados sobre a compra do veículo:
                dados pessoais do novo proprietário e do veículo </Text>
                

                <TextArea            
                autoCorrect={false}
                autoCapitalize="none"
                ref={descricaoRef}             
                placeholder="Dados pessoais do novo proprietário e do veículo "
                returnKeyType="next"
                onSubmitEditing={() => fotoRef.current.focus()}
                value={descricao.toUpperCase()}
                onChangeText={setDescricao} 
                />				        
				
                <View style={styles.upload}>
                  <Text style={{marginTop: 30}}> <Entypo name='camera' size={30}   onPress={handleChoosePhoto}/> </Text>
                  <Text style={styles.titulo} ref={fotoRef} onPress={handleChoosePhoto}> Foto CRV</Text>
                  </View>
                  <View style={{ flex: 1,  justifyContent: 'space-evenly',  alignSelf: 'center', marginTop: 30 }}>
                    {photo && (
                      <>
                        <Image
                          source={{ uri: photo.assets ? photo.assets[0].uri : null}}
                          style={{ width: 150, height: 200 }}
                        />
                      </>
                    )}
                  
                </View>
                <Button onPress = { () => SolicitarTransferencia() }>Enviar</Button>
              </View>
              }
              
            </View>

            
            
            
          </ScrollView>
        </KeyboardAvoidingView>
 
        </LinearGradient>
    </View>
)}