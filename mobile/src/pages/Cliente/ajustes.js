import React, {useRef, useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import {Text, View, Image, StyleSheet, Dimensions, StatusBar, ScrollView,KeyboardAvoidingView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SelectDropdown from 'react-native-select-dropdown'
import { celMask, cepMask, cpfMask, cnpjMask } from '../../components/masks';
import CadastroClienteDataService from '../../services/cadastrocliente';
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
  remover: {
    color: '#ff2010',
    borderBottomColor: '#ff2000',
    borderBottomWidth: 3,
    fontWeight: 'bold',
    width: 75,
  }
});


export default function Ajustes  ({ navigation }) {

  const SERVER_URL = 'http://10.0.2.2:5099/api/veiculosmanutencoes/files';
  const URL = 'http://10.0.2.2:5099/files/'

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

  const [clienteId, setClienteId] = useState('');
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
  const [photo, setPhoto] = useState(null)
  const [foto, setFoto] = useState('');
  const [novafoto, setNovaFoto] = useState('');

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
      setClienteId(temp[0].id)      
      setNome(temp[0].nome);
      setCpf(temp[0].cpf);
      setApelido(temp[0].apelido);
      setCelular(temp[0].celular);
      setCep(temp[0].cep.toString());
      setEndereco(temp[0].endereco);
      setNumero(temp[0].numero);
      setComplemento(temp[0].complemento);
      setBairro(temp[0].bairro);
      setCidade(temp[0].cidade);
      setUf(temp[0].uf);
      setCnpj(temp[0].cnpj);
      setSexo(temp[0].sexo);
      setFoto(temp[0].foto);

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
            
      <Button style={{marginBottom: 150}} onPress={() => handleSubmit()}> <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Alterar </Button>
 
    </>
  }

  if (cliente && cliente.tipo === 2) {
    mostrar = <>
    

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
            
            <Button style={{marginBottom: 150}} onPress={() => handleSubmit()}> <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Alterar </Button>
 
    </>
  }

  async function handleSubmit() {

    var data = {
        nome: nome,        
        apelido: apelido,
        sexo: sexo,
        cpf: cpf,
        cnpj: cnpj,
        celular: celular,
        cep: parseInt(cep.replace('.', '').replace('-', '')),
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        uf: uf
      }
      

      await CadastroClienteDataService.editar(cliente.id, data)
      .then( response  =>  {   
        setAlterar(false);
      })
      .catch(e => {
        console.error(e)
      }) 
    }

  async function handleFoto () {

     if (photo) {
      handleUploadPhoto();      
    }
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
        .then(res => {
          setNovaFoto(res.name);
          alterar();
          setFoto(res.name);

        })
        .catch(err => console.log("err", err))
    }
  }

  async function alterar () {
    var data = {
      foto: novafoto
    }

    await CadastroClienteDataService.editar(clienteId, data)
    .then( response  =>  {       
      
    })
    .catch(e => {
      console.error(e)
    }) 

    setPhoto(false)
    
  }


  return (
    <View>
      <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>   
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>  
        <ScrollView>
            <View>
            <Text style={styles.titulo}> Meus dados </Text>
            {foto !== '' ? (
              <>
              <Image
                source={{ uri: URL+foto }}
                style={{ width: 150, height: 150, alignSelf: 'center' }}
              />
              </>
              ) : (
              <>
                <Image
                source={require('../../img/avatar.png')}
                style={{ width: 100, height: 100, alignSelf: 'center' }}
                resizeMode="cover"
                />
              </>
              )
            }


            <View style={styles.toogle}>
                  <Text onPress={() => handleChoosePhoto()} > <Entypo name='user' size={30} /> </Text>
                  <Text style={styles.titulo} onPress={() => handleChoosePhoto()} > Upload de foto</Text>
                </View>

                
                {photo && (
                  <>
                  <View style={{ flex: 1,  justifyContent: 'space-evenly',  alignSelf: 'center', }}>
                    <Image
                      source={{ uri: photo.assets[0].uri }}
                      style={{ width: 100, height: 100, marginTop: 30 }}
                    />
                    <Text style={styles.remover} onPress={ () => setPhoto(false) } > Remover &times; </Text>

                  </View>
                  <Text style={styles.entrar} onPress={ () => handleUploadPhoto() } > Enviar </Text>
                  
                  </>
                )}
            
              

            {cliente !== '' && alterado === false && <View>
              <View style={styles.bordado}>
                <Text style={styles.titulo}>Nome: {nome} </Text>
                <Text style={styles.titulo}>Celular: {celular} </Text>
                <Text style={styles.titulo}>{endereco} - {numero} - {bairro} </Text>
                <Text style={styles.titulo}>{cidade} - {uf} </Text>
              </View>
              <Text style={{textAlign: 'right', color: '#fff', fontSize: 20}} onPress={() => setAlterar(true)}> 
              <Entypo name="pencil" size={20} /> Alterar dados 
              </Text>
            </View>
            }

            {cliente !== '' && alterado === true && <>
              <View>                
                {mostrar}
              </View>
            </>
            }

            {!cliente && <>

                <Text style={styles.titulo}> Sem informações </Text>
              </>}
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
  </View>
)

}