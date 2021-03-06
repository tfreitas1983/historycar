import React from 'react';

import {Text, View, StyleSheet, Dimensions, StatusBar, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';

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
  mensagem: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom:5,
    color:'#fff',
    fontSize: 18,
    textAlign: 'left',
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
    fontSize: 30,
    marginTop: 20,
    marginBottom: 150,
    padding: 5,
    textAlign: 'center'
  },  
  buscar:{
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






const PesquisarVeiculos = ({ navigation }) => (
    <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        <ScrollView>
            
            <Text style={styles.opcoes}> RENAVAM</Text>
      
            <Text style={styles.buscar}> <Entypo name="level-down" size={30} /> Buscar</Text>
            <Text style={styles.opcoes}> Carros e caminhonetes</Text>
            <Text style={styles.opcoes}> Chevrolet</Text>
            <Text style={styles.opcoes}> Celta</Text>
            <Text style={styles.opcoes}> Celta VHC 1.0</Text>
            <Text style={styles.opcoes}> 2008 Gasolina</Text>
            <Text style={styles.opcoes}> KXV-0983</Text>
            <Text style={styles.opcoes}> Chassi</Text>
            <Text style={styles.titulo}> Dados do antigo propriet??rio</Text>
            <Text style={styles.opcoes}> Juvenal XXXXX XXXva</Text>
            <Text style={styles.opcoes}> 046.xxx.xxx-09</Text>
            <Text style={styles.titulo}> Venda n??o comunicada! </Text>
            <Text style={styles.mensagem}> Para a transfer??ncia de propriet??rio clique no bot??o abaixo e envie a foto do CRV do ve??culo.</Text>
            <Text onPress={() => navigation.navigate('Transferencia')} style={styles.entrar}> Adicionar ?? minha lista</Text>
        </ScrollView>
        </LinearGradient>
    </View>
);

export default PesquisarVeiculos;