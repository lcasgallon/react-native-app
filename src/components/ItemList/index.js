import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function ItemComponent({ items, navigation }) {
  return (
    <View>
      {items.map((item) => {
        return (
          <View key={item.key}>
            <ListItem>
              <TouchableHighlight
                onPress={() => navigation.navigate('AddItem', { item })}>
                <View>
                  <Text>Nome: {item.fantasia}</Text>
                  <Text>CPF/CNPJ: {item.cpfcnpj}</Text>
                  <Text>{item.situacao ? 'Ativo' : 'Inativo'}</Text>
                </View>
              </TouchableHighlight>
            </ListItem>
          </View>
        );
      })}
    </View>
  );
}
