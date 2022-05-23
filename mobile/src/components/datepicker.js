import React, { useState } from 'react'
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import moment from 'moment'
import DatePicker from 'react-native-date-picker'

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
      marginTop: 10,
      padding:8,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#f2f2f2',
      width: Dimensions.get('window').width,
    },
    inativo: {      
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'flex-start',
      fontFamily: 'Open Sans',
      backgroundColor: '#aaaaaa',
      color: '#b2b2b2',
      fontSize: 25,
      fontWeight: 'bold',       
      marginTop: 10,
      padding:8,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#909090',
      width: Dimensions.get('window').width,
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
    periodo: {      
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      fontFamily: 'Open Sans',
      color: '#fafafa',
      fontSize: 25,
      fontWeight: 'bold',       
      marginTop: 10
    },
    datas: {
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
      width: Dimensions.get('window').width * 0.45
    },
  });

 const MyDate = ({onSetDate}) => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

   
    let mostrar = null;
    if (date !== '') {
        mostrar = <>
        <Text style={styles.opcoes} onPress={() => setOpen(true)}> {moment(date).format('DD/MM/YYYY')}  </Text>
        </>
    }

    return (
        <View>
           
            <DatePicker
                modal
                maximumDate={new Date()}
                open={open}
                date={date}
                mode="date"
                title='Escolha a data'
                onDateChange={setDate}
                locale='pt-br'
                onConfirm={(date) => {
                    const newDate = date
                    setOpen(false)
                    setDate(date)
                    onSetDate(newDate);
                }}
                onCancel={ () => {  setOpen(false)  }}
            />
            {mostrar}
        </View>
    )
}

export default MyDate;