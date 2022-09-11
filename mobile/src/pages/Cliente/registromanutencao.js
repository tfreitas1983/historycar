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
  blocoupload: {      
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
  remover: {
    color: '#ff2010',
    borderBottomColor: '#ff2000',
    borderBottomWidth: 3,
    fontWeight: 'bold',
    width: 75,
  }
});

const SERVER_URL = 'http://10.0.2.2:5099/api/veiculosmanutencoes/files';

export default function Registro  ({ navigation }) {

  const id = useSelector(state => state.veiculo.id);
  const [veiculo, setVeiculo] = useState('');
  const [data, setData] = useState('');
  const [km, setKm] = useState('210230');
  const [descricao, setDescricao] = useState('Teste de foto');
  const [oficina, setOficina] = useState('Auto Fast');
  const [cep, setCep] = useState('20010090');
  const [endereco, setEndereco] = useState('Rua São Bento');
  const [numero, setNumero] = useState('8');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('Centro');
  const [cidade, setCidade] = useState('Rio de Janeiro');
  const [uf, setUf] = useState('RJ');
  const [mecanico, setMecanico] = useState('José Carlos');
  const [garantia, setGarantia] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photos1, setPhotoS1] = useState(null);
  const [photos2, setPhotoS2] = useState(null);
  const [photos3, setPhotoS3] = useState(null);
  const [photos4, setPhotoS4] = useState(null);
  const [photos5, setPhotoS5] = useState(null);
  const [photonf1, setPhotoNf1] = useState(null);
  const [photonf2, setPhotoNf2] = useState(null);
  const [photonf3, setPhotoNf3] = useState(null);
  const [photonf4, setPhotoNf4] = useState(null);
  const [photonf5, setPhotoNf5] = useState(null);
  const [fotoKm, setFotoKm] = useState('');
  const [servico1, setServico1] = useState('');
  const [servico2, setServico2] = useState('');
  const [servico3, setServico3] = useState('');
  const [servico4, setServico4] = useState('');
  const [servico5, setServico5] = useState('');
  const [nf1, setNf1] = useState('');
  const [nf2, setNf2] = useState('');
  const [nf3, setNf3] = useState('');
  const [nf4, setNf4] = useState('');
  const [nf5, setNf5] = useState('');

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
          setVeiculo(veiculodados.veiculo);          
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
      fotokm: fotoKm,
      fotonf: nf1,
      fotonf2: nf2,
      fotonf3: nf3,
      fotonf4: nf4,
      fotonf5: nf5,
      fotoservico: servico1,
      fotoservico2: servico2,
      fotoservico3: servico3,
      fotoservico4: servico4,
      fotoservico5: servico5,
    }

    console.log('vetor', vetor);

    ManutencaoDataService.cadastrar(vetor)
    .then( response => {
      console.log("resposta do backend",response.data);
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
      console.log('carregaFoto',response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handlePhotoServico1 = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhotoS1(response);
      }
    });
  };

  const handlePhotoServico2 = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhotoS2(response);
      }
    });
  };

  const handlePhotoServico3 = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhotoS3(response);
      }
    });
  };

  const handlePhotoServico4 = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhotoS4(response);
      }
    });
  };

  const handlePhotoServico5 = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhotoS5(response);
      }
    });
  };

  const handlePhotoNF1 = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhotoNf1(response);
      }
    });
  };

  const handlePhotoNF2 = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhotoNf2(response);
      }
    });
  };

  const handlePhotoNF3 = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhotoNf3(response);
      }
    });
  };

  const handlePhotoNF4 = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhotoNf4(response);
      }
    });
  };

  const handlePhotoNF5 = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhotoNf5(response);
      }
    });
  };

  async function handleUploadPhoto  () {    

    if (photo) {
      
      let formdata = photo.assets[0];

      console.log('fotoKm', photo.assets)

      let envio = {
        name: formdata.fileName,
        type: formdata.type,
        uri: formdata.uri
      }

      const enviofoto = new FormData();

      enviofoto.append('file', envio )
      const header = {
       'Accept': 'application/json',
       'content-type': 'multipart/form-data',
      }

      await fetch(SERVER_URL, {
           method: 'POST',
           headers: header,
           body:enviofoto,
       }).then(response => response.json())
        .then(res => setFotoKm(res.name))
        .catch(err => console.log("err", err))
    }
    
    if (photos1) {
      
      let temps1 = photos1.assets[0];

      console.log('Serviço1', photos1.assets[0])

      let envios1 = {
        name: temps1.fileName,
        type: temps1.type,
        uri: temps1.uri
      }

      const enviofotos1 = new FormData();

      enviofotos1.append('file', envios1 )
      const header = {
       'Accept': 'application/json',
       'content-type': 'multipart/form-data',
      }

      await fetch(SERVER_URL, {
           method: 'POST',
           headers: header,
           body:enviofotos1,
       }).then(response => response.json())
        .then(res => setServico1(res.name))
        .catch(err => console.log("err", err))
    }

    if (photos2) {
      
      let temps2 = photos2.assets[0];

      console.log('Serviço2', photos2.assets[0])

      let envios2 = {
        name: temps2.fileName,
        type: temps2.type,
        uri: temps2.uri
      }

      const enviofotos2 = new FormData();

      enviofotos2.append('file', envios2 )
      const header = {
       'Accept': 'application/json',
       'content-type': 'multipart/form-data',
      }

      await fetch(SERVER_URL, {
           method: 'POST',
           headers: header,
           body:enviofotos2,
       }).then(response => response.json())
        .then(res => setServico2(res.name))
        .catch(err => console.log("err", err))
    }

    if (photos3) {
      
      let temps3 = photos3.assets[0];

      console.log('Serviço3', photos3.assets[0])

      let envios3 = {
        name: temps3.fileName,
        type: temps3.type,
        uri: temps3.uri
      }

      const enviofotos3 = new FormData();

      enviofotos3.append('file', envios3 )
      const header = {
       'Accept': 'application/json',
       'content-type': 'multipart/form-data',
      }

      await fetch(SERVER_URL, {
           method: 'POST',
           headers: header,
           body:enviofotos3,
       }).then(response => response.json())
        .then(res => setServico3(res.name))
        .catch(err => console.log("err", err))
    }

    if (photos4) {
      
      let temps4 = photos4.assets[0];

      console.log('Serviço4', photos4.assets[0])

      let envios4 = {
        name: temps4.fileName,
        type: temps4.type,
        uri: temps4.uri
      }

      const enviofotos4 = new FormData();

      enviofotos4.append('file', envios4 )
      const header = {
       'Accept': 'application/json',
       'content-type': 'multipart/form-data',
      }

      await fetch(SERVER_URL, {
           method: 'POST',
           headers: header,
           body:enviofotos4,
       }).then(response => response.json())
        .then(res => setServico4(res.name))
        .catch(err => console.log("err", err))
    }

    if (photos5) {
      
      let temps5 = photos5.assets[0];

      console.log('Serviço5', photos5.assets[0])

      let envios5 = {
        name: temps5.fileName,
        type: temps5.type,
        uri: temps5.uri
      }

      const enviofotos5 = new FormData();

      enviofotos5.append('file', envios5 )
      const header = {
       'Accept': 'application/json',
       'content-type': 'multipart/form-data',
      }

      await fetch(SERVER_URL, {
           method: 'POST',
           headers: header,
           body:enviofotos5,
       }).then(response => response.json())
        .then(res => setServico5(res.name))
        .catch(err => console.log("err", err))
    }

    if (photonf1) {
      
      let tempnf1 = photonf1.assets[0];

      console.log('NF1', tempnf1)

      let envionf1 = {
        name: tempnf1.fileName,
        type: tempnf1.type,
        uri: tempnf1.uri
      }

      const enviofotonf1 = new FormData();

      enviofotonf1.append('file', envionf1 )
      const header = {
       'Accept': 'application/json',
       'content-type': 'multipart/form-data',
      }

      await fetch(SERVER_URL, {
           method: 'POST',
           headers: header,
           body:enviofotonf1,
       }).then(response => response.json())
        .then(res => setNf1(res.name))
        .catch(err => console.log("err", err))
    }

    if (photonf2) {
      
      let tempnf2 = photonf2.assets[0];

      console.log('Nf2', tempnf2)

      let envionf2 = {
        name: tempnf2.fileName,
        type: tempnf2.type,
        uri: tempnf2.uri
      }

      const enviofotonf2 = new FormData();

      enviofotonf2.append('file', envionf2 )
      const header = {
       'Accept': 'application/json',
       'content-type': 'multipart/form-data',
      }

      await fetch(SERVER_URL, {
           method: 'POST',
           headers: header,
           body:enviofotonf2,
       }).then(response => response.json())
        .then(res => setNf2(res.name))
        .catch(err => console.log("err", err))
    }


    if (photonf3) {
      
      let tempnf3 = photonf3.assets[0];

      console.log('Nf3', tempnf3)

      let envionf3 = {
        name: tempnf3.fileName,
        type: tempnf3.type,
        uri: tempnf3.uri
      }

      const enviofotonf3 = new FormData();

      enviofotonf3.append('file', envionf3 )
      const header = {
       'Accept': 'application/json',
       'content-type': 'multipart/form-data',
      }

      await fetch(SERVER_URL, {
           method: 'POST',
           headers: header,
           body:enviofotonf3,
       }).then(response => response.json())
        .then(res => setNf3(res.name))
        .catch(err => console.log("err", err))
    }


    if (photonf4) {
      
      let tempnf4 = photonf4.assets[0];

      console.log('Nf4', tempnf4)

      let envionf4 = {
        name: tempnf4.fileName,
        type: tempnf4.type,
        uri: tempnf4.uri
      }

      const enviofotonf4 = new FormData();

      enviofotonf4.append('file', envionf4 )
      const header = {
       'Accept': 'application/json',
       'content-type': 'multipart/form-data',
      }

      await fetch(SERVER_URL, {
           method: 'POST',
           headers: header,
           body:enviofotonf4,
       }).then(response => response.json())
        .then(res => setNf4(res.name))
        .catch(err => console.log("err", err))
    }

    if (photonf5) {
      
      let tempnf5 = photonf5.assets[0];

      console.log('Nf5', tempnf5)

      let envionf5 = {
        name: tempnf5.fileName,
        type: tempnf5.type,
        uri: tempnf5.uri
      }

      const enviofotonf5 = new FormData();

      enviofotonf5.append('file', envionf5 )
      const header = {
       'Accept': 'application/json',
       'content-type': 'multipart/form-data',
      }

      await fetch(SERVER_URL, {
           method: 'POST',
           headers: header,
           body:enviofotonf5,
       }).then(response => response.json())
        .then(res => setNf5(res.name))
        .catch(err => console.log("err", err))
    }



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
                <Text> <Entypo name='camera' size={30} onPress={handleChoosePhoto} /> </Text>
                <Text style={styles.item}  onPress={handleChoosePhoto}> Foto painel</Text>
            </View>

            <View style={{ flex: 1,  justifyContent: 'space-evenly',  alignSelf: 'center', }}>
              {photo && (
                <>
                  <Image
                    source={{ uri: photo.assets[0].uri }}
                    style={{ width: 100, height: 100 }}
                  />
                  <Text style={styles.remover} onPress={ () => setPhoto(false) } > Remover &times; </Text>
                </>
              )}
              
            </View>

            <Text style={styles.item}> Fotos do serviço </Text>
            <View style={styles.blocoupload}>

              {!photos1 ? (
                <View>
                  <Text style={{color: '#fff'}} > <Entypo name='camera' color="#694000" size={30} onPress={handlePhotoServico1} /> </Text>
                  <Text style={{color: '#fff'}} onPress={handlePhotoServico1}>  Serviço1 </Text>
                </View>
                ) : (
                <View>
                  <Image
                    source={{ uri: photos1.assets[0].uri }}
                    style={{ width: 70, height: 70 }}
                  />  
                  <Text style={styles.remover} onPress={ () => setPhotoS1(false) } > Remover &times; </Text>      
                </View>
              )}

              {!photos2 ? (
                <View>
                  <Text style={{color: '#fff'}} > <Entypo name='camera' color="#694000" size={30} onPress={handlePhotoServico2} /> </Text>
                  <Text style={{color: '#fff'}} onPress={handlePhotoServico2}>  Serviço2 </Text>
                </View>
                ) : (
                <View>
                  <Image
                    source={{ uri: photos2.assets[0].uri }}
                    style={{ width: 70, height: 70 }}
                  />  
                  <Text style={styles.remover} onPress={ () => setPhotoS2(false) } > Remover &times; </Text>      
                </View>
              )}

              {!photos3 ? (
                <View>
                  <Text style={{color: '#fff'}} > <Entypo name='camera' color="#694000" size={30} onPress={handlePhotoServico3} /> </Text>
                  <Text style={{color: '#fff'}} onPress={handlePhotoServico3}>  Serviço3 </Text>
                </View>
                ) : (
                <View>
                  <Image
                    source={{ uri: photos3.assets[0].uri }}
                    style={{ width: 70, height: 70 }}
                  />  
                  <Text style={styles.remover} onPress={ () => setPhotoS3(false) } > Remover &times; </Text>      
                </View>
              )}

              {!photos4 ? (
                <View>
                  <Text style={{color: '#fff'}} > <Entypo name='camera' color="#694000" size={30} onPress={handlePhotoServico4} /> </Text>
                  <Text style={{color: '#fff'}} onPress={handlePhotoServico4}>  Serviço4 </Text>
                </View>
                ) : (
                <View>
                  <Image
                    source={{ uri: photos4.assets[0].uri }}
                    style={{ width: 70, height: 70 }}
                  />  
                  <Text style={styles.remover} onPress={ () => setPhotoS4(false) } > Remover &times; </Text>      
                </View>
              )}

              {!photos5 ? (
                <View>
                  <Text style={{color: '#fff'}} > <Entypo name='camera' color="#694000" size={30} onPress={handlePhotoServico5} /> </Text>
                  <Text style={{color: '#fff'}} onPress={handlePhotoServico5}>  Serviço5 </Text>
                </View>
                ) : (
                <View>
                  <Image
                    source={{ uri: photos5.assets[0].uri }}
                    style={{ width: 70, height: 70 }}
                  />  
                  <Text style={styles.remover} onPress={ () => setPhotoS5(false) } > Remover &times; </Text>      
                </View>
              )}

            </View>
             
            <Text style={styles.item}> Fotos de notas </Text>
            <View style={styles.blocoupload}>

              {!photonf1 ? (
                <View>
                  <Text style={{color: '#fff'}} > <Entypo name='camera' color="#694000" size={30} onPress={handlePhotoNF1} /> </Text>
                  <Text style={{color: '#fff'}} onPress={handlePhotoNF1}>  NF 1 </Text>
                </View>
                ) : (
                <View>
                  <Image
                    source={{ uri: photonf1.assets[0].uri }}
                    style={{ width: 70, height: 70 }}
                  />  
                  <Text style={styles.remover} onPress={ () => setPhotoNf1(false) } > Remover &times; </Text>      
                </View>
              )}

              {!photonf2 ? (
                <View>
                  <Text style={{color: '#fff'}} > <Entypo name='camera' color="#694000" size={30} onPress={handlePhotoNF2} /> </Text>
                  <Text style={{color: '#fff'}} onPress={handlePhotoNF2}>  NF2 </Text>
                </View>
                ) : (
                <View>
                  <Image
                    source={{ uri: photonf2.assets[0].uri }}
                    style={{ width: 70, height: 70 }}
                  />  
                  <Text style={styles.remover} onPress={ () => setPhotoNf2(false) } > Remover &times; </Text>      
                </View>
              )}

              {!photonf3 ? (
                <View>
                  <Text style={{color: '#fff'}} > <Entypo name='camera' color="#694000" size={30} onPress={handlePhotoNF3} /> </Text>
                  <Text style={{color: '#fff'}} onPress={handlePhotoNF3}>  NF3 </Text>
                </View>
                ) : (
                <View>
                  <Image
                    source={{ uri: photonf3.assets[0].uri }}
                    style={{ width: 70, height: 70 }}
                  />  
                  <Text style={styles.remover} onPress={ () => setPhotoNf3(false) } > Remover &times; </Text>      
                </View>
              )}

              {!photonf4 ? (
                <View>
                  <Text style={{color: '#fff'}} > <Entypo name='camera' color="#694000" size={30} onPress={handlePhotoNF4} /> </Text>
                  <Text style={{color: '#fff'}} onPress={handlePhotoNF4}>  NF4 </Text>
                </View>
                ) : (
                <View>
                  <Image
                    source={{ uri: photonf4.assets[0].uri }}
                    style={{ width: 70, height: 70 }}
                  />  
                  <Text style={styles.remover} onPress={ () => setPhotoNf4(false) } > Remover &times; </Text>      
                </View>
              )}

              {!photonf5 ? (
                <View>
                  <Text style={{color: '#fff'}} > <Entypo name='camera' color="#694000" size={30} onPress={handlePhotoNF5} /> </Text>
                  <Text style={{color: '#fff'}} onPress={handlePhotoNF5}>  NF5 </Text>
                </View>
                ) : (
                <View>
                  <Image
                    source={{ uri: photonf5.assets[0].uri }}
                    style={{ width: 70, height: 70 }}
                  />  
                  <Text style={styles.remover} onPress={ () => setPhotoNf5(false) } > Remover &times; </Text>      
                </View>
              )}

            </View>

            <Button  style={{marginBottom: 80}} onPress={() => handleSubmit()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Salvar </Button>
           
        </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
)
}