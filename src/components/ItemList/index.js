import React from 'react';
import { View, TouchableHighlight, ListItem, Text, Card, CardItem } from 'react-native';

export default function ItemComponent({ items, navigation }) {
  return (
    <View>
      {items.map((item) => {
        return (
          <Card>
            <CardItem header bordered>
              <Text>{item.fantasia}</Text>
            </CardItem>
            <ListItem>
            <CardItem bordered>
              <TouchableHighlight
                onPress={() => navigation.navigate('AddItem', { item })}>
                <View key={item.key}>
                <Text>
                    CPF/CNPJ: {item.cpfcnpj}
                  </Text>
                  <Text>
                    {item.situacao ? 'Ativo' : 'Inativo'}
                  </Text>
                </View>
              </TouchableHighlight>
              </CardItem>
            </ListItem>
          </Card>
        );
      })}
    </View>
  );
}
