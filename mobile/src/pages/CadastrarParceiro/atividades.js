import React from 'react';

import { Text, View, StyleSheet, Dimensions, StatusBar, ScrollView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

import Toggle from '../../components/toggle'

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



const Atividades = ({ navigation }) => (
    <View>            
        <StatusBar barStyle="light-content" backgroundColor="#ffad26" />
        
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
            <ScrollView >
                <Text style={styles.titulo}> Escolha seus serviços:</Text>
                <Text style={styles.toggle}> Conhecimento em mecânica <Toggle /> </Text>
                <Text style={styles.toggle}> Conhecimento em funilaria <Toggle /> </Text>            
                <Text style={styles.toggle}> Realiza vistoria <Toggle /> </Text> 
                <Text style={styles.toggle}> Pré compra <Toggle /> </Text>
                <Text style={styles.toggle}> Equipamentos <Toggle />  </Text>   
                <Text style={styles.resumo}> Resumo a respeito do meu trabalho </Text>
                <Text style={styles.opcoes}> Consulta presencial R$ </Text>
                <Text style={styles.opcoes}> Consulta remota R$ </Text>
                
                <Text style={styles.entrar} onPress={() => navigation.navigate('ParceiroLogin')} > <Entypo name="level-down" size={30} color="#d2d2d2" /> Salvar </Text>
                <Text  style={{margin: 30}}> </Text>
            </ScrollView>
        </LinearGradient>
  </View>
);

export default Atividades;