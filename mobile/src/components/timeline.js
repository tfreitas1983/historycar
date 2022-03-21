import React from 'react';

// import all the components we are going to use
import {StyleSheet, Text, View} from 'react-native';

// import Timeline
import Timeline from 'react-native-timeline-flatlist';

const TimeLine = () => {
  const data = [
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

  return (
    <View style={styles.container}>
      
      <Timeline
        data={data}
        circleSize={20}
        circleColor="#ffdf33"
        lineColor="#bb8800"
        timeContainerStyle={{minWidth: 52}}        
        descriptionStyle={{color: '#fff', fontSize: 19}}
        options={{
          style: {margin: 5, marginLeft: -40},
        }}
      />
    </View>
  );
};

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


export default TimeLine;