import React, {useRef, useState} from 'react';

import { Text, View, StyleSheet, Dimensions, StatusBar, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { Switch } from 'react-native-paper';
import Input from '../../components/Input';
//import { TextInput } from 'react-native-paper';
import Button from '../../components/Button';




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
  toggle: {      
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    fontFamily: 'Open Sans',
    color: '#fafafa',
    fontSize: 25,
    fontWeight: 'bold',       
    marginTop: 10
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



export default function Atividades  ({ navigation }) {
  const presencialRef = useRef();
  const remotaRef = useRef();

  const [isMecanicaOn, setIsMecanicaOn] = useState('');
  const [isFunilariaOn, setIsFunilariaOn] = useState('');
  const [isVistoriaOn, setIsVistoriaOn] = useState('');
  const [isPreCompraOn, setIsPreCompraOn] = useState('');
  const [isEquipamentosOn, setIsEquipamentosOn] = useState('');

  const [descricao, setDescricao] = useState('');
  const [presencial, setPresencial] = useState('');
  const [remota, setRemota] = useState('');

  function submit () {

  }
 
  
  return (
    <View>            
        <StatusBar barStyle="light-content" backgroundColor="#ffad26" />
        
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
            <ScrollView >
                <Text style={styles.titulo}> Escolha seus serviços:</Text>
                <Text style={styles.toggle}> Conhecimento em mecânica <Switch value={isMecanicaOn} onValueChange={setIsMecanicaOn} /> </Text> 
                
                <Text style={styles.toggle}> Conhecimento em funilaria  <Switch value={isFunilariaOn} onValueChange={setIsFunilariaOn} /> </Text> 
                <Text style={styles.toggle}> Realiza vistoria   <Switch value={isVistoriaOn} onValueChange={setIsVistoriaOn} /> </Text> 
                <Text style={styles.toggle}> Pré compra   <Switch value={isPreCompraOn} onValueChange={setIsPreCompraOn} /> </Text> 
                <Text style={styles.toggle}> Equipamentos   <Switch value={isEquipamentosOn} onValueChange={setIsEquipamentosOn} /> </Text> 
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
                //mode="outlined"     
                multiline={true}
                numberOfLines={5}
                placeholder='Resumo do meu trabalho' 
                placeholderTextColor="#f2f2f2" 
                //right={<TextInput.Affix text="/255"  />}
                
                 /> 
                <Input 
                 style={{marginTop: 10}}
                 value={presencial}
                 keyboardType="number-pad"
                 onChangeText={setPresencial} 
                 ref={presencialRef}
                 autoCorrect={false}
                 placeholder='Consulta presencial R$'
                 returnKeyType="next"
                 onSubmitEditing={() => remotaRef.current.focus()} /> 
                <Input 
                style={{marginTop: 10}}
                value={remota}
                onChangeText={setRemota} 
                keyboardType="number-pad"
                ref={remotaRef}
                autoCorrect={false}
                placeholder='Consulta remota R$'
                onSubmitEditing={() => submit()}  /> 
                
                <Text style={styles.entrar} onPress={() => navigation.navigate('ParceiroLogin')} > <Entypo name="level-down" size={30} color="#d2d2d2" /> Salvar </Text>
                <Text  style={{margin: 30}}> </Text>
                
            </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
  </View>
)}