import React from 'react';

import { StyleSheet, Dimensions, Text, ScrollView} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Cliente from '../pages/Cliente/index';
import Veiculos from '../pages/Cliente/veiculos';
import PesquisarVeiculos from '../pages/Cliente/pesquisaveiculo';
import Cacador from '../pages/Cliente/cacador';
import Ajustes from '../pages/Cliente/ajustes';
import Suporte from '../pages/Cliente/suporte';
import Despachante from '../pages/Cliente/despachante';

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


const Drawer = createDrawerNavigator();

const MenuCliente = () => (
  <Drawer.Navigator
  screenOptions={{
    drawerStyle: {
      backgroundColor: '#313131'
    },
    headerStyle: {
      backgroundColor: '#ffad26'      
    },
    headerTintColor: '#fffddd',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
  >
      <Drawer.Screen 
       name="Meus veículos" 
       component={Veiculos}       
       options={{drawerLabel: ( ({focused}) => <Text style={{fontSize: 18, color: focused ? '#fff' : '#fff' }}> Meus veículos</Text> ),
       drawerIcon:(({focused}) => <Entypo color = {focused ? '#313131' : '#fff'} name='home' color={'#fff'}size={20} />) }} 
      />
      <Drawer.Screen 
      name="Pesquisar veículos" 
      component={PesquisarVeiculos}
      options={{drawerLabel: (({focused}) => <Text style={{fontSize: 16, color: focused ? '#fff' : '#fff' }}> Pesquisar veículos</Text> ),
      drawerIcon:(({focused}) => <Entypo color = {focused ? '#313131' : '#fff'} name='magnifying-glass' color={'#fff'}size={20} />) }}
      />
      <Drawer.Screen 
      name="Caçador de veículos" 
      component={Cacador} 
      options={{drawerLabel: (({focused}) => <Text style={{fontSize: 16, color: focused ? '#fff' : '#fff' }}> Caçador de veículos</Text> ),
      drawerIcon:(({focused}) => <Entypo color = {focused ? '#313131' : '#fff'} name='v-card' color={'#fff'}size={20} />) }}
      />
      <Drawer.Screen 
      name="Despachante"
      component={Despachante} 
      options={{drawerLabel: (({focused}) => <Text style={{fontSize: 16, color: focused ? '#fff' : '#fff' }}> Despachante</Text> ),
      drawerIcon:(({focused}) => <Entypo color = {focused ? '#313131' : '#fff'} name='briefcase' color={'#fff'}size={20} />) }}
      />
      <Drawer.Screen 
      name="Ajustes" 
      component={Ajustes} 
      options={{drawerLabel: (({focused}) => <Text style={{fontSize: 16, color: focused ? '#fff' : '#fff' }}> Ajustes</Text> ),
      drawerIcon:(({focused}) => <Feather color = {focused ? '#313131' : '#fff'} name='settings' color={'#fff'}size={20} />) }}
      />
      <Drawer.Screen 
      name="Suporte" 
      component={Suporte} 
      options={{drawerLabel: (({focused}) => <Text style={{fontSize: 16, color: focused ? '#fff' : '#fff' }}> Suporte</Text> ),
      drawerIcon:(({focused}) => <Entypo color = {focused ? '#313131' : '#fff'} name='mail' color={'#fff'}size={20} />) }}
      />
      <Drawer.Screen 
      name="Sair" 
      component={Cliente} 
      options={{drawerLabel: (({focused}) => <Text style={{fontSize: 16, color: focused ? '#fff' : '#fff' }}> Sair</Text> ),
      drawerIcon:(({focused}) => <Entypo color = {focused ? '#313131' : '#fff'} name='log-out' color={'#fff'}size={20} />) }}
      />
    </Drawer.Navigator>
);

export default MenuCliente;