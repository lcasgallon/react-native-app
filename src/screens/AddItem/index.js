import React, { useState } from 'react';
import { View, Alert, CheckBox, Button,
  Header,
  Container,
  Text,
  Label,
  Form,
  Input,
  Item,
  Content,
  Card,
  CardItem } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';


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
    <Container>
      <Header>
        <Text>{key ? <Label>ID Firebase -{key ? key : ''}</Label> : null}</Text>
        </Header>
      <Content>
      <Card>
            <CardItem>
        <Form>
          <Item stackedLabel>
            <Label>Fantasia</Label>
            <Input
              value={fantasia}
              onChangeText={(text) => setFantasia(text)}
            />
            </Item>
            <Item stackedLabel>
            <Label>Razão Social</Label>
            <Input value={razao} onChangeText={(text) => setRazao(text)} />
          </Item>
          <Item stackedLabel>
            <Label>CPF/CNPJ</Label>
            <Input keyboardType='numeric' value={cpfcnpj} onChangeText={(text) => setCpfcnpj(text)} />
          </Item>
          <Content padder/>
          
          <Item stackedLabel>
            <Label>Dia Vencimento</Label>
            <Input keyboardType='numeric' value={diaVencimento} onChangeText={(text) => setDiaVencimento(text)} />
          </Item>
          <Content padder/>
          <Item>
          <Label>Situação</Label>
            <CheckBox value={situacao} onValueChange={setSituacao} />
            <Text>{situacao ? 'Ativo' : 'Inativo'}</Text>
          </Item>
          <Content padder/>
          <Item>
            <Label>Data de Pagamento</Label>
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
          </Item>
          <Content padder/>
          <Item>
            <Label>Data da Última Conex.</Label>
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
          </Item>
          <Content padder/>
          <Button block info onPress={() => handleSubmit()}>
            <Ionicons name="md-checkmark-circle" size={32} color="white" />
            <Text>{key ? "Atualizar" : "Adicionar"}</Text>
          </Button>
        </Form>
        
          </CardItem>
          </Card>
      </Content>
    </Container>
  );
}
