import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Header, SafeAreaView, SearchBar } from 'react-native-elements';

import ItemList from '../../components/ItemList';

import { db } from '../../config/firebase';

export default function Lista({ navigation }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
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
      console.log(li);
      setItems(li);
      console.log(items.length);
    });
  }, []);

  return (
    <View>
      <Header
        centerComponent={{
          text: 'Sistema de Licenças',
          style: { color: '#fff' },
        }}
      />
      <SearchBar
        placeholder="Pesquisar..."
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      {items.length > 0 ? (
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
      ) : (
        <Text>Sem itens</Text>
      )}
    </View>
  );
}
