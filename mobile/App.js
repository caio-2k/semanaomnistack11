import 'intl';

import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import Routes from './src/routes';

export default function App() {
  return (

    <Routes />

    /*<View>
      <Text>Hello Omnistack</Text>
    </View>*/

    );

    /*Qualquer tipo de container vai utilizar a tag view.
    //Qualquer tipo de texto (paragrafo, h1, h2) sempre utiliza o text.
    <View style={styles.container}>
      <Text style={styles.title}>Hello Omnistack</Text>
    </View>*/

}

/*Parte de estilização
//styles é o nome da variavel container que dei para a View em questão
//Se quiser colocar estilização tem que passar a tag chamada style recebndo o objeto com a estilização
const styles = StyleSheet.create({ //Classe StyleSheet com o método create para criar estilos
  container: {
    //Tudo é display:flex no reactN  
    flex: 1,
    backgroundColor: '#7159c1', //No CSS Web era background-color, aqui pega-se a próxima letra e cola-se em caixa alta. 
    alignItems: 'center', //Valor nao numéricos precisam ter aspas por volta
    justifyContent: 'center', //Valor nao numéricos precisam ter aspas por volta
  },

  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  }
});*/
