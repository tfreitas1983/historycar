import React, {useRef, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, StatusBar, KeyboardAvoidingView, Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from "react-redux";
import Input from '../../components/Input';
import Button from '../../components/Button';
import SelectDropdown from 'react-native-select-dropdown'
import { celMask, cepMask, cpfMask, cnpjMask } from '../../components/masks';
import CadastroClienteDataService from '../../services/cadastrocliente'
import Auth from '../../services/auth.service'

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
  },
  centro: {      
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    fontFamily: 'Open Sans',
    color: '#fafafa',
    fontSize: 25,
    fontWeight: 'bold',       
    marginTop: 10,
    width: Dimensions.get('window').width
  },
  esquerda: {
    fontFamily: 'Open Sans',
    color: '#fff',
    backgroundColor: 'transparent',//'#ff7522',
    borderWidth: 3,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderRightWidth: 2,
    borderColor: '#fff',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 80,
    padding: 5,
    textAlign: 'center',
  },
  direita: {
    fontFamily: 'Open Sans',
    color: '#fff',
    backgroundColor: 'transparent',//'#ff7522',
    borderWidth: 3,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderLeftWidth: 2,
    borderColor: '#fff',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 80,
    padding: 5,
    textAlign: 'center',
  },
  bordado : {
    fontFamily: 'Open Sans',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold', 
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    padding:8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    width: Dimensions.get('window').width,
  }
});

export default function Cadastrar  ({ navigation }) { 

  const passwordRef = useRef();
  const tipoRef = useRef();
  const nomeRef = useRef();
  const razaoRef = useRef();
  const cpfRef = useRef();
  const cnpjRef = useRef();
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
  const [tipo, setTipo] = useState('');
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [apelido, setApelido] = useState('');
  const [celular, setCelular] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  //const [userId, setUserId] = useState('');
  const dados = ["Feminino", "Masculino"];


  let mostrar = null;

  if (tipo === 'fisica') {
    mostrar = <>
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

            <SelectDropdown
              data={dados.map(item => {return item})}
              defaultButtonText="Selecione o sexo"
              buttonStyle={styles.bordado}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setSexo(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />

            <Input 
              
              
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => cpfRef.current.focus()}
              value={nome.toUpperCase()}
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
              value={cpfMask(cpf)}
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
              value={apelido.toUpperCase()}
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
              value={celMask(celular)}
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
              value={cepMask(cep)}
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
              value={endereco.toUpperCase()}
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
              value={complemento.toUpperCase()}
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
              value={numero.toUpperCase()}
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
              onSubmitEditing={() => handleSubmit()}
              ref={ufRef}
              value={uf.toUpperCase()}
              onChangeText={setUf} />        
            

 
    </>
  }

  if (tipo === 'juridica') {
    mostrar = <>
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
              placeholder="Razão Social"
              returnKeyType="next"
              onSubmitEditing={() => cnpjRef.current.focus()}
              value={nome.toUpperCase()}
              ref={nomeRef}
              onChangeText={setNome} />

            <Input           
              keyboardType="number-pad"    
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="CNPJ"
              ref={cnpjRef}
              returnKeyType="next"
              onSubmitEditing={() => apelidoRef.current.focus()}
              value={cnpjMask(cnpj)}
              onChangeText={setCnpj} />

            <Input     
              keyboardType="default"          
              autoCorrect={false}
              autoCapitalize="none"
              style={{marginTop: 10, color: '#fff'}} 
              placeholder="Apelido"
              ref={apelidoRef}
              returnKeyType="next"
              onSubmitEditing={() => celularRef.current.focus()}
              value={apelido.toUpperCase()}
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
              value={celMask(celular)}
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
              value={cepMask(cep)}
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
              value={endereco.toUpperCase()}
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
              value={complemento.toUpperCase()}
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
              value={numero.toUpperCase()}
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
              onSubmitEditing={() => handleSubmit()}
              ref={ufRef}
              value={uf.toUpperCase()}
              onChangeText={setUf} />        
            

 
    </>
  }

  let cabecalho = null;
  let userId = null;

  if (tipo === '') {
    cabecalho = <>
      <View style={styles.centro}>
        <Text style={styles.esquerda} onPress={() => setTipo('fisica')}>    Física   </Text>
        <Text style={styles.direita}  onPress={() => setTipo('juridica')}>   Jurídica   </Text>
      </View>
    </>
  }

  

  async function handleSubmit () {
    escolhido = null;   
    console.log('primeiro', userId)
    await Auth.register(email, password, 2, 1)
    .then( response  =>  {  
      userId = response.data.id;      
      console.log('response',response.data); 
    })
    .catch(e => {
      console.error(e)
    })

    if (userId === '') {
     
      console.log('vazio', userId)   
      Alert.alert('Nenhum Id')     
    } else {
      salvaCliente();
    }
           
  }

  async function salvaCliente () {

    console.log('entrou')
    
    if (tipo === 'fisica') {
      escolhido = 1
    }

    if (tipo === 'juridica') {
      escolhido = 2
    }

    //Precisa criar o usuário e pegar o id para salvar o cliente
    
    console.log('ID2', userId);

    if (!userId) {
      Alert.alert('Nenhum ID foi retornado');  
    } else {
       
      var data = {
        nome: nome,
        tipo: escolhido,
        apelido: apelido,
        sexo: sexo,
        cpf: cpf,
        cnpj: cnpj,
        celular: celular,
        cep: cep,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        situacao: 1,
        userId: userId
      }


      console.log('data', data)
      await CadastroClienteDataService.cadastrar(data)
      .then( response  =>  {               
        console.log('cliente',response.data); 
        Alert.alert('Cliente cadastrado')
        navigation.navigate('Cliente')
      })
      .catch(e => {
        console.error(e)
      })

    }

    

  }

 

  

  return (
    <View>            
        <StatusBar barStyle="light-content" backgroundColor="#ffad26" />
        
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          <ScrollView>
            <Text style={styles.titulo}>Escolha o tipo e entre com seus dados:</Text>   
            
           {cabecalho}

            {mostrar}

            <Button style={{marginBottom: 150}} onPress={() => handleSubmit()}> Cadastrar </Button>
           
          </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
    </View>
);

}