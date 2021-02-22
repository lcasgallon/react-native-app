import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { ListItem, Text } from 'native-base';

export default function ItemComponent({ items, navigation }) {
  return (
    <View>
      {items.map((item, index) => {
        return (
          <ListItem>
            <TouchableHighlight onPress={() => navigation.navigate('AddItem')}>
              <View key={index}>
                <Text>
                  {item.name} ({item.dataLicenca}) | {item.situacao}
                </Text>
              </View>
            </TouchableHighlight>
          </ListItem>
        );
      })}
    </View>
  );
}
