import React from 'react';
import { Text, Image, StyleSheet, Dimensions, StatusBar, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';


const styles = StyleSheet.create({
  container: {
    fontFamily: 'Open Sans',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    height: Dimensions.get('window').height * 0.5,
    backgroundColor: 'transparent',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  }, 
  logo: {
    height: Dimensions.get('window').height * 0.27,
    marginVertical: Dimensions.get('window').height * 0.11,
    width: Dimensions.get('window').width
  },
  fileName: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  opcoes: {
    fontFamily: 'Open Sans',
    color: '#0e0e0e',
    backgroundColor: '#c2c2c2',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: '#c2c2c2',
    fontSize: 40,
    marginTop: 20,
    padding: 5,
    textAlign: 'center',
    width: Dimensions.get('window').width
  },
  welcome: {
    color: '#d3d3d3',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

const Main = ({ navigation }) => (
   <View>            
    <StatusBar barStyle="light-content" backgroundColor="#ffad26" />
        
    <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}>        
        <Image
        source={require('../../img/carro2.png')}
        style={styles.logo}
            resizeMode="cover"
        />
        <Text style={styles.welcome}>Escolha a sua opção abaixo:</Text>    
        <Text style={styles.opcoes} onPress={() => navigation.navigate('Cliente')}> 
            <Icon name="user" size={50} color="#000" /> Sou cliente
        </Text>

        <Text style={styles.opcoes} onPress={() => navigation.navigate('ParceiroLogin')}> <Icon name="suitcase" size={45} color="#000" /> Sou parceiro</Text>
        <Text style={{marginBottom: 20}} />
    </LinearGradient>
    </View>
);


export default Main;