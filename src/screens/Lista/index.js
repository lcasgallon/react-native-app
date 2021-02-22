import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ItemList from '../../components/ItemList';

import { db } from '../../config/firebase';

import { Container, Header, Content, List } from 'native-base';

let itemsRef = db.ref('/items');

export default function Lista({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    new Promise((resolve) => {
      itemsRef.on('value', (snapshot) => {
        let data = snapshot.val();
        let fetched = Object.values(data);

        resolve(fetched);
      });
    }).then((data) => setItems(data));
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <List>
          {items.length > 0 ? (
            <ItemList items={items} navigation={navigation} />
          ) : (
            <Text>Sem itens</Text>
          )}
        </List>
      </Content>
    </Container>
  );
}
