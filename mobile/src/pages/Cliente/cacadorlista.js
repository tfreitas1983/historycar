import React from 'react';

import {Text, View, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({

  linearGradient: {
    borderRadius: 5,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  }, 
  titulo: {
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
    marginTop: 5,
    color:'#fff',
    fontSize: 15,
    textAlign: 'left',
  },
  ordenar: {
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
    color:'#fff',
    fontSize: 15,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#fff',
    padding: 2,
    margin: 5
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
    marginBottom: 15

  },
  logo: {
    height: Dimensions.get('window').height * 0.128,
    margin: 3,
    borderRadius: 90
  },
})



const CacadorLista = ({ navigation }) => (
    <View>
        <LinearGradient  colors={['#ffad26', '#ff9900', '#ff5011']} style={styles.linearGradient}> 
        <ScrollView>
            <View style={styles.toogle}>
                <Text style={styles.titulo}> Ordenar por:</Text>
                <Text style={styles.ordenar}> Reputação </Text>
                <Text style={styles.titulo}> Valor </Text>
            </View>       

            <View style={styles.toogle}>
                <Image
                source={require('../../img/parceiro.png')}
                style={styles.logo}
                    resizeMode="cover"
                />
                <View >
                <Text style={styles.ordenar}> Juvenal Gomes - 8,9 </Text>
                    <Text style={styles.titulo}> Consulta Dúvidas a partir de R$ 300,00 </Text>
                    <Text style={styles.titulo}> Consulta Remota  a partir de R$ 50,00 </Text>
                    <Text style={styles.titulo}> 11 99009-9900 </Text>
                </View>
            </View>

            <View style={styles.toogle}>
                <Image
                source={require('../../img/parceiro.png')}
                style={styles.logo}
                    resizeMode="cover"
                />
                <View >
                <Text style={styles.ordenar}> Clovis Silva - 8,4 </Text>
                    <Text style={styles.titulo}> Consulta Dúvidas a partir de R$ 300,00 </Text>
                    <Text style={styles.titulo}> Consulta Remota  a partir de R$ 50,00 </Text>
                    <Text style={styles.titulo}> 11 99009-9900 </Text>
                </View>
            </View>
            
            <View style={styles.toogle}>
                <Image
                source={require('../../img/parceiro.png')}
                style={styles.logo}
                    resizeMode="cover"
                />
                <View style={{marginBottom: 15}} >
                <Text style={styles.ordenar}> Tenório Oliveira - 8,2 </Text>
                    <Text style={styles.titulo}> Consulta Dúvidas a partir de R$ 300,00 </Text>
                    <Text style={styles.titulo}> Consulta Remota  a partir de R$ 50,00 </Text>
                    <Text style={styles.titulo}> 11 99009-9900 </Text>
                </View>
            </View>
                
                
            <Text onPress={() => navigation.navigate('HomeCliente')} style={styles.entrar}> Home</Text>
        </ScrollView>
        </LinearGradient>
    </View>
);

export default CacadorLista;