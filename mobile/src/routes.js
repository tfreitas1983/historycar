import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from './pages/Main'
import Cliente from './pages/Cliente'
import Esqueci from './pages/Esqueci'
import Cadastrar from './pages/Cadastrar'
import ParceiroLogin from './pages/ParceiroLogin'
import CadastrarParceiro from './pages/CadastrarParceiro'
import Atividades from './pages/CadastrarParceiro/atividades'
import TemplateParceiro from './pages/CadastrarParceiro/template';
import HomeCliente from './pages/Cliente/home';
import Veiculos from './pages/Cliente/veiculos';
import CadastrarVeiculos from './pages/Cliente/cadastrarveiculo';
import PesquisarVeiculos from './pages/Cliente/pesquisaveiculo';
import Cacador from './pages/Cliente/cacador';
import Detalhes from './pages/Cliente/detalhes';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
                options={{
                title: 'Bem vindo!',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
           />
            <Stack.Screen
                name="Cliente"
                component={Cliente}
                options={{
                title: 'Área do Cliente!',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Esqueci"
                component={Esqueci}
                options={{
                title: 'Esqueci minha senha',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Cadastrar"
                component={Cadastrar}
                options={{
                title: 'Cadastro de cliente',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            
            
            <Stack.Screen
                name="CadastrarParceiro"
                component={CadastrarParceiro}
                options={{
                title: 'Cadastro de parceiros',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="ParceiroLogin"
                component={ParceiroLogin}
                options={{
                title: 'Login de parceiros',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Atividades"
                component={Atividades}
                options={{
                title: 'Serviços do parceiro',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="TemplateParceiro"
                component={TemplateParceiro}
                options={{
                title: 'Home do parceiro',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="HomeCliente"
                component={HomeCliente}
                options={{
                title: 'Home do cliente',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="Veiculos"
                component={Veiculos}
                options={{
                title: 'Meus veículos',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="Cadastrar Veiculos"
                component={CadastrarVeiculos}
                options={{
                title: 'Cadastrar veículos',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="Pesquisar Veiculos"
                component={PesquisarVeiculos}
                options={{
                title: 'Pesquisar veículos',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="Cacador Veiculos"
                component={Cacador}
                options={{
                title: 'Caçador de veículos',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="Detalhes"
                component={Detalhes}
                options={{
                title: 'Detalhes do veículo',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
        
        </Stack.Navigator>
        </NavigationContainer>
    );
  }

  /*


  */