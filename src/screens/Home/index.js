import React from 'react';
import { View, Button, Text } from 'react-native';
import { Header, Card } from 'react-native-elements';

export default function Home({ navigation }) {
  const { item } = new Object();

  return (
    <View>
      <Header
        centerComponent={{
          text: 'Sistema de Licenças',
          style: { color: '#fff' },
        }}
      />
      <Card>
        <Button
          onPress={() => navigation.navigate('AddItem', { item })}
          title="Adicionar Licença"
        />
        <Card.Divider />
        <Button
          onPress={() => navigation.navigate('Lista')}
          title="Lista de licenças"
        />
      </Card>
    </View>
  );
}
