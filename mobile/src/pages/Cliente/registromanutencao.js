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
    marginBottom:15,
    color:'#fff',
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
    borderBottomColor: '#f2f2f2',
    width: Dimensions.get('window').width
  },
  item: {
    fontWeight: 'bold',
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
    marginBottom: 80,
    padding: 5,
    textAlign: 'center'
  },
  toogle: {      
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  upload: {      
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    fontFamily: 'Open Sans',
    color: '#fafafa',
    fontSize: 25,
    fontWeight: 'bold',       
    marginTop: 10,
    padding:8,
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


const Registro = ({ navigation }) => (
    <View>
         
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
        
        <ScrollView>
       
            <Text style={styles.titulo}>Chevrolet Celta VHC 1.4</Text>
           
            <View style={styles.toogle}>
                <Text style={styles.item}>Rotina</Text>
                <Text style={styles.item}>|</Text>
                <Text style={styles.item}>Recall</Text>
            </View>
            <Text style={styles.opcoes}>Data</Text>
            <Text style={styles.opcoes}>Km atual</Text>
            <Text style={styles.resumo}>Descrição da manutenção</Text>
            <Text style={styles.opcoes}>Oficina</Text>
            <Text style={styles.opcoes}>CEP</Text>
            <Text style={styles.opcoes}>Endereço</Text>
            <Text style={styles.opcoes}>Número</Text>
            <Text style={styles.opcoes}>Complemento</Text>
            <Text style={styles.opcoes}>Bairro</Text>
            <Text style={styles.opcoes}>Cidade</Text>
            <Text style={styles.opcoes}>UF</Text>
            <Text style={styles.opcoes}>Mecânico Responsável</Text>
            <Text style={styles.opcoes}>Data de garantia</Text>
            <View style={styles.upload}>
                <Text> <Entypo name='camera' size={30} /> </Text>
                <Text style={styles.item}> Foto painel</Text>
            </View>
            <View style={styles.upload}>
                <Text> <Entypo name='camera' size={30} /> </Text>
                <Text style={styles.item}> Foto serviço</Text>
            </View>
            <View style={styles.upload}>
                <Text> <Entypo name='camera' size={30} /> </Text>
                <Text style={styles.item}> Foto nota fiscal</Text>
            </View>
           <Text onPress={() => navigation.navigate('Manutencao')} style={styles.entrar}> <Entypo name="level-down" size={30} /> Salvar </Text>
        </ScrollView>
        </LinearGradient>
    </View>
);

export default Registro;