import React, {useRef, useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import {Text, View, StyleSheet, Dimensions, StatusBar, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SelectDropdown from 'react-native-select-dropdown'
import { celMask, cepMask, cpfMask, cnpjMask } from '../../components/masks';
import CadastroClienteDataService from '../../services/cadastrocliente';

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
    justifyContent: 'space-between',
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


export default function Ajustes  ({ navigation }) {

  const userId = useSelector(state => state.auth.id);
  const [cliente, setCliente] = useState('');
  const [alterado, setAlterar] = useState(false);

  const nomeRef = useRef();  
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

  const dados = ["Feminino", "Masculino"];


  let mostrar = null;

  useEffect( () => { 
   PegaCliente()   
    
  }, [])

  async function PegaCliente () {
    let respcliente = await CadastroClienteDataService.buscarusuario(userId)
    .then( response => {
      let temp = response.data
      setCliente(temp[0])      
      console.log('cliente', cliente)
    })    
    .catch( e =>  {
      console.error(e);
    })

    respcliente = await respcliente;
  }

  if (cliente && cliente.tipo === 1) {
    mostrar = <>
    

    <SelectDropdown
      data={dados.map(item => {return item})}
      defaultButtonText="Selecione o sexo"              
      buttonStyle={styles.bordado}
      buttonTextStyle={{color: '#fff', fontWeight: 'bold'}}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index)
        setSexo(selectedItem)
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem
      }}
      rowTextForSelection={(item, index) => {
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
        maxLength={9}
        ref={cepRef}
        returnKeyType="next"
        onSubmitEditing={() => pegaCEP()}
        value={cepMask(cep)}
        onChangeText={setCep} />
            
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
        onSubmitEditing={() => handleSubmit()}
        ref={ufRef}
        value={uf.toUpperCase()}
        onChangeText={setUf} />        
            
      <Button style={{marginBottom: 150}} onPress={() => handleSubmit()}> <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Cadastrar </Button>
 
    </>
  }

  if (cliente && cliente.tipo === 2) {
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
              maxLength={9}
              ref={cepRef}
              returnKeyType="next"
              onSubmitEditing={() => pegaCEP()}
              value={cepMask(cep)}
              onChangeText={setCep} />
            
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
              onSubmitEditing={() => handleSubmit()}
              ref={ufRef}
              value={uf.toUpperCase()}
              onChangeText={setUf} />        
            
            <Button style={{marginBottom: 150}} onPress={() => handleSubmit()}> <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Cadastrar </Button>
 
    </>
  }

  return (
    <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <ScrollView>
            <Text style={styles.titulo}> Meus dados </Text>
            {cliente && alterado === false && <>
              <View style={styles.bordado}>
                <Text style={styles.titulo}>Nome: {cliente.nome } </Text>
                <Text style={styles.titulo}>Celular: {cliente.celular } </Text>
                <Text style={styles.titulo}>{cliente.endereco } - {cliente.numero} - {cliente.bairro} </Text>
                <Text style={styles.titulo}>{cliente.cidade } - {cliente.uf} </Text>
              </View>
              <Text style={{textAlign: 'right', color: '#fff', fontSize: 20}} onPress={() => setAlterar(true)}> 
              <Entypo name="pencil" size={20} /> Alterar dados 
              </Text>
            </>
            }

            {cliente && alterado === true && <>
              <View>
                
                {mostrar}
              </View>
            </>
            }

        </ScrollView>
        </LinearGradient>
    </View>
)

}