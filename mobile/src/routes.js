//O expo recomenda que que a gente utilize o Expo Navigation, que é uma biblioteca
//legal para trabalhar com rotas no react native, ela funciona tanto para projetos criados
//com expo e projetos sem expo.
//StackNavigator serve para quando quero ter uma pilha de navegação (por botões por ex)

import React from 'react';

import { NavigationContainer } from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator(); //Primeira navegação criada

import Incidents from './pages/Incidents';
import Details from './pages/Details';

export default function Routes(){
  return (
    //Desativar cabeçalho automatico
    <NavigationContainer>

      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents}/>
        <AppStack.Screen name="Details" component={Details}/>
      </AppStack.Navigator>

    </NavigationContainer>
  );
}
