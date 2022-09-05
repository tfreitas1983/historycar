import React, {useRef, useState}  from 'react';
import EmailDataService from '../../services/email';
import { Text, View, StyleSheet, Dimensions, ImageBackground, StatusBar, Alert} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

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
    color:'#fff',
    fontSize: 20,
    marginTop: -100
  },
  opcoes: {
    fontFamily: 'Open Sans',
    color: '#b2b2b2',
    backgroundColor: '#f2f2f2',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    fontSize: 35,
    marginTop: 20,
    padding: 5,
    textAlign: 'center',
    width: Dimensions.get('window').width
  },
  enviar:{
    fontFamily: 'Open Sans',
    color: '#d2d2d2',
    backgroundColor: 'transparent',//'#ff7522',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    fontSize: 35,
    marginTop: 20,
    padding: 5,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.7
  },
  mensagem: {
    color: '#fff',
    backgroundColor: '#ff2010',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#ff2000',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.95
  },
  sucesso: {
    color: '#fff',
    backgroundColor: '#208810',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#128808',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.95
  }
});

export default function Esqueci () {

  const [email, setEmail] = useState('cliente7@gmail.com');
  const [msg, setMsg] = useState('');
  const [msgSucesso, setMsgSucesso] = useState('');


  async function handleSubmit () {
    setMsg('');
    if (email === '') {
      Alert.alert('Digite um e-mail válido')
      return
    }

    EmailDataService.existe(email)
    .then(response => {
      if (response.data.length > 0) {
        esqueci();        
      } else {
        setMsg('E-mail não encontrado. Por favor, verifique!')
        
      }
    })
    .catch(e => {
      console.error(e)
    })
   
  }

  async function esqueci () {

    var acao = "esqueci";

    await EmailDataService.esqueci(email, acao)
    .then(response => {
      setMsgSucesso('Sua nova senha foi enviada para seu e-mail');
    })
    .catch(e => {
      console.error(e)
    })
  }

  return (
      <View>            
          <StatusBar barStyle="light-content" backgroundColor="#ffad26" />
          
          <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
      
              <Text style={styles.titulo}>Entre com seu e-mail abaixo:</Text>   
      
              <Input 
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 30, color: '#fff'}} 
              icon="mail-outline" 
              autoFocus={true}
              placeholder="Digite seu e-mail"
              returnKeyType="next"
              onSubmitEditing={() => handleSubmit()}
              value={email}
              onChangeText={setEmail} />

              {msg !== '' && 
                <>
                  <Text style={styles.mensagem}>{msg}</Text>
                </>
              }
              {msgSucesso !== '' && 
                <>
                  <Text style={styles.sucesso}>{msgSucesso}</Text>
                </>
              }

              
              <Button  onPress={() => handleSubmit()}> <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Enviar </Button>
              
          </LinearGradient>
      </View>
  )
}