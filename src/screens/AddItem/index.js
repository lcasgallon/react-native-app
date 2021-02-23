import React, { useState } from 'react';
import { View, Alert, Button, Text, CheckBox } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Input } from 'react-native-elements';
import { Header } from 'react-native-elements';

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
  console.log(item);
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
  const [dataPagamento, setDataPagamento] = useState('');
  const [dataConexao, setDataConexao] = useState('');
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
      } else {
        addItem(item);
        Alert.alert('Registro salvo com sucesso');
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
          text: 'Sistema de Licenças',
          style: { color: '#fff' },
        }}
      />
      <View>
        <Input
          label="Fantasia"
          value={fantasia}
          onChangeText={(text) => setFantasia(text)}
        />
      </View>
      <View>
        <Input
          label="Razão Social"
          value={razao}
          onChangeText={(text) => setRazao(text)}
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
        <Text>Situação</Text>
        <CheckBox value={situacao} onValueChange={setSituacao}></CheckBox>
        {/* <CheckBox
          checked={situacao}
          iconType="material"
          checkedIcon="clear"
          uncheckedIcon="add"
          checkedColor="red"
          onValueChange={setSituacao}
        /> */}
        <Text>{situacao ? 'Ativo' : 'Inativo'}</Text>
      </View>
      <View>
        <Text>Data de Pagamento</Text>
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
      <View>
        <Text>Data da Última Conex.</Text>
        <DatePicker
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
      <Button
        title={key ? 'Atualizar' : 'Adicionar'}
        onPress={() => handleSubmit()}></Button>
    </View>
  );
}
