import React, {useRef, useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import {Text, View, TextInput, Image, StyleSheet, Dimensions, StatusBar, ActivityIndicator,ScrollView,KeyboardAvoidingView, Switch} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SelectDropdown from 'react-native-select-dropdown'
import { celMask, cepMask, cpfMask, cnpjMask, moedaMask} from '../../components/masks';
import CadastroParceiroDataService from '../../services/cadastroparceiro';
import ParceiroPrecoDataService from '../../services/parceiropreco';
import ManutencaoDataService from '../../services/manutencoes';
import { launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()

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


export default function AjustesParceiro  ({ navigation }) {

  const SERVER_URL = 'http://10.0.2.2:5099/api/veiculosmanutencoes/files';
  const URL = 'http://10.0.2.2:5099/files/'

  const userId = useSelector(state => state.auth.id);
  const [parceiro, setParceiro] = useState('');
  const [alterado, setAlterar] = useState(false);
  const [atividades, setAtividades] = useState(false);

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
  const presencialRef = useRef();
  const remotaRef = useRef();

  const [parceiroId, setParceiroId] = useState('');
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
   
  const [photo, setPhoto] = useState(null);
  const [foto, setFoto] = useState('');
  const [novafoto, setNovaFoto] = useState('');

  const dados = ["Feminino", "Masculino"];
  const ramos = ["Caçador de veículos", "Despachante", "Ambos"];
  const [parceiroprecoId, setParceiroPrecoId] = useState('');
  const [mecanica, setMecanica] = useState('');
  const [equipamentos, setEquipamentos] = useState('');
  const [precompra, setPrecompra] = useState('');
  const [vistoria, setVistoria] = useState('');
  const [funilaria, setFunilaria] = useState('');
  const [resumo, setResumo] = useState('');
  const [selecionada, setSelecionada] = useState('');
  const [idSelecionada, setIdSelecionada] = useState('');
  const [remotomoeda, setRemotoMoeda] = useState('');
  const [presencialmoeda, setPresencialMoeda] = useState('');
  const [remotoantigo, setRemotoAntigo] = useState('');
  const [presencialantigo, setPresencialAntigo] = useState('');
  const [ramo, setRamo] = useState('');
  const [reputacao, setReputacao] = useState('');
  const [loading, setLoading] = useState(false);

  let mostrar = null;

  useEffect( () => { 
   PegaParceiro();
   setLoading(true);

    
  }, [])

  async function PegaParceiro () {
    let respparceiro = await CadastroParceiroDataService.buscarusuario(userId)
    .then( response => {
      let temp = response.data;
      setParceiro(temp[0]);
      setParceiroId(temp[0].id);
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
      setMecanica(temp[0].mecanica);
      setFunilaria(temp[0].funilaria);
      setEquipamentos(temp[0].equipamentos);
      setVistoria(temp[0].vistoria);
      setPrecompra(temp[0].precompra);
      setResumo(temp[0].resumo);
      setFoto(temp[0].foto);
      setRamo(temp[0].ramo);
      setReputacao(temp[0].reputacao);
      setRemotoMoeda(temp[0].parceiros_precos[0].remoto);
      setPresencialMoeda(temp[0].parceiros_precos[0].presencial);
      setRemotoAntigo(temp[0].parceiros_precos[0].remoto);
      setPresencialAntigo(temp[0].parceiros_precos[0].presencial);
      setParceiroPrecoId(temp[0].parceiros_precos[0].id);

    })    
    .catch( e =>  {
      console.error(e);
    })

    respparceiro = await respparceiro;
    setLoading(false);
  }

  if (parceiro && parceiro.tipo === 1 && atividades === false) {
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
            
      <Button onPress={() => handleSubmit()}> <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Alterar </Button>
      <Button style={{marginBottom: 200}} onPress={() => setAlterar(false)}> <Entypo name="back" size={30} color="#d2d2d2" /> Voltar </Button>
    </>
  }

  if (parceiro && parceiro.tipo === 2 && atividades === false) {
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
            
            <Button onPress={() => handleSubmit()}> <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Alterar </Button>
            <Button style={{marginBottom: 200}} onPress={() => setAlterar(false)}> <Entypo name="back" size={30} color="#d2d2d2" /> Voltar </Button>
    </>
  }

  if (parceiro && atividades === true) {
    mostrar = <>
      <Text style={styles.titulo}> Habilidades </Text>
      <View style={styles.toggle}>
        <Text style={styles.titulo}> Conhecimento em mecânica <Switch value={mecanica} onValueChange={setMecanica}  /> </Text>                   
        <Text style={styles.titulo}> Conhecimento em funilaria  <Switch value={funilaria} onValueChange={setFunilaria} /> </Text> 
        <Text style={styles.titulo}> Realiza vistoria   <Switch value={vistoria} onValueChange={setVistoria} /> </Text> 
        <Text style={styles.titulo}> Pré compra   <Switch value={precompra} onValueChange={setPrecompra} /> </Text> 
        <Text style={styles.titulo}> Equipamentos   <Switch value={equipamentos} onValueChange={setEquipamentos} /> </Text> 
      </View>
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
      value={resumo} 
      onChangeText={setResumo} 
      multiline={true}
      numberOfLines={5}
      placeholder='Resumo do meu trabalho' 
      placeholderTextColor="#f2f2f2" 
      /> 

      <Input 
       style={{marginTop: 10}}
       value={presencialmoeda}
       keyboardType="number-pad"
       onChangeText={setPresencialMoeda} 
       ref={presencialRef}
       autoCorrect={false}
       placeholder='Consulta presencial R$'
       returnKeyType="next"
       onSubmitEditing={() => remotaRef.current.focus()} /> 

      <Input 
      style={{marginTop: 10}}
      value={remotomoeda}
      onChangeText={setRemotoMoeda} 
      keyboardType="number-pad"
      ref={remotaRef}
      placeholder='Consulta remota R$'
      onSubmitEditing={() => handleSubmit()}  /> 

      <Button onPress={() => handleSubmit()}> <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Alterar </Button>
      <Button style={{marginBottom: 200}} onPress={() => setAtividades(false)}> <Entypo name="back" size={30} color="#d2d2d2" /> Voltar </Button>
    </>
  }

  if (loading === true) {
    mostrar = <View>
      <ActivityIndicator size="large" color="#fff" />
    </View>
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
        uf: uf,
        mecanica: mecanica,
        funilaria: funilaria,
        equipamentos: equipamentos,
        vistoria: vistoria,
        precompra: precompra,
        resumo: resumo,
        foto: foto,
        ramo: ramo
      }

      var inativar = {
        
        remotofim: moment(),
        presencialfim: moment(),
        situacao: 0
      }

      var precos = {
        remotoinicio: moment().add(1,'seconds'),
        presencialinicio: moment().add(1,'seconds'),
        remoto: remotomoeda,
        presencial: presencialmoeda,
        situacao: 1,
        parceiroId: parceiro.id
      }

      if ((remotomoeda !== remotoantigo) || (presencialmoeda !== presencialantigo) ) {
        await ParceiroPrecoDataService.editar(parceiroprecoId, inativar)
        .then( response  =>  {  
          
        })
        .catch(e => {
          console.error(e)
        }) 

        await ParceiroPrecoDataService.cadastrar(precos)
        .then( response  =>  {  
          
        })
        .catch(e => {
          console.error(e)
        }) 


      }

      
      await CadastroParceiroDataService.editar(parceiro.id, data)
      .then( response  =>  {   
        setAlterar(false);
        setAtividades(false);
      })
      .catch(e => {
        console.error(e)
      }) 


    }

    let textoramo = null;
    if (parceiro !== '') {
      if (ramo === 1) {
        textoramo = 'Caçador'
      } else if (ramo === 2) {
        textoramo = 'Despachante'
      } else {
        textoramo = 'Caçador e Despachante'
      }
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
          PegaParceiro();

        })
        .catch(err => console.log("err", err))
    }
  }

  async function alterar () {
    var data = {
      foto: novafoto
    }

    await CadastroParceiroDataService.editar(parceiroId, data)
    .then( response  =>  {       
      
    })
    .catch(e => {
      console.error(e)
    }) 

    setPhoto(false);    
  }
  

  return (
    <View>
      <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>   
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>  
          <ScrollView>          
            <View>
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

            
              {parceiro !== '' && alterado === false && atividades === false &&
              <>
                <Text style={styles.titulo}> Meus dados </Text>
                <View>
                  <View style={styles.bordado}>
                    <Text style={styles.titulo}>Nome: {nome} </Text>
                    <Text style={styles.titulo}>Celular: {celular} </Text>
                    <Text style={styles.titulo}>{endereco} - {numero} - {bairro} </Text>
                    <Text style={styles.titulo}>{cidade} - {uf} </Text>
                    <Text style={styles.titulo}>Nota: {reputacao === 0 ? 'Sem notas' : reputacao} </Text>
                  </View>
                  <Text style={{textAlign: 'right', color: '#fff', fontSize: 20, marginBottom: 10}} onPress={() => setAlterar(true)}> 
                  <Entypo name="pencil" size={20} /> Alterar dados 
                  </Text>
                </View>

                <View>
                  <Text style={styles.titulo}> Habilidades </Text>
                
                  <View style={styles.bordado}>
                    <Text style={styles.titulo}>Ramo: {textoramo} </Text>
                    <Text style={styles.titulo}>Mecânica: {mecanica === true ? 'Sim' : 'Não'} </Text>
                    <Text style={styles.titulo}>Funilaria: {funilaria === true ? 'Sim' : 'Não'}  </Text>
                    <Text style={styles.titulo}>Equipamentos: {equipamentos === true ? 'Sim' : 'Não'} </Text>
                    <Text style={styles.titulo}>Vistoria: {vistoria === true ? 'Sim' : 'Não'} </Text>
                    <Text style={styles.titulo}>Consulta remota: R$ {remotomoeda}</Text>
                    <Text style={styles.titulo}>Consulta presencial: R$  {presencialmoeda}</Text>
                  </View>
                  <Text style={{textAlign: 'right', color: '#fff', fontSize: 20, marginBottom: 80}} onPress={() => setAtividades(true)}> 
                  <Entypo name="pencil" size={20} /> Alterar atividades </Text>
                  <Text style={{marginBottom:150}}></Text>
                </View>
              </>
              }

              {parceiro !== '' && alterado === false && atividades === true && <>
                <View>                
                  {mostrar}
                </View>
              </>
              }

              {parceiro !== '' && alterado === true && <>
                <View>                
                  {mostrar}
                </View>
              </>
              }

              {loading === true && <>
                <View>                
                  {mostrar}
                </View>
              </>
              }

              {loading === false && parceiro === '' && 
                <>
                  <Text style={styles.titulo}> Sem informações </Text>
                </>
              }
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
  </View>
)

}