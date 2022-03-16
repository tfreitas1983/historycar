import React from 'react';

import { Text, View, StyleSheet, Dimensions, StatusBar} from 'react-native';
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

const Cliente = ({ navigation }) => (
    <View>            
        <StatusBar barStyle="light-content" backgroundColor="#ffad26" />
        
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
    
            <Text style={styles.titulo}>Entre com seu e-mail e senha abaixo:</Text>   
    
            <Text style={styles.opcoes}> <Entypo name="email" size={30} color="#a2a2a2" /> E-mail </Text>
            <Text style={styles.opcoes}> <Entypo name="lock" size={30} color="#b2b2b2" /> Senha </Text>
            <Text style={styles.entrar}  onPress={() => navigation.navigate('HomeCliente')}> <Entypo name="level-down" size={30} color="#d2d2d2" /> Entrar </Text>
            <Text style={styles.cadastrar}  onPress={() => navigation.navigate('Cadastrar')}> <Entypo name="add-user" size={45} color="#000" /> Cadastrar-me</Text>
            <Text style={styles.forgot} onPress={() => navigation.navigate('Esqueci')}> Esqueci minha senha</Text>
        </LinearGradient>
  </View>
);

export default Cliente;