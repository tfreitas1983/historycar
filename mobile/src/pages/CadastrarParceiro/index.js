import React, {useRef, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, StatusBar, KeyboardAvoidingView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from "react-redux";
import Input from '../../components/Input';
import Button from '../../components/Button';
import user from '../../store/modules/user/reducer';

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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    color:'#fff',
    fontSize: 20,
    marginTop: 10,
    width: Dimensions.get('window').width,
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
    marginBottom: 80,
    padding: 5,
    textAlign: 'center',
    width: Dimensions.get('window').width
  }
});

export default function CadastrarParceiro  ({ navigation }) { 

  const passwordRef = useRef();
  const nomeRef = useRef();
  const cpfRef = useRef();
  const apelidoRef = useRef();
  const celularRef = useRef();
  const cepRef = useRef();
  const enderecoRef = useRef();
  const complementoRef = useRef();
  const numeroRef = useRef();
  const bairroRef = useRef();
  const cidadeRef = useRef();
  const ufRef = useRef();


  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [apelido, setApelido] = useState('');
  const [celular, setCelular] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  function handleSubmit () {
   
  }

  return (
    <View>            
        <StatusBar barStyle="light-content" backgroundColor="#ffad26" />
        
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          <ScrollView>
            <Text style={styles.titulo}>Entre com seus dados:</Text>   
            
            <Input 
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              icon="mail-outline" 
              placeholder="Digite seu e-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={email}
              onChangeText={setEmail} />

            <Input 
            style={{marginTop: 10, color: '#fff'}} 
            icon="lock" 
            secureTextEntry
            placeholder="Digite a sua senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => nomeRef.current.focus()}
            value={password}
            onChangeText={setPassword}
              />

            <Input 
              
              
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="Nome ou Razão Social"
              returnKeyType="next"
              onSubmitEditing={() => cpfRef.current.focus()}
              value={nome}
              ref={nomeRef}
              onChangeText={setNome} />

            <Input           
              keyboardType="number-pad"    
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="CPF"
              ref={cpfRef}
              returnKeyType="next"
              onSubmitEditing={() => apelidoRef.current.focus()}
              value={cpf}
              onChangeText={setCpf} />

            <Input     
              keyboardType="default"          
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="Apelido"
              ref={apelidoRef}
              returnKeyType="next"
              onSubmitEditing={() => celularRef.current.focus()}
              value={apelido}
              onChangeText={setApelido} />

            <Input               
              keyboardType="phone-pad" 
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="Celular"
              ref={celularRef}
              returnKeyType="next"
              onSubmitEditing={() => cepRef.current.focus()}
              value={celular}
              onChangeText={setCelular} />

            <Input       
              keyboardType="number-pad"         
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="CEP"
              ref={cepRef}
              returnKeyType="next"
              onSubmitEditing={() => enderecoRef.current.focus()}
              value={cep}
              onChangeText={setCep} />
            
            <Input 
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="Endereço"
              returnKeyType="next"
              onSubmitEditing={() => complementoRef.current.focus()}
              ref={enderecoRef}
              value={endereco}
              onChangeText={setEndereco} />

            <Input 
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="Complemento"
              returnKeyType="next"
              onSubmitEditing={() => numeroRef.current.focus()}
              ref={complementoRef}
              value={complemento}
              onChangeText={setComplemento} />
              
            <Input 
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="Número"
              returnKeyType="next"
              onSubmitEditing={() => bairroRef.current.focus()}
              ref={numeroRef}
              value={numero}
              onChangeText={setNumero} />

              
            <Input 
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="Bairro"
              returnKeyType="next"
              onSubmitEditing={() => cidadeRef.current.focus()}
              ref={bairroRef}
              value={bairro}
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
              value={cidade}
              onChangeText={setCidade} />

            
            <Input 
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="UF"
              returnKeyType="next"
              onSubmitEditing={() => handleSubmit()}
              ref={ufRef}
              value={uf}
              onChangeText={setUf} />        
            
            <Text style={styles.enviar}  onPress={() => navigation.navigate('Atividades')} > <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Cadastrar </Text>
            <Button style={{marginBottom: 150}} onPress={() => handleSubmit()}> Cadastrar </Button>
           
          </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
    </View>
);

}