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
import HomeParceiro from './pages/CadastrarParceiro/homeparceiro'
import Veiculos from './pages/Cliente/veiculos';
import CadastrarVeiculos from './pages/Cliente/cadastrarveiculo';
import PesquisarVeiculos from './pages/Cliente/pesquisaveiculo';
import Cacador from './pages/Cliente/cacador';
import Despachante from './pages/Cliente/despachante';
import Detalhes from './pages/Cliente/detalhes';
import Ajustes from './pages/Cliente/ajustes'; 
import AjustesParceiro from './pages/CadastrarParceiro/ajustesparceiro'; 
import Suporte from './pages/Cliente/suporte';
import SeguroRecall from './pages/Cliente/segurorecall';
import Manutencao from './pages/Cliente/manutencao';
import Registro from './pages/Cliente/registromanutencao';
import Venda from './pages/Cliente/venda';
import Seguro from './pages/Cliente/seguro';
import SeguroLista from './pages/Cliente/segurolista';
import Transferencia from './pages/Cliente/transferencia';
import Solicitacao from './pages/Cliente/solicitacao';
import CacadorLista from './pages/Cliente/cacadorlista';
import DespachanteLista from './pages/Cliente/despachantelista';
import DespachanteDetalhes from './pages/Cliente/despachantedetalhes';
import CacadorDetalhes from './pages/Cliente/cacadordetalhes';
import Sair from './components/sair';
import SeguroDetalhe from './pages/Cliente/segurodetalhe';

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
                name="HomeParceiro"
                component={HomeParceiro}
                options={{
                title: 'Home do parceiro',
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
                name="CadastrarVeiculos"
                component={CadastrarVeiculos}
                options={{
                title: 'Cadastrar veículos',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="PesquisarVeiculos"
                component={PesquisarVeiculos}
                options={{
                title: 'Pesquisar veículos',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="Cacador"
                component={Cacador}
                options={{
                title: 'Caçador de veículos',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="Despachante"
                component={Despachante}
                options={{
                title: 'Despachantes',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="Ajustes"
                component={Ajustes}
                options={{
                title: 'Ajustes',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="AjustesParceiro"
                component={AjustesParceiro}
                options={{
                title: 'Ajustes',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="Suporte"
                component={Suporte}
                options={{
                title: 'Suporte ao cliente',
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

            <Stack.Screen
                name="SeguroRecall"
                component={SeguroRecall}
                options={{
                title: 'Recall e seguro do veículo',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
            
            <Stack.Screen
                name="Manutencao"
                component={Manutencao}
                options={{
                title: 'Registro de manutenções do veículo',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
            
            <Stack.Screen
                name="Registro"
                component={Registro}
                options={{
                title: 'Registro de manutenção do veículo',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
            
            <Stack.Screen
                name="Seguro"
                component={Seguro}
                options={{
                title:' Nova vigência do seguro ',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
            
            <Stack.Screen
                name="SeguroLista"
                component={SeguroLista}
                options={{
                title:' Lista de seguros ',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="SeguroDetalhe"
                component={SeguroDetalhe}
                options={{
                title:' Seguro do veículo ',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
            
            <Stack.Screen
                name="Venda"
                component={Venda}
                options={{
                title: 'Registro de venda do veículo',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
            
            <Stack.Screen
                name="Transferencia"
                component={Transferencia}
                options={{
                title: 'Registro de transferência do veículo',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />
          
            
            <Stack.Screen
                name="Solicitacao"
                component={Solicitacao}
                options={{
                title: 'Solicitação de transferência',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />  

            <Stack.Screen
                name="CacadorLista"
                component={CacadorLista}
                options={{
                title: 'Resultados da pesquisa',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />  

            <Stack.Screen
                name="DespachanteLista"
                component={DespachanteLista}
                options={{
                title: 'Resultados da pesquisa',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            /> 

            <Stack.Screen
                name="DespachanteDetalhes"
                component={DespachanteDetalhes}
                options={{
                title: 'Informações sobre o despachante',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            /> 

            <Stack.Screen
                name="CacadorDetalhes"
                component={CacadorDetalhes}
                options={{
                title: 'Informações sobre o caçador',
                headerStyle: { backgroundColor: '#ffad26' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="Sair"
                component={Sair}
                options={{
                title: 'Sair',
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