import React, {useRef, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, StatusBar, Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useDispatch, useSelector } from "react-redux";
import {signInRequest} from '../../store/modules/auth/actions';


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
  },
  opcoes: {
    fontFamily: 'Open Sans',
    color: '#b2b2b2',
    backgroundColor: '#f2f2f2',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    fontSize: 40,
    marginTop: 20,
    padding: 5,
    textAlign: 'center',
    width: Dimensions.get('window').width
  },
  entrar:{
    fontFamily: 'Open Sans',
    color: '#d2d2d2',
    backgroundColor: 'transparent',//'#ff7522',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    fontSize: 40,
    marginTop: 20,
    padding: 5,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.7
  },
  forgot: {
    color: '#eeefff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',    
    marginTop: 50
  },
  cadastrar: {
    color: '#eeefff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '30%'
  },
});


export default function ParceiroLogin  ({ navigation }) {
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('juvenal@gmail.com');
  const [password, setPassword] = useState('123456');
  const signed = useSelector(state => state.auth.signed);
  const tipo = useSelector(state => state.auth.tipo);
  const situacao = useSelector(state => state.auth.situacao);

  async function handleSubmit () {

    if (email ==='' ||password === '') {
      Alert.alert('Digite um e-mail e/ou senha válidos')
      return
    }
    
    await dispatch(signInRequest(email, password));

    if (situacao === 0) {
      Alert.alert('Seu login está inativo')
    }

    if (signed === true && tipo === 1 && situacao === true) {
      navigation.navigate('HomeParceiro')
    } else {
      Alert.alert('Suas credenciais são inválidas ou seu acesso é de cliente')
      return
    }
   
  }

  return (
    <View>            
        <StatusBar barStyle="light-content" backgroundColor="#ffad26" />
        
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
          
            <Text style={styles.titulo}>Entre com seu e-mail e senha abaixo:</Text>   
            
            <Input 
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 30, color: '#fff'}} 
              icon="mail-outline" 
              placeholder="Digite seu e-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={email}
              onChangeText={setEmail} />

            <Input 
            style={{marginTop: 30, color: '#fff'}} 
            icon="lock" 
            secureTextEntry
            placeholder="Digite a sua senha"
            ref={passwordRef}
            returnKeyType="send"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => handleSubmit()}
              />
            
            <Button  onPress={() => handleSubmit()}>  Entrar </Button>
           
            <Text style={styles.cadastrar}  onPress={() => navigation.navigate('CadastrarParceiro')}> <Entypo name="add-user" size={45} color="#000" /> Cadastrar-me</Text>
            <Text style={styles.forgot} onPress={() => navigation.navigate('Esqueci')}> Esqueci minha senha</Text>
        </LinearGradient>
  </View>
  )}