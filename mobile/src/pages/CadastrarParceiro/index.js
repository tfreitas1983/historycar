import React, {useRef, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, StatusBar, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { Switch } from 'react-native-paper';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { celMask, cepMask, cpfMask, cnpjMask, moedaMask } from '../../components/masks';
import SelectDropdown from 'react-native-select-dropdown';
import Auth from '../../services/auth.service'
import CadastroParceiroDataService from '../../services/cadastroparceiro';
import ParceiroPrecoDataService from '../../services/parceiropreco';
import moment from 'moment';
import axios from 'axios';


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
  }
});

export default function CadastrarParceiro  ({ navigation }) { 

  const passwordRef = useRef();  
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


  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [apelido, setApelido] = useState('');
  const [sexo, setSexo] = useState('');
  const [celular, setCelular] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const dados = ["Feminino", "Masculino"];
  const ramos = ["Caçador de veículos", "Despachante", "Ambos"];

  
  const [selecionada, setSelecionada] = useState('');
  const [idSelecionada, setIdSelecionada] = useState('');
  const [isMecanicaOn, setIsMecanicaOn] = useState('');
  const [isFunilariaOn, setIsFunilariaOn] = useState('');
  const [isVistoriaOn, setIsVistoriaOn] = useState('');
  const [isPreCompraOn, setIsPreCompraOn] = useState('');
  const [isEquipamentosOn, setIsEquipamentosOn] = useState('');
  const [descricao, setDescricao] = useState('');
  const [avancado, setAvancado] = useState('');
  const [remotomoeda, setRemotoMoeda] = useState('');
  const [presencialmoeda, setPresencialMoeda] = useState('');
  
  let mostrar = null;
  let cabecalho = null;
  let userId = null;
  let parceiroId = null;
  let atividades = null;  
  let cepnum = null;
  let viacep = '';

  function avancar () {   
    setAvancado(1);  
  }

  if (tipo === '') {
      cabecalho = <>
      <Text style={styles.titulo}>Escolha o tipo:</Text>   
        <View style={styles.centro}>
          <Text style={styles.esquerda} onPress={() => setTipo('fisica')}>    Física   </Text>
          <Text style={styles.direita}  onPress={() => setTipo('juridica')}>   Jurídica   </Text>
        </View>
      </>
  }

  if (tipo === 'fisica' && avancado !== 1) {
      mostrar = <>
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
  
      <SelectDropdown
        data={dados.map(item => {return item})}
        defaultButtonText="Selecione o sexo"
        buttonStyle={styles.bordado}
        buttonTextStyle={{color: '#fff', fontWeight: 'bold'}}
        onSelect={(selectedItem, index) => {
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
      
      <Button style={{marginBottom: 150}} onPress={() => avancar()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Avançar </Button>
   
      </>
  } 
    
  if (tipo === 'juridica' && avancado !== 1) {
      mostrar = <>
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
      
      <Button style={{marginBottom: 150}} onPress={() => avancar()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Avançar </Button>
  
      </>
  } 
 
  
  if (avancado == 1) {
    mostrar = null;
    atividades = <>
     <Text style={styles.titulo}> Escolha seus serviços:</Text>     

      <SelectDropdown
        data={ramos}
        defaultButtonText="Selecione o ramo"
        buttonStyle={styles.bordado}
        onSelect={(selectedItem, index) => {
          setSelecionada(selectedItem)
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
      autoFocus={true}
      multiline={true}
      numberOfLines={5}
      placeholder='Resumo do meu trabalho' 
      placeholderTextColor="#f2f2f2"                 
      /> 

      <Text style={styles.toggle}> Conhecimento em mecânica <Switch value={isMecanicaOn} onValueChange={setIsMecanicaOn} /> </Text> 
      <Text style={styles.toggle}> Conhecimento em funilaria  <Switch value={isFunilariaOn} onValueChange={setIsFunilariaOn} /> </Text> 
      <Text style={styles.toggle}> Realiza vistoria   <Switch value={isVistoriaOn} onValueChange={setIsVistoriaOn} /> </Text> 
      <Text style={styles.toggle}> Pré compra   <Switch value={isPreCompraOn} onValueChange={setIsPreCompraOn} /> </Text> 
      <Text style={styles.toggle}> Equipamentos   <Switch value={isEquipamentosOn} onValueChange={setIsEquipamentosOn} /> </Text> 


      <Text style={styles.titulo}> Consulta Presencial </Text>
      <Input 
        style={{marginTop: 10}}
        value={'R$ ' + moedaMask(presencialmoeda)}
        keyboardType="number-pad"
        onChangeText={setPresencialMoeda} 
        ref={presencialRef}
        autoCorrect={false}
        placeholder='Consulta presencial R$'
        returnKeyType="next"
        onSubmitEditing={() => remotaRef.current.focus()} /> 

      <Text style={styles.titulo}> Consulta Remota </Text>
      <Input 
      style={{marginTop: 10}}
      value={'R$ ' + moedaMask(remotomoeda)}
      onChangeText={setRemotoMoeda} 
      keyboardType="number-pad"
      ref={remotaRef}
      autoCorrect={false}
      placeholder='Consulta remota R$'
      onSubmitEditing={() => handleSubmit()}  /> 
      
      <Button style={{marginBottom: 150}} onPress={() => handleSubmit()}>  <Entypo name="level-down" size={30} color="#d2d2d2" /> Cadastrar </Button>
      <Text  style={{margin: 30}}> </Text>
    </>
  }
  
  if (selecionada !== '') {
    if ("Caçador de veículos" === selecionada) {
      setIdSelecionada(1);
      setSelecionada('');
    } 
    
    if ("Despachante" === selecionada) {
      setIdSelecionada(2);
      setSelecionada('');
    } 
    if ("Ambos" === selecionada) {
      setIdSelecionada(3);
      setSelecionada('');
    }    
  }
  
  async function pegaCEP () {

    if (cep.length == 9) {
      cepnum = cep.replace('.', '').replace('-', ''); 
    }

    await axios.get(`https://viacep.com.br/ws/${cepnum}/json/`)
    .then(response => {
      viacep = response.data; 

      if (viacep && !viacep.erro) {
       
         setEndereco(viacep.logradouro);
         setBairro(viacep.bairro);
         setCidade(viacep.localidade);
         setUf(viacep.uf);
       } 

      if (viacep.erro === true){
        Alert.alert('CEP não encontrado')        
        cepnum = '';
        setEndereco('');
        setBairro('');
        setCidade('');
        setUf('');
      }

      enderecoRef.current.focus()
    })
    .catch(e => {
      console.error(e)
    })
  }
  
  async function handleSubmit () {
    escolhido = null;   
    
    await Auth.register(email, password, 1, 1) // 1 = Parceiro / 1 = ativo
    .then( response  =>  {  
      userId = response.data.id;         
    })
    .catch(e => {
      console.error(e)
    })

    if (userId === '') {
      Alert.alert('Nenhum Id')     
    } else {
      salvaParceiro();
    }           
  }

  let valorremoto = 0;
  let valorpresencial = 0;

  async function salvaParceiro () {

    
    if (tipo === 'fisica') {
      escolhido = 1
    }

    if (tipo === 'juridica') {
      escolhido = 2
    }

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
        cep: parseInt(cep.replace('.', '').replace('-', '')),
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        foto: 'download.png',
        situacao: 1,
        userId: userId,
        mecanica: isMecanicaOn,
        funilaria: isFunilariaOn,        
        ramo: idSelecionada,       
        equipamentos: isEquipamentosOn,
        vistoria: isVistoriaOn,
        precompra: isPreCompraOn,
        resumo: descricao,
        reputacao: 0
      }

      

      if (remotomoeda !== '') {
        var number  = parseFloat(remotomoeda.replace('R$ ','').replace(',','').slice(0, -2))
        var cents = parseFloat(remotomoeda.slice(-2))
       valorremoto = number+(cents/100);
      } 
    
      if (presencialmoeda !== '') {
        var number2  = parseFloat(presencialmoeda.replace('R$ ','').replace(',','').slice(0, -2))
        var cents2 = parseFloat(presencialmoeda.slice(-2))
        valorpresencial = number2+(cents2/100);
      } 

      await CadastroParceiroDataService.cadastrar(data)
      .then( response  =>  { 
        parceiroId = response.data.id;
      })
      .catch(e => {
        console.error(e)
      })
    }

    let precos = null;
    if (valorpresencial !== 0 && valorremoto  !== 0) {
      precos = {
        remoto: valorremoto,
        remotoinicio: moment(),      
        presencial: valorpresencial,
        presencialinicio: moment(),
        situacao: 1,
        parceiroId: parceiroId
      }
    } else {
      Alert.alert('Sem preços')
    }
    
    ParceiroPrecoDataService.cadastrar(precos)
    .then( response  =>  {
      Alert.alert('Parceiro cadastrado');
      navigation.navigate('ParceiroLogin');
    })
    .catch(e => {
      console.error(e)
    })        
    
  }
  

  return (
    <View>            
        <StatusBar barStyle="light-content" backgroundColor="#ffad26" />
        
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          <ScrollView>
            {atividades}  
            {cabecalho}
            {mostrar}
           
          </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
    </View>
);

}