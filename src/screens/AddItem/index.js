import React, { useState } from 'react';
import { View, Alert, Button, Text, CheckBox, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Input, Header, Card } from 'react-native-elements';

import { db } from '../../config/firebase';
import { useEffect } from 'react';

let addItem = (item) => {
  db.ref('/items').push({
    fantasia: item.fantasia,
    cpfcnpj: item.cpfcnpj,
    razao: item.razao,
    diaVencimento: item.diaVencimento,
    dataPagamento: item.dataPagamento,
    dataConexao: item.dataConexao,
    situacao: item.situacao,
  });
};

let updateItem = (item) => {
  db.ref('/items/' + item.key).update({
    fantasia: item.fantasia,
    cpfcnpj: item.cpfcnpj,
    razao: item.razao,
    diaVencimento: item.diaVencimento,
    dataPagamento: item.dataPagamento,
    dataConexao: item.dataConexao,
    situacao: item.situacao,
  });
};

export default function AddItem({ navigation, route }) {
  const [fantasia, setFantasia] = useState('');
  const [cpfcnpj, setCpfcnpj] = useState('');
  const [razao, setRazao] = useState('');
  const [diaVencimento, setDiaVencimento] = useState('');
  const [dataPagamento, setDataPagamento] = useState(new Date());
  const [dataConexao, setDataConexao] = useState(new Date());
  const [situacao, setSituacao] = useState(true);
  const [key, setKey] = useState('');

  function handleSubmit() {
    let item = {
      key: key,
      fantasia: fantasia,
      cpfcnpj: cpfcnpj,
      razao: razao,
      diaVencimento: diaVencimento,
      dataPagamento: dataPagamento,
      dataConexao: dataConexao,
      situacao: situacao,
    };
    if (item.dataPagamento && item.cpfcnpj) {
      if (item.key) {
        updateItem(item);
        Alert.alert('Registro atualizado com sucesso');
        navigation.navigate('Lista');
      } else {
        addItem(item);
        Alert.alert('Registro salvo com sucesso');
        navigation.navigate('Lista');
      }
    } else {
      Alert.alert('Por favor preencha todos os campos');
    }
  }

  useEffect(() => {
    if (route.params.item) {
      let item = route.params.item;
      setFantasia(item.fantasia);
      setCpfcnpj(item.cpfcnpj);
      setRazao(item.razao);
      setDiaVencimento(item.diaVencimento);
      setDataConexao(item.dataConexao);
      setDataPagamento(item.dataPagamento);
      setSituacao(item.situacao);
      setKey(item.key);
    }
  }, []);

  return (
    <View>
      <Header
        centerComponent={{
          text: 'Cadastro de Licenças',
          style: { color: '#fff' },
        }}
      />
      <Card>
        <View>
          <Input
            label="Razão Social"
            value={razao}
            onChangeText={(text) => setRazao(text)}
          />
        </View>
        <View>
          <Input
            label="Fantasia"
            value={fantasia}
            onChangeText={(text) => setFantasia(text)}
          />
        </View>
        <View>
          <Input
            label="CPF/CNPJ"
            keyboardType="numeric"
            value={cpfcnpj}
            onChangeText={(text) => setCpfcnpj(text)}
          />
        </View>
        <View>
          <Input
            label="Dia Vencimento"
            keyboardType="numeric"
            value={diaVencimento}
            onChangeText={(text) => setDiaVencimento(text)}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Data de Pagamento</Text>
          <DatePicker
            date={dataPagamento}
            format="DD-MM-YYYY"
            onDateChange={(date) => setDataPagamento(date)}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
          />
        </View>
        <Card.Divider />
        <View>
          <Text style={styles.titleText}>Data da Última Conex.</Text>
          <DatePicker
            disabled
            date={dataConexao}
            format="DD-MM-YYYY"
            onDateChange={(date) => setDataConexao(date)}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
          />
        </View>
        <Card.Divider />
        <View>
          <Text style={styles.titleText}>Situação</Text>
          <CheckBox value={situacao} onValueChange={setSituacao}></CheckBox>
          {/* <CheckBox
          checked={situacao}
          iconType="material"
          checkedIcon="clear"
          uncheckedIcon="add"
          checkedColor="red"
          onValueChange={setSituacao}
        /> */}
          <Text style={styles.titleText}>{situacao ? 'Ativo' : 'Inativo'}</Text>
        </View>
        <Card.Divider />
        <Button
          title={key ? 'Atualizar' : 'Adicionar'}
          onPress={() => handleSubmit()}></Button>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray"
  }
});
