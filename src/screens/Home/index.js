import React from 'react';
import {
  Container
} from 'react-native';

export default function Home({ navigation }) {
  const { item } = new Object();

  return (
    <Container>
      {/* <Header />
      <Content>
        <Card>
          <CardItem>
            <Body>
              <Button
                full
                onPress={() => navigation.navigate('AddItem', { item })}>
                <Text>Adicionar Licença</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body>
              <Button full onPress={() => navigation.navigate('Lista')}>
                <Text>Lista de licenças</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
       */}
    </Container>
  );
}
