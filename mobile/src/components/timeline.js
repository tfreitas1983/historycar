import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import VeiculoDataService from '../services/veiculo'
import ManutencaoDataService from '../services/manutencoes';
import moment from 'moment';
import { useSelector } from "react-redux";
import Timeline from 'react-native-timeline-flatlist';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 16,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default function TimeLine  ({navigation})  {
  /*const data = [
    {
      
      title: '10/02/2022',
      description:
        'Troca de óleo semi sintético 10w40 Lubrax'
    },
    {
      
      title: '05/10/2021',
      description:
        'Troca de 4 pneus Googyear 165/70 R13',
    },
   
    {
      
      title: '09/04/2021',
      description:
        'Limpeza dos bicos e troca dos manguitos',
     
    },
    {
     
      title: '19/01/2021',
      description:
        'Troca das velas'
    },
  ];

  */

  const id = useSelector(state => state.veiculo.id);
  //const [veiculo, setVeiculo] = useState('');
  const [data, setData] = useState([]);


  let veiculo = null;
  let dados = null;


  useEffect( () => { 

    async function BuscaVeiculo () {
      
      await VeiculoDataService.veiculocliente(id) 
        .then( response  =>  {  
          veiculo = response.data.veiculo.id
          console.log('testeveiculo',veiculo);
          
          VeiculosManutencoes(); 
        })
        .catch(e => {
          console.error(e);
        })
    }
   
    BuscaVeiculo ();

    
  }, [])


  async function VeiculosManutencoes () {
      
    if (veiculo !== '') {
      await ManutencaoDataService.buscaveiculo(veiculo) 
      .then( response  =>  {  
        let tempdados = response.data
        console.log('tempdados', tempdados);
        dados = tempdados;
        Vetor();
      })
      .catch(e => {
        console.error(e);
      })
     
      console.log('dados', dados);
      
    }
    
  }

  async function Vetor() {

     let dadosmanutencao = dados.map(item => {
      return  {title: item.detalhes, description: moment(item.datamanutencao).format('DD/MM/YYYY')}
     })
     await setData(dadosmanutencao);
     console.log('data', data);

     
  }

  console.log('data', data);

  return (
    <View style={styles.container}>
      
      <Timeline
        data={data}
        circleSize={20}
        circleColor="#ffdf33"
        lineColor="#bb8800"
        timeContainerStyle={{minWidth: 52}}        
        descriptionStyle={{color: '#fff', fontSize: 19}}
        key={data.id}
        options={{
          style: {margin: 5, marginLeft: -40},
        }}
      />
    </View>
  );
}