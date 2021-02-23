import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Header, SearchBar, ListItem, Card } from 'react-native-elements';

import ItemList from '../../components/ItemList';
import { MaterialIcons } from '@expo/vector-icons';

import { db } from '../../config/firebase';

export default function Lista({ navigation }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function searchFilter(text) {
    setIsLoading(true);
    setSearch(text);
    if (text) {
      await db
        .ref('/items')
        .orderByChild('razao')
        .startAt(text)
        .endAt(text + '\uf8ff')
        .once('value', (snapshot) => {
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
          setIsLoading(false);
        });
    } else {
      listarItems();
    }
  }
  async function listarItems() {
    await db
      .ref('/items')
      .orderByChild('razao')
      .on('value', (snapshot) => {
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
        setIsLoading(false);
      });
  }

  // componentDidMount() {
  //   listarItems();
  // };

  useEffect(() => {
    listarItems();
  }, []);

  return (
    <View>
      <Header
        centerComponent={{
          text: 'Sistema de Licenças',
          style: { color: '#fff' },
        }}
      />
      <Card>
        <View>
          <TextInput
            placeholder="Pesquisar..."
            onChangeText={(text) => searchFilter(text)}
            value={search}
          />
        </View>
      </Card>
      <Card.Divider />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          {items.length > 0 ? (
            <FlatList
              data={items}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Card>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('AddItem', { item })
                        }>
                        <View>
                          <Card.Title>{item.razao}</Card.Title>
                          <Text>Nome Fant.: {item.fantasia}</Text>
                          <Text>CPF/CNPJ: {item.cpfcnpj}</Text>
                          <Text>{item.situacao ? 'Ativo' : 'Inativo'}</Text>
                        </View>
                      </TouchableOpacity>
                      <Card.Divider />
                    </Card>
                  </View>
                );
              }}
            />
          ) : (
            <Text>Sem itens</Text>
          )}
        </View>
      )}
    </View>
  );
}
