import React from 'react';

import { Text, View, StyleSheet, Dimensions, ScrollView, StatusBar} from 'react-native';
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
    marginTop: -100
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

const Cadastrar = ({ navigation }) => (
    <View>            
        <StatusBar barStyle="light-content" backgroundColor="#ffad26" />
        
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
          <ScrollView>
            <Text style={styles.titulo}>Entre com seus dados:</Text>   
            <Text style={styles.opcoes}> <Entypo name="email" size={20} color="#a2a2a2" /> Nome ou Razão Social </Text>
            <Text style={styles.opcoes}>  CPF / CNPJ </Text>
            <Text style={styles.opcoes}>  Apelido </Text>
            <Text style={styles.opcoes}>  Celular </Text>
            <Text style={styles.opcoes}>  Endereço </Text>
            <Text style={styles.opcoes}>  Complemento </Text>
            <Text style={styles.opcoes}>  Número </Text>
            <Text style={styles.opcoes}>  Complemento </Text>
            <Text style={styles.opcoes}>  Bairro </Text>
            <Text style={styles.opcoes}>  Cidade </Text>
            <Text style={styles.opcoes}>  UF </Text>            
            <Text style={styles.opcoes}> <Entypo name="email" size={20} color="#a2a2a2" /> E-mail </Text>
            <Text style={styles.opcoes}> <Entypo name="lock" size={30} color="#a2a2a2" /> Senha </Text>
            <Text style={styles.opcoes}> <Entypo name="lock" size={30} color="#a2a2a2" /> Repita a senha </Text>
            <Text style={styles.opcoes}> <Entypo name="lock" size={30} color="#a2a2a2" /> Senha </Text>

            <Text style={styles.enviar}  onPress={() => navigation.navigate('Cliente')}> <Entypo name="paper-plane" size={30} color="#d2d2d2" /> Cadastrar </Text>
           
          </ScrollView>
            
        </LinearGradient>
    </View>
);

export default Cadastrar;