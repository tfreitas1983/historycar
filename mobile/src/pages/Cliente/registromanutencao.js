import React, {useState, useEffect, useRef} from 'react';
import VeiculoDataService from '../../services/veiculo';
import {Text, View, StyleSheet, Dimensions, Image,ScrollView, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from "react-redux";
import ManutencaoDataService from '../../services/manutencoes';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import MyDate from '../../components/datepicker';
import moment from 'moment';
import {cepMask} from '../../components/masks';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

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
    marginTop: 10,
    color:'#fff',
    fontSize: 20,
    textAlign: 'left',
  },
  tipo: {
    fontWeight: 'bold',
    color:'#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  rotina: {
    fontWeight: 'bold',
    backgroundColor: '#f23400',
    color:'#fff',
    fontSize: 25,
    textAlign: 'center',
    width: Dimensions.get('window').width*0.5,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f02500'
  },
  recall: {
    fontWeight: 'bold',
    backgroundColor: '#f33400',
    color:'#fff',
    fontSize: 25,
    textAlign: 'center',
    width: Dimensions.get('window').width*0.5,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f02500'
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
    marginBottom: 80,
    padding: 5,
    textAlign: 'center'
  },
  toogle: {      
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  upload: {      
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    fontFamily: 'Open Sans',
    color: '#fafafa',
    fontSize: 25,
    fontWeight: 'bold',       
    marginTop: 10,
    padding:8,
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
const SERVER_URL = 'http://10.0.2.2:5099/';
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


export default function Registro  ({ navigation }) {

  const id = useSelector(state => state.veiculo.id);
  const [veiculo, setVeiculo] = useState('');
  const [data, setData] = useState('');
  const [km, setKm] = useState('');
  const [descricao, setDescricao] = useState('');
  const [oficina, setOficina] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [mecanico, setMecanico] = useState('');
  const [garantia, setGarantia] = useState('');
  const [photo, setPhoto] = useState(null);
  const [fotoKm, setFotoKm] = useState('');

  let veiculodados = null;

  const kmRef = useRef('');
  const descricaoRef = useRef('');
  const oficinaRef = useRef('');
  const cepRef = useRef('');
  const enderecoRef = useRef('');
  const complementoRef = useRef();
  const numeroRef = useRef();
  const bairroRef = useRef();
  const cidadeRef = useRef();
  const ufRef = useRef();
  const mecanicoRef = useRef('');

  const [tipo, setTipo] = useState(null);
  const [loading, setLoading] = useState(false);  
  let cepnum = null;
  let viacep = '';

  useEffect( () => { 

    async function BuscaVeiculo () {
      
      await VeiculoDataService.veiculocliente(id) 
        .then( response  =>  {  
          veiculodados = response.data;
          console.log('veiculodados',veiculodados);
          setVeiculo(veiculodados.veiculo)
          
        })
        .catch(e => {
          console.error(e);
        })
    }
   
    BuscaVeiculo ();

    
  }, [])


  async function pegaCEP () {

    if (cep.length == 9) {
      cepnum = cep.replace('.', '').replace('-', ''); 
    }

    setLoading(true);

    await axios.get(`https://viacep.com.br/ws/${cepnum}/json/`)
    .then(response => {
      viacep = response.data; 

      if (viacep && !viacep.erro) {
       
        setEndereco(viacep.logradouro);
        setBairro(viacep.bairro);
        setCidade(viacep.localidade);
        setUf(viacep.uf);
      } 

     if (viacep.erro) {
       Alert.alert('CEP não encontrado')
       cepnum = '';
       setEndereco('');
       setBairro('');
       setCidade('');
       setUf('');
     }
      enderecoRef.current.focus()
    })
    .catch(e => {
      console.error(e)
    })

    setLoading(false);
  }


  function handleSubmit () {

   /*if (km && km < veiculodados.kmaquisicao) {
      Alert.alert('Quilometragem menor do que a aferida na aquisição')
      kmRef.current.focus()
      return false
    }*/

    if (!data) {
      setData(moment())
    }

    if (!garantia) {
      setGarantia(moment())
    }

    if (photo) {
      handleUploadPhoto()
      
    }

    var vetor = {
      tipo: tipo,
      km: km,
      datamanutencao: data,
      detalhes: descricao,
      garantia: garantia,
      mecanica: oficina,
      responsavel: mecanico,
      situacao: 1,
      veiculoId: veiculo.id,      
      cep: parseInt(cep.replace('.', '').replace('-', '')),
      endereco: endereco,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
      fotokm: fotoKm
    }

    console.log('vetor', vetor);

    ManutencaoDataService.cadastrar(vetor)
    .then( response => {
      console.log(response.data);
      //navigation.navigate('Manutencao')
    })
    .catch(e=> {
      console.error(e);
    })

  }

  mostraloading = null;
  if (loading === true) {
    mostraloading = <View>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  }

  let classe = null;
  let classerecall = null;

  if (tipo === 1) {
    classe = styles.rotina
  } else {
    classe = styles.tipo
  }


  if (tipo === 2) {
    classerecall = styles.recall
  } else {
    classerecall = styles.tipo
  }


  if (tipo === '') {
    classe = styles.tipo
    classerecall = styles.tipo;;
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

  return (
    <View>         
      <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          <ScrollView>       
            <Text style={styles.titulo}> {veiculo.modelo} </Text>
           
            <View style={styles.toogle}>
                <Text style={classe} onPress={() => setTipo(1)} >Rotina</Text>
                <Text style={styles.tipo}>|</Text>
                <Text style={classerecall} onPress={() => setTipo(2)} >Recall</Text>
            </View>

            <Text style={styles.item}  ref={kmRef}> Data </Text>  
            <MyDate onSetDate={date => { setData(date); }}  />
            
            <Input       
            keyboardType="number-pad"         
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            ref={kmRef}   
            placeholder="KM atual"
            returnKeyType="next"
            onSubmitEditing={() => descricaoRef.current.focus()}
            value={km}
            onChangeText={setKm} 
            />

            <TextArea            
            autoCorrect={false}
            autoCapitalize="none"
            ref={descricaoRef}             
            placeholder="Descrição da manutenção"
            returnKeyType="next"
            //onSubmitEditing={() => oficinaRef.current.focus()}
            value={descricao.toUpperCase()}
            onChangeText={setDescricao} 
            />

            <Input       
            keyboardType="default"         
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            ref={oficinaRef}   
            placeholder="Oficina"
            returnKeyType="next"
            onSubmitEditing={() => cepRef.current.focus()}
            value={oficina.toUpperCase()}
            onChangeText={setOficina} 
            />

            <Input       
            keyboardType="number-pad"         
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            maxLength={9}
            placeholder="CEP"
            ref={cepRef}
            returnKeyType="next"
            onSubmitEditing={() => pegaCEP()}
            value={cepMask(cep)}
            onChangeText={setCep} />
            {mostraloading}
            <Input 
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            placeholder="Endereço"
            returnKeyType="next"
            onSubmitEditing={() => numeroRef.current.focus()}
            ref={enderecoRef}
            value={endereco.toUpperCase()}
            onChangeText={setEndereco} />

            <Input 
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            placeholder="Número"
            returnKeyType="next"
            onSubmitEditing={() => complementoRef.current.focus()}
            ref={numeroRef}
            value={numero.toUpperCase()}
            onChangeText={setNumero} />

            <Input 
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            placeholder="Complemento"
            returnKeyType="next"
            onSubmitEditing={() => bairroRef.current.focus()}
            ref={complementoRef}
            value={complemento.toUpperCase()}
            onChangeText={setComplemento} />

              
            <Input 
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            placeholder="Bairro"
            returnKeyType="next"
            onSubmitEditing={() => cidadeRef.current.focus()}
            ref={bairroRef}
            value={bairro.toUpperCase()}
            onChangeText={setBairro} />

            
            <Input 
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            placeholder="Cidade"
            returnKeyType="next"
            onSubmitEditing={() => ufRef.current.focus()}
            ref={cidadeRef}
            value={cidade.toUpperCase()}
            onChangeText={setCidade} />

            
            <Input 
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            placeholder="UF"
            returnKeyType="next"
            onSubmitEditing={() => mecanicoRef.current.focus()}
            ref={ufRef}
            value={uf.toUpperCase()}
            onChangeText={setUf} /> 

            <Input 
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            style={{marginTop: 10, color: '#fff'}} 
            placeholder="Mecânico Responsável"
            returnKeyType="next"
            ref={mecanicoRef}
            value={mecanico.toUpperCase()}
            onChangeText={setMecanico} />      

            
            

            <Text style={styles.item}>Data de garantia</Text>

            <MyDate onSetDate={dateg => { setGarantia(dateg); }}  />


            <View style={styles.upload}>
                <Text> <Entypo name='camera' size={30}   onPress={handleChoosePhoto}/> </Text>
                <Text style={styles.item}  onPress={handleChoosePhoto}> Foto painel</Text>
            </View>
            <View style={{ flex: 1,  justifyContent: 'space-evenly',  alignSelf: 'center', }}>
              {photo && (
                <>
                  <Image
                    source={{ uri: photo.assets[0].uri }}
                    style={{ width: 100, height: 100 }}
                  />
                  
				  
                </>
              )}
              
            </View>
            <View style={styles.upload}>
                <Text> <Entypo name='camera' size={30} /> </Text>
                <Text style={styles.item}> Foto serviço</Text>
            </View>
            <View style={styles.upload}>
                <Text> <Entypo name='camera' size={30} /> </Text>
                <Text style={styles.item}> Foto nota fiscal</Text>
            </View>

            <Button  style={{marginBottom: 80}} onPress={() => handleSubmit()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Salvar </Button>
           
        </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
)
}