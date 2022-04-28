import React,  { useEffect} from 'react';
import {View, Image,StyleSheet, Dimensions} from 'react-native';
import { useDispatch } from "react-redux";
import {signOut} from '../store/modules/auth/actions';


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    imagem: {        
        
        width:  Dimensions.get('window').width * 0.99
    }
})

export default function Sair ({navigation})  {  
    
    
    const dispatch = useDispatch();
    

  // Similar ao componentDidMount e componentDidUpdate:
  useEffect(() => {
    // Altera o estados de signed, tipo e situacao para null e redireciona para a tela de login
    dispatch(signOut())
    navigation.navigate('Main')
  });
  
    return (
        <View style={styles.container}>
            <Image source={require('../img/loading.gif')} style={styles.imagem}/>
        </View>
    )
};
  
 