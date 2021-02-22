import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import {
  Button,
  Header,
  Container,
  Text,
  Label,
  Form,
  Input,
  Item,
  Content,
  Icon,
} from 'native-base';

import { db } from '../../config/firebase';

let addItem = (item) => {
  db.ref('/items').push({
    name: item.name,
    dataLicenca: item.dataLicenca,
    situacao: item.situacao,
  });
};

export default function AddItem() {
  const [name, setName] = useState('');
  const [dataLicenca, setDataLicenca] = useState('');
  const [situacao, setSituacao] = useState('ativo');

  function handleSubmit() {
    let item = { name: name, dataLicenca: dataLicenca, situacao: situacao };
    if (item.name && item.dataLicenca && item.situacao) {
      addItem(item);
      Alert.alert('Registro salvo com sucesso');
    } else {
      Alert.alert('Por favor preencha todos os campos');
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Nome</Label>
            <Input onChangeText={(text) => setName(text)} />
          </Item>
          <Item picker>
            <Picker
              mode="dropdown"
              situacao={situacao}
              onValueChange={(itemValue, itemIndex) => setSituacao(itemValue)}>
              <Picker.Item label="Ativo" value="ativo" />
              <Picker.Item label="Inativo" value="inativo" />
            </Picker>
          </Item>
          <Item>
            <Label>Data de Ativação</Label>
            <DatePicker
              date={dataLicenca}
              format="DD-MM-YYYY"
              onDateChange={(date) => setDataLicenca(date)}
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
        </Form>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            padding: 15,
          }}>
          <Button iconRight onPress={() => handleSubmit()}>
            <Icon name="arrow-forward" />
            <Text>Adicionar</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}
