import React, {useRef, useState} from 'react';
import { useSelector } from "react-redux";
import {Text, TextInput, View, StyleSheet, Dimensions, StatusBar, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SuporteDataService from '../../services/suporte';
import EmailDataService from '../../services/email';
import ManutencaoDataService from '../../services/manutencoes';
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
  remover: {
    color: '#ff2010',
    borderBottomColor: '#ff2000',
    borderBottomWidth: 3,
    fontWeight: 'bold',
    width: 75,
  }
});

export default function Suporte  ({ navigation }) {

  const SERVER_URL = 'http://10.0.2.2:5099/api/veiculosmanutencoes/files';

  const userId = useSelector(state => state.auth.id);
  const [descricao, setDescricao] = useState('');
  const [assunto, setAssunto] = useState('');
  const [photo, setPhoto] = useState(null)
  const [foto, setFoto] = useState('');
  const [msg, setMsg] = useState('');
  const [suporteId, setSuporteId] = useState('');
  const descricaoRef = useRef(); 
  const assuntoRef = useRef(); 

  
  async function handleSubmit() {

    if (photo) {
      handleUploadPhoto();      
    }

    var data = {
      assunto: assunto,
      descricao: descricao,
      foto: foto,
      userId: userId,
      situacao: 1      
    } 

    var acao = 'suporte';

    await SuporteDataService.cadastrar(data)
    .then( response  =>  {  
      setSuporteId(response.data.id)
      console.log('resp suporte', response.data)
    })
    .catch(e => {
      console.error(e)
    })  

    await EmailDataService.suporte(userId, suporteId, acao)
    .then( response  =>  {  
      setMsg('Solicitação enviada com sucesso.')
    })
    .catch(e => {
      console.error(e)
    })  
  }

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhoto(response);
      }
    });
  };

  async function handleUploadPhoto  () {    

    if (photo) {
      
      let formdata = photo.assets[0];
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
        .then(res => setFoto(res.name))
        .catch(err => console.log("err", err))
    }
  }

  return (
    <View>
      <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>  
          <ScrollView>
              {!msg ? (
                <>
                <Text style={styles.titulo}> Envie sua dúvida ou solicitação </Text>
                <Input
                autoCorrect={false}
                autoCapitalize="none"
                style={{marginTop: 10, color: '#fff'}} 
                placeholder="Assunto"
                returnKeyType="next"
                onSubmitEditing={() => descricaoRef.current.focus()}
                value={assunto.toUpperCase()}
                ref={assuntoRef}
                onChangeText={setAssunto} />


                <TextInput 
                style={{
                  backgroundColor: 'transparent', 
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: '#dfdfdf', 
                  color: '#FFFFFF',
                  fontSize: 20,
                  marginTop: 10
                }}
                autoCorrect={false}
                value={descricao} 
                onChangeText={setDescricao} 
                multiline={true}
                numberOfLines={5}
                ref={descricaoRef}
                placeholder='Descreva sua solicitação' 
                placeholderTextColor="#f2f2f2" 
                /> 
                
                <View style={styles.toogle}>
                  <Text onPress={() => handleChoosePhoto()} > <Entypo name='upload' size={30} /> </Text>
                  <Text style={styles.titulo} onPress={() => handleChoosePhoto()} > Upload de foto</Text>
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

                <Button style={{marginBottom: 150}} onPress={() => handleSubmit()}> <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Enviar </Button>

                </>
              ) : (
                <View>
                  <Text style={styles.titulo}>  {msg} </Text>
                </View>
              )}
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
)

}