import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Container,
  Header,
  Content,
  List,
  Item,
  Button,
  Icon,
  Input,
} from 'react-native';

import ItemList from '../../components/ItemList';

import { db } from '../../config/firebase';

import { Feather } from '@expo/vector-icons';

// let itemsRef = db.ref('/items');

export default function Lista({ navigation }) {
  const [items, setItems] = useState([]);
  //const [keys, setKeys] = useState([]);

  useEffect(() => {
    // db.ref('/items').on('value', querySnapShot => {
    //   let data = querySnapShot.val() ? querySnapShot.val() : {};
    //   let items = {...data};
    //   console.log(data);
    //   console.log(Object.values(data));
    //   console.log(Object.keys(items));
    //   data.forEach(function(d)){
    //     console
    //   }
    //   setItems(items);
    // });

    db.ref('/items').on('value', (snapshot) => {
      var li = [];
      snapshot.forEach((child) => {
        li.push({
          key: child.key,
          razao: child.val().razao,
          cpfcnpj: child.val().cpfcnpj,
          fantasia: child.val().fantasia,
          situacao: child.val().situacao,
          dataPagamento: child.val().dataPagamento,
          dataConexao: child.val().dataConexao,
          diaVencimento: child.val().diaVencimento,
        });
      });
      setItems(li);
    });
  }, []);

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Feather name="search" size={24} color="black" />
          <Input placeholder="Procurar" />
        </Item>
        <Button>
          <Text>Procurar</Text>
        </Button>
      </Header>
      <Content>
        {items.length > 0 ? (
          <SafeAreaView>
            <FlatList
              data={items}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View>
                    <ItemList items={items} navigation={navigation} />
                  </View>
                );
              }}
            />
          </SafeAreaView>
        ) : (
          <Text>Sem itens</Text>
        )}
      </Content>
    </Container>
  );
}
