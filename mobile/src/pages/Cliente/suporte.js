import React, {useRef, useState} from 'react';
import { useSelector } from "react-redux";
import {Text, TextInput, View, StyleSheet, Dimensions, StatusBar, ScrollView, KeyboardAvoidingView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SuporteDataService from '../../services/suporte';

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
});



export default function Suporte  ({ navigation }) {

  const userId = useSelector(state => state.auth.id);
  const [descricao, setDescricao] = useState('');
  const [assunto, setAssunto] = useState('');
  const [foto, setFoto] = useState('');
  const descricaoRef = useRef(); 
  const assuntoRef = useRef(); 

  
  async function handleSubmit() {
    var data = {
      assunto: assunto,
      descricao: descricao,
      userId: userId,
      situacao: 1      
    } 


    await SuporteDataService.cadastrar(data)
    .then( response  =>  {  
      console.log('cadastrar', response.data)
    })
    .catch(e => {
      console.error(e)
    })  
  }

  return (
    <View>
      <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>  
          <ScrollView>
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
              <Text> <Entypo name='upload' size={30} /> </Text>
              <Text style={styles.titulo}> Upload de arquivo</Text>
              </View>

              <Button style={{marginBottom: 150}} onPress={() => handleSubmit()}> <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Enviar </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
)

}