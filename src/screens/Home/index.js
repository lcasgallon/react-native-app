import React from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
} from 'native-base';

export default function Home({ navigation }) {
  return (
    <Container>
      <Header />
      <Content>
        <Button success full onPress={() => navigation.navigate('AddItem')}>
          <Text>Adicionar Licença</Text>
        </Button>
        <Button success full onPress={() => navigation.navigate('Lista')}>
          <Text>Lista de licenças</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Sistema de licenças</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
