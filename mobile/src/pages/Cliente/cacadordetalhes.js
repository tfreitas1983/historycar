import React from 'react';

import { Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
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
    marginBottom:5,
    color:'#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5
  },  
  item: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom:5,
    color:'#fff',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 5
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



const CacadorDetalhes = ({ navigation }) => (
    <View>            
        
        
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>     
            <ScrollView >
                <Text style={styles.titulo}> Serviços atendidos:</Text>
                <Text style={styles.item}> Conhecimento em mecânica: Sim </Text>
                <Text style={styles.item}> Conhecimento em funilaria: Não  </Text>            
                <Text style={styles.item}> Realiza vistoria: Sim  </Text> 
                <Text style={styles.item}> Pré compra: Sim  </Text>
                <Text style={styles.item}> Equipamentos: Não   </Text>   
                <Text style={styles.titulo}> Resumo a respeito do meu trabalho </Text>
                <Text style={styles.resumo}> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                </Text>
                <Text style={styles.item}> Consulta presencial R$ 300,00 </Text>
                <Text style={styles.item}> Consulta remota R$ 50,00</Text>
                
                <Text style={styles.entrar} onPress={() => navigation.navigate('HomeCliente')} > <Entypo name="level-down" size={30} color="#d2d2d2" /> Home </Text>
                <Text  style={{margin: 30}}> </Text>
            </ScrollView>
        </LinearGradient>
  </View>
);

export default CacadorDetalhes;